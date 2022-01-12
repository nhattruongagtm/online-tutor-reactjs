import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { requestSignUpProfile } from '../../../actions/signup';
import useAddress from '../../../hooks/useAddress';
import { SignUpSelector } from '../../../reducers/signup';
import '../SignUp/infoValidation.scss';
import { Button, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

export interface District {
  name_with_type: string;
  parent_code: string;
  slug: string;
}
export interface City {
  name_with_type: string;
  code: string;
  slug: string;
}
interface FormInput {
  displayName: string;
  gender: number;
  district: string;
  city: string;
  phone: string;
  check: boolean;
}
const useStyles  = makeStyles({
  loading:{
    width: 60,
    height: 60,
  }
})
export default function InfoValidation() {
  // const inputs = useSelector((state: IInitialState) => state.signUpInfo);
  const validationShema = yup.object().shape({
    displayName: yup.string().required('Vui lòng nhập tên!'),
    gender: yup.number().required('Vui lòng chọn giới tính!'),
    city: yup.string().required('Vui lòng chọn tỉnh/thành!'),
    district: yup.string().required('Vui lòng chọn quận/huyện!'),
    phone: yup
      .string()
      .required('Vui lòng nhập số điện thoại')
      .max(11, 'Vui lòng nhập đúng số điện thoại!')
      .min(10, 'Vui lòng nhập đúng số điện thoại!'),
    check: yup.bool().isTrue('Vui lòng chấp nhận thỏa thuận của chúng tôi!'),
  });
  const formOptions = { resolver: yupResolver(validationShema) };
  const [district, city] = useAddress();
  const [districts, setDistricts] = useState<District[]>(district);
  const [citys, setCitys] = useState<City[]>(city);
  const [chooseCity, setChooseCity] = useState<string>('');
  const [chooseDistrict, setChooseDistrict] = useState<string>('');
  const dispatch = useDispatch();
  const classes = useStyles();
  const [getDistrictsByID, setGetDistrictsByID] = useState<District[]>([]);
  const signUpSelector = useSelector(
    (state: SignUpSelector) => state.signUpUser
  );
  const { user } = signUpSelector;
  const { loading } = signUpSelector;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>(formOptions);

  useEffect(() => {
    const districtByID: District[] = districts.filter(
      (item) => item.parent_code === getCityID(chooseCity)
    );
    setGetDistrictsByID(districtByID);
  }, [chooseCity]);

  useEffect(() => {
    setCitys(city);
    setDistricts(district);
  }, [city, district]);

  const getCityID = (name: string) => {
    return city.find((item) => item.name_with_type === name)?.code;
  };

  const handleSignUp = async (data: FormInput) => {
    const userSignUp = { ...user };
    userSignUp.displayName = data.displayName;
    userSignUp.gender = data.gender;
    userSignUp.phone = data.phone;
    userSignUp.district = data.district;
    userSignUp.city = data.city;

    dispatch(requestSignUpProfile(userSignUp));
    // const newData = {
    //   email: inputs.email,
    //   password: inputs.password,
    //   phone: data.phone,
    //   fullName: data.fullName,
    //   gender: data.gender,
    //   city: data.city,
    //   district: data.district,
    //   type: inputs.type
    // }

    // const result = await authApi.signUp(newData);
    // if(result){

    //   console.log(result);

    //   setTimeout(()=>{
    //      dispatch(updateStatus(3));

    //    },2000)
    // }
    // else{
    //   console.log("Đã xảy ra lỗi, vui lòng thử lại!");
    // }
    console.log(data);
  };
  const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGetDistrictsByID([]);
    setChooseCity(e.target.value.toString());
  };

  console.log(errors);

  return (
    <form className="info__validation" onSubmit={handleSubmit(handleSignUp)}>
      <div className="info__validation__input">
        <div className="info__validation__input__label">
          <div>
            Họ và tên: <span>*</span>
          </div>
        </div>
        <input
          type="text"
          placeholder="Nhập họ tên"
          {...register('displayName')}
        />
      </div>
      <div className="info__validation__input">
        <div className="info__validation__input__label">
          <div>Giới tính:</div>
        </div>
        <select id="" {...register('gender')}>
          <option value={0}>Nam</option>
          <option value={1}>Nữ</option>
        </select>
      </div>
      <div className="info__validation__input">
        <div className="info__validation__input__label">
          <div>
            Thành phố: <span>*</span>
          </div>
        </div>
        <select
          id=""
          // onChange={(e) => {
          //   setGetDistrictsByID([]);
          //   setChooseCity(e.target.value.toString());
          // }}
          {...register('city')}
          onChange={handleChangeCity}
        >
          <option value="">Chọn Thành Phố</option>

          {citys.map((city) => {
            return (
              <option value={city.name_with_type} key={city.code}>
                {city.name_with_type}
              </option>
            );
          })}
        </select>
      </div>
      <div className="info__validation__input">
        <div className="info__validation__input__label">
          <div>
            Quận/Huyện: <span>*</span>
          </div>
        </div>
        <select
          id=""
          // onChange={(e) => setChooseDistrict(e.target.value)}
          {...register('district')}
        >
          <option value="">Chọn Quận/Huyện</option>
          {getDistrictsByID.length > 0 &&
            getDistrictsByID.map((district, index) => {
              return (
                <option value={district.name_with_type} key={index}>
                  {district.name_with_type}
                </option>
              );
            })}
        </select>
      </div>
      <div className="info__validation__input">
        <div className="info__validation__input__label">
          <div>
            Số điện thoại: <span>*</span>
          </div>
        </div>
        <input
          type="number"
          placeholder="0123-456-789"
          {...register('phone')}
        />
      </div>
      <div className="info__validation__input">
        <div className="info__validation__input__label">
          <div>Email:</div>
        </div>
        <input type="text" disabled value={user && user.email} />
      </div>
      <label htmlFor="terms" className="info__validation__terms">
        <input type="checkbox" id="terms" {...register('check')} />
        Tôi chấp nhận <span>điều khoản</span> sử dụng
      </label>

      <div className="signup__form__nav">
        <div className="signup__form__nav__back">
          {/* onClick={() => setType(-1)} */}
          <i className="fas fa-arrow-left"></i>Quay lại
        </div>
        <Button variant="contained" type="submit">
          {loading && (
            <CircularProgress
              className={classes.loading}
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'white' : '#308fe8',
                animationDuration: '1050ms',
              }}
            />
          )}
          Tiếp theo
        </Button>
      </div>
    </form>
  );
}
