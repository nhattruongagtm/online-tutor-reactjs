import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { userApi } from '../../../api/userApi';
import { District } from '../../../components/Auth/SignUp/InfoValidation';
import useAddress from '../../../hooks/useAddress';
import { UserAuth } from '../../../reducers/loginSlice';
import { loadUserInfo, UserProfile } from '../../../reducers/profileSlice';
import { RootState } from '../../../store';
import { storageApi } from '../../../api/storageApi';
import useUser from '../../../hooks/useUser';

interface ProfileFormProps {
  onCloseForm?: () => void;
  info: UserAuth;
}
interface ProfileForm {
  displayName: string;
  email: string;
  phone: string;
  district: string;
  city: number;
  gender: number;
}
export const ProfileForm = ({ onCloseForm, info }: ProfileFormProps) => {
  const dispatch = useDispatch();
  const [district, city] = useAddress();
  const [user] = useUser();
  const [chooseCity, setChooseCity] = useState<string>('');
  const [districts, setDistricts] = useState<District[]>([]);
  // const info = useSelector((state: RootState) => state.profile.userInfo);
  const [avatar, setAvatar] = useState<string>(info.avatar || '');
  const [img, setImg] = useState<Blob>();
  const validationSchema = yup.object().shape({
    displayName: yup.string().required().default(info.displayName),
    phone: yup
      .string()
      .required('Vui lòng nhập sô điện thoại!')
      .matches(/^[0-9]+$/, 'Vui lòng nhập số điện thoại!')
      .max(11)
      .min(10)
      .default(info.phone),
    email: yup.string().required().default(info.email),
    district: yup.string(),
    city: yup.number().default(info.city),
    gender: yup.number(),
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

  // useEffect(() => {
  //   reset(info);
  // }, [info]);

  useEffect(() => {
    const a = district.filter((item) => item.parent_code === chooseCity);
    setDistricts(a);
  }, [district, chooseCity]);

  useEffect(() => {
    info && setChooseCity(info.city + '');
  }, [info]);

  const handleChangeAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      console.log(file);
      const blob = URL.createObjectURL(file);
      const a = new Blob([file], { type: 'image/png' });
      setAvatar(blob);
      setImg(a);
    }
  };

  useEffect(() => {
    return () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  const handleChangeInfo = async (data: UserAuth) => {
    console.log(data);

    try {
      if (user) {   
        let url = info.avatar;
        if (img) {
          url = await storageApi.uploadFile(user.id, img, 'imgs');
        }
        console.log(url);
        userApi
          .updateProfile(user.id, {
            ...data,
            avatar: url,
          })
          .then((res) => {
            if (res.data) {
              toast.success('Cập nhật thông tin thành công!');
              dispatch(loadUserInfo(res.data as UserProfile));
              onCloseForm && onCloseForm();
            } else {
              toast.error('Cập nhật thông tin thành công!');
            }
          })
          .catch((e) => {
            toast.error('Đã xảy ra lỗi! Vui lòng thử lại!');
          });
      }
    } catch (error) {}
  };
  console.log(errors);

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
          {user && (
            <img
              src={
                avatar
                  ? avatar
                  : `https://avatars.dicebear.com/api/avataaars/${user.id}
            }.jpg`
              }
              alt=""
            />
          )}

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
            {...register('displayName')}
          />
        </div>
        <div className="profile__base__body__name">
          <div className="profile__item__label">Email: </div>
          <input
            type="email"
            placeholder="Nhập email..."
            {...register('email')}
            disabled
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
              info &&
              city.map((item) => (
                <option
                  key={item.slug}
                  value={item.code}
                  selected={item.code === info.city + '' ? true : false}
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
              info &&
              districts.map((district) => (
                <option
                  key={district.slug}
                  value={district.slug}
                  selected={district.slug === info.district ? true : false}
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
          <button
            onClick={onCloseForm}
            className="profile__close"
            type="button"
          >
            Thoát
          </button>
          <button type="submit">Thay đổi</button>
        </div>
      </div>
    </form>
  );
};
