import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useAddress from '../../../hooks/useAddress';
import { User } from '../../../models/user';
import { userApi } from '../../../api/userApi';
import { District } from '../../../components/Auth/SignUp/InfoValidation';
import useUser from '../../../hooks/useUser';
import { UserProfile } from '../../../reducers/profileSlice';
import { useDispatch } from 'react-redux';
import { UserAuth } from '../../../reducers/loginSlice';
interface ProfileFormProps {
  onCloseForm: () => void;
  info: UserProfile;
}
interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  district: string;
  city: string;
  gender: number;
}
export const ProfileForm = ({ onCloseForm, info }: ProfileFormProps) => {
  const [user, setUser] = useState<UserAuth>();
  const dispatch = useDispatch();
  const [district, city] = useAddress();
  const [chooseCity, setChooseCity] = useState<string>(
    user && user.city ? user.city : ''
  );   
  const [districts, setDistricts] = useState<District[]>();
  const [userInfo, setInfo] = useState<UserProfile>(info);

  const getCityID = (name: string) => {
    return city.find((item) => item.name_with_type === name)?.code;
  };  

  const [u] = useUser();

  useEffect(() => {
    u &&
      userApi
        .getUserByID(u.id)
        .then((res) => {
          setUser(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
  }, []);

  const [avatar, setAvatar] = useState<string>(
    'https://i.pinimg.com/originals/5f/12/21/5f12212ed4d94b0dafe0f18a8e55832b.jpg'
  );
  const validationSchema = yup.object().shape({
    name: yup.string().required().default(info.displayName),
    phone: yup
      .string()
      .required('Vui lòng nhập sô điện thoại!')
      .matches(/^[0-9]+$/, 'Vui lòng nhập số điện thoại!')
      .max(11)
      .min(10)
      .default(info.phone),
    email: yup.string().required().default(info.email),
    district: yup.string().required(),
    city: yup.string().required(),
  });
  const formOptions = {
    defaultValues: validationSchema.cast({}),
    resolver: yupResolver(validationSchema),
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileForm>(formOptions);

  useEffect(() => {
    reset(user);
  }, [user]);

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];

      const blob = URL.createObjectURL(file);
      setAvatar(blob);
    }
  };

  useEffect(() => {
    const districts: District[] = district.filter(
      (item) => item.parent_code === getCityID(chooseCity)
    );
    setDistricts(districts);
  }, [chooseCity, district]);

  useEffect(() => {
    return () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  const handleChangeInfo = (data: ProfileForm) => {
    console.log(data);
  };
  // console.log(errors);

  return (
    <form
      className="profile__base profile__base__dialog"
      onSubmit={handleSubmit(handleChangeInfo)}
    >
      <div className="profile__base__title">
        <p>Thông tin cơ bản</p>
      </div>
      <div className="profile__base__body">
        <div className="profile__base__body__avatar">
          <img src={avatar} alt="" />
          <label htmlFor="change__avatar">
            <i className="fas fa-pen"></i>
          </label>
          <input
            type="file"
            id="change__avatar"
            hidden
            onChange={handleChangeAvatar}
          />
        </div>
        <div className="profile__base__body__name">
          <div className="profile__item__label">Họ tên: </div>
          <input
            type="text"
            placeholder="Nhập họ tên..."
            {...register('name')}
          />
        </div>
        <div className="profile__base__body__name">
          <div className="profile__item__label">Email: </div>
          <input
            type="email"
            placeholder="Nhập email..."
            {...register('email')}
          />
        </div>
        <div className="profile__base__body__name">
          <div className="profile__item__label">Sô điện thoại: </div>
          <input
            type="number"
            placeholder="Nhập số điện thoại..."
            {...register('phone')}
          />
        </div>
        <div className="profile__base__body__name">
          <div className="profile__item__label">Tỉnh/thành phố: </div>
          <select
            {...register('city')}
            onChange={(e) => setChooseCity(e.target.value)}
          >
            <option value="city">Chọn thành phố</option>
            {city &&
              user &&
              city.map((item) => (
                <option
                  key={item.slug}
                  value={item.name_with_type}
                  selected={item.name_with_type === user.city ? true : false}
                >
                  {item.name_with_type}
                </option>
              ))}
          </select>
        </div>
        <div className="profile__base__body__name">
          <div className="profile__item__label">Quận/huyện: </div>
          <select {...register('district')}>
            <option value="district">Chọn quận/huyện</option>
            {districts &&
              user &&
              districts.map((district) => (
                <option
                  key={district.slug}
                  value={district.name_with_type}
                  selected={
                    district.name_with_type === user.district ? true : false
                  }
                >
                  {district.name_with_type}
                </option>
              ))}
          </select>
        </div>
        <div className="profile__base__body__name">
          <div className="profile__item__label">Giới tính: </div>
          <select
            {...register('gender')}
            defaultValue={info.gender ? info.gender : -1}
          >
            <option value={0}>Nam</option>
            <option value={1}>Nữ</option>
            <option value={2}>Khác</option>
          </select>
        </div>
        <div className="profile__base__footer">
          <button onClick={onCloseForm} className="profile__close">
            Thoát
          </button>
          <button type="submit">Thay đổi</button>
        </div>
      </div>
    </form>
  );
};
