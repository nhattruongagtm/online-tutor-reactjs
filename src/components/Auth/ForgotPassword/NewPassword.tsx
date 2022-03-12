import { watch } from 'fs';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateStatusForgotPassword } from '../../../actions/signup';
import { CircularProgress } from '@material-ui/core';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { authApi } from '../../../api/authApi';
import md5 from 'md5';
import { requestChangePassword } from '../../../actions/forgotPassword';
interface Validation {
  title: string;
  status: boolean;
}
interface FormInput {
  password: string;
  repassword: string;
}
interface NewPasswordProps {
  onGetUserID: string | undefined;
}
const validationList: Validation[] = [
  {
    title: 'Ít nhất 8 ký tự',
    status: true,
  },
  {
    title: 'Ít nhất 1 chữ cái in thường và 1 chữ cái in hoa',
    status: false,
  },
  {
    title: 'Ít nhất 1 số',
    status: true,
  },
  {
    title: 'Ít nhất một ký tự đặt biệt (VD: @,#,&,...)',
    status: false,
  },
];

export default function NewPassword({ onGetUserID }: NewPasswordProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // validation forms
  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu!')
      .min(8, 'Mật khẩu phải chứa ít nhất 8 ký tự!'),
    repassword: yup
      .string()
      .required('Vui lòng xác nhận mật khẩu!')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp!'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInput>(formOptions);

  const [checkValidation, setCheckValidation] = useState(validationList);
  const dispatch = useDispatch();

  const handleChangePassword = (data: FormInput) => {
    // setIsLoading(true);

    // if (onGetUserID) {
    //   authApi.changePassword(onGetUserID, md5(data.password)).then((res) => {
    //     setIsLoading(false);
    //     dispatch(updateStatusForgotPassword(2));
    //   });
    // }
    dispatch(requestChangePassword(data.password));      
  };

  return (
    <form
      className="signup__main__wrap__form"
      onSubmit={handleSubmit(handleChangePassword)}
    >
      <div className="signup__form__item">
        <div className="signup__form__item__label ">Mật khẩu mới:</div>
        <input
          type="password"
          placeholder="Nhập mật khẩu mới"
          className={errors.password && 'login__error'}
          {...register('password')}
        />
      </div>
      <div className="signup__form__item signup__form__item--validate">
        <div className="signup__form__item__label "></div>

        <span>{errors.password?.message}</span>
      </div>
      <div className="signup__form__validate password__validation">
        {checkValidation.map((item, index) => {
          return (
            <div
              className={
                item.status
                  ? 'signup__form__validate__item signup__form__validate__item--true'
                  : 'signup__form__validate__item'
              }
              key={index}
            >
              <i className="fas fa-check-circle"></i>
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>
      <div className="signup__form__item">
        <div className="signup__form__item__label ">Xác nhận mật khẩu: </div>
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          className={errors.repassword && 'login__error'}
          {...register('repassword')}
        />
      </div>
      <div className="signup__form__item signup__form__item--validate">
        <div className="signup__form__item__label "></div>
        <span>{errors.repassword?.message}</span>
      </div>
      <div className="signup__form__nav forgot__nav">
        <div className="signup__form__nav__back forgot__nav__back"></div>
        <Button variant="contained" type="submit">
          <Typography sx={{ mr: 1 }}>Đồng ý</Typography> 
          {isLoading && (
            <CircularProgress size={20} className="cirlce__progress" />
          )}
        </Button>
      </div>
    </form>
  );
}
