import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import useAddress from '../../../hooks/useAddress';
import { District } from '../../../components/Auth/SignUp/InfoValidation';
interface ProfileFormProps {
  onCloseForm: () => void;
}
interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  district: string;
  city: string;
}
export const ProfileForm = ({ onCloseForm }: ProfileFormProps) => {
  const [user, setUser] = useState<ProfileForm>({
    name: 'Huỳnh Nhật Trường',
    email: 'nhattruongagtm@gmail.com',
    phone: '0384459719',
    district: 'Huyện Đức Hòa',
    city: 'Tỉnh Long An',
  });
  const [district, city] = useAddress();
  const [chooseCity,setChooseCity] = useState<string>(user.city);
  const [districts,setDistricts] = useState<District[]>();

  
  const getCityID = (name: string) => {   
    return city.find((item) => item.name_with_type === name)?.code;
  };

  const [avatar, setAvatar] = useState<string>(
    'https://i.pinimg.com/originals/5f/12/21/5f12212ed4d94b0dafe0f18a8e55832b.jpg'
  );
  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    phone: yup.number().required().max(11).min(10),
    email: yup.string().required(),
    district: yup.string().required(),  
    city: yup.string().required(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

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
  }, [chooseCity,district]);

  useEffect(() => {
    return () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);

  return (
    <form className="profile__base profile__base__dialog">
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
            // value="Huỳnh Nhật Trường"
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
          <select {...register('city')} onChange={(e)=>setChooseCity(e.target.value)}>  
            <option value="city">Chọn thành phố</option>
            {city && city.map(item=>(
                <option key={item.slug} value={item.name_with_type} selected={item.name_with_type === user.city ? true : false}>{item.name_with_type}</option>
            ))}
          </select>
        </div>
        <div className="profile__base__body__name">
          <div className="profile__item__label">Quận/huyện: </div>
          <select {...register('district')}>
            <option value="district">Chọn quận/huyện</option>
            {districts && districts.map(district=>(
                <option key={district.slug} value={district.name_with_type} selected={district.name_with_type === user.district ? true : false}>{district.name_with_type}</option>
            ))}
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
