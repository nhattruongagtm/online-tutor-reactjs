import React, { useState } from 'react';
import register, { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { HOME_PATH, LOGIN_PATH } from '../../../constants/path';
import { authApi } from '../../../api/authApi';
import md5 from 'md5';
import { ACCESS_TOKEN } from '../../../constants/auth';
import { useDispatch, useSelector } from 'react-redux';
import { LoginSelector } from '../../../reducers/loginSlice';
import { UserLogin, requestLogin } from '../../../reducers/loginSlice';
interface FormInput {
  email: string;
  password: string;
  save: boolean;
}
interface LoginFormProps {
  type: number;
}
export default function LoginForm({ type }: LoginFormProps) {
  const history = useHistory();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: LoginSelector) => state.loginUser.loading
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const handleLoginSubmit = (data: FormInput) => {
    const user: UserLogin = {
      email: data.email,
      password: data.password,
      type,
    };
    dispatch(requestLogin(user));

    // setIsLoading(true);

    // setTimeout(()=>{
    //   setIsLoading(false);
    //   history.push(HOME_PATH);
    // },1000)

    // const userLogin = {
    //   email: data.email,
    //   password: md5(data.password),
    //   type: type,
    // };

    // const result = await authApi.login(userLogin);

    // setIsLoading(false);

    // if (result.status === 200) {

    //   localStorage.setItem(ACCESS_TOKEN,userLogin.email);

    //   history.push(HOME_PATH);
    // }

    // console.log(userLogin)
  };
  return (
    <form
      className="login__main__form"
      onSubmit={handleSubmit(handleLoginSubmit)}
    >
      <div className="login__main__form__info">
        <div className="login__main__form__info__label">Email</div>
        <input
          type="text"  
          placeholder="Email"
          {...register('email', {
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
          })}
          className={errors.email && 'login__error'}
        />
        {errors.email?.type === 'pattern' && <span>Email kh??ng ????ng!</span>}
        {errors.email?.type === 'required' && <span>Vui l??ng nh???p email!</span>}
      </div>
      <div className="login__main__form__info">
        <div className="login__main__form__info__label">M???t kh???u</div>
        <input
          type="password"
          placeholder="Nh???p m???t kh???u"
          {...register('password', {
            required: true,
            pattern: /^[a-z0-9]/i,
            minLength: 8,
          })}
          className={errors.password && 'login__error'}
        />
        {errors.password?.type === 'required' && (
          <span>Vui l??ng nh???p m???t kh???u!</span>
        )}
        {/* {errors.password?.type === "pattern" && (<span>M???t kh???u kh??ng h???p nl???!</span>)} */}
        {errors.password?.type === 'minLength' && (
          <span>M???t kh???u ph???i t???i thi???u 8 k?? t???!</span>
        )}
      </div>
      <div className="login__main__form__save">
        <label htmlFor="save__account">
          <input type="checkbox" id="save__account" {...register('save')} />
          <span>Ghi nh??? t??i kho???n</span>
        </label>
      </div>
      {/* <button type="submit">????ng nh???p</button> */}
      <Button variant="contained" type="submit">
        <Typography sx={{ mr: 1 }}>????ng nh???p</Typography>
        {loading && <CircularProgress size={20} className="cirlce__progress" />}
      </Button>
    </form>
  );
}
