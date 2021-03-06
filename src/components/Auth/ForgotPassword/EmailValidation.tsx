import { CircularProgress } from '@material-ui/core';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from '../../../api/authApi';
import {
  requestForgotCheckCode,
  requestForgotPassword,
} from '../../../reducers/forgotPasswordSlice';
import { RootState } from '../../../store';
import '../SignUp/signup.scss';
import { ForgotSelector } from './ForgotPassword';
interface SendMailProps {
  sendMail: (userID: string) => void;
}
interface FormValue {
  email: string;
  code: string;
}
interface ResultValue {
  userID: string;
  code: string;
}
export default function EmailValidation({ sendMail }: SendMailProps) {
  const status = useSelector(
    (state: RootState) => state.forgotPassword.isCheckForm
  );
  const [isSendMail, setIsSendMail] = useState<boolean>();
  const [isSendCode, setIsSendCode] = useState<boolean>();
  const [result, setResult] = useState<ResultValue>();
  const dispatch = useDispatch();
  const forgotPasswordSelector = useSelector(
    (state: ForgotSelector) => state.forgotPassword
  );
  const { loading } = forgotPasswordSelector;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const handleSendMail = async (data: FormValue) => {
    dispatch(requestForgotPassword(data.email));
  };
  const handleSendCode = (data: FormValue) => {
    dispatch(requestForgotCheckCode(data.code));
  };
  return (
    <div className="signup__main__wrap__form">
      {!status ? (
        <form onSubmit={handleSubmit(handleSendMail)}>
          <div className="signup__form__item">
            <label className="signup__form__item__label ">Email:</label>
            <input
              type="email"
              placeholder="Email"
              className={errors.email && 'login__error'}
              {...register('email', {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              })}
            />
          </div>
          <div className="signup__form__item signup__form__item--validate">
            <label className="signup__form__item__label "></label>
            {errors.email?.type === 'pattern' && <span>Email kh??ng ????ng!</span>}
            {errors.email?.type === 'required' && (
              <span>Vui l??ng nh???p email!</span>
            )}
          </div>
          <div className="signup__form__item forgot__email">
            <div className="signup__form__item__label "></div>
            <span>
              Ch??ng t??i s??? g???i m?? code v??o email m?? b???n ???? ????ng k??. Vui l??ng
              ki???m tra email.
            </span>
          </div>
          <div className="signup__form__nav forgot__nav">
            <div className="signup__form__nav__back forgot__nav__back "></div>
            {/* <div className="forgot__nav__btn" onClick={handleSendMail}>
              G???i m??
            </div> */}
            <Button variant="contained" type="submit">
              <Typography sx={{ mr: 1 }}>G???i m?? </Typography>
              {loading && (
                <CircularProgress size={20} className="cirlce__progress" />
              )}
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(handleSendCode)}>
          <div className="signup__form__item 22">
            <div className="signup__form__item__label ">M?? x??c nh???n:</div>
            <input
              type="text"
              placeholder="Nh???p m?? x??c nh???n"
              {...register('code')}
              name='code'
            />
          </div>
          <div className="signup__form__item forgot__email">
            <div className="signup__form__item__label "></div>
            <span>
              Ch??ng t??i s??? ???? m?? code v??o email m?? b???n ???? ????ng k??. Vui l??ng ki???m
              tra email v?? x??c nh???n.{' '}
            </span>
          </div>
          <div className="signup__form__nav forgot__nav">
            <div className="signup__form__nav__back forgot__nav__back"></div>
            <Button variant="contained" type="submit">
              <Typography sx={{ mr: 1 }}>Ti???p theo </Typography>
              {isSendCode && (
                <CircularProgress size={20} className="cirlce__progress" />
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
