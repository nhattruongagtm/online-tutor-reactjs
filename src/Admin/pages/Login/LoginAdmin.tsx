import { HomeOutlined, RollbackOutlined } from '@ant-design/icons';
import { Button, Checkbox, Input } from 'antd';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  loadUserWhenLoginSuccess,
  requestLoginSuccess,
  UserAuth,
  UserLogin,
} from '../../../reducers/loginSlice';
import './login.scss';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { authApi } from '../../../api/authApi';
import { useHistory } from 'react-router';
import { ADMIN__HOME } from '../../routes/path';
import md5 from 'md5';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { TOKEN } from '../../../constants/auth';
import { decodeToken, isExpired } from 'react-jwt';
import { ResponseData } from '../../../models/response';
import { userApi } from '../../../api/userApi';
import { LoginResp, LoginRespData } from '../../../models/user';
type Props = {};

const LoginAdmin = (props: Props) => {
  const navigate = useHistory();
  const dispatch = useDispatch();
  const [input, setInput] = useState<UserLogin>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<UserLogin>({
    email: '',
    password: '',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });

    if (name === 'email') {
      if (value.trim() === '') {
        setErrors({
          ...errors,
          email: 'Vui lòng nhập email!',
        });
      } else {
        setErrors({
          ...errors,
          email: '',
        });
      }
    }
    if (name === 'password') {
      if (value.trim() === '') {
        setErrors({
          ...errors,
          password: 'Vui lòng nhập mật khẩu!',
        });
      } else if (value.trim().length < 8) {
        setErrors({
          ...errors,
          password: 'Mật khẩu phải chứa tối thiểu 8 ký tự!',
        });
      } else {
        setErrors({
          ...errors,
          password: '',
        });
      }
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.email.trim() && !input.password.trim()) {
      setErrors({
        email: 'Vui lòng nhập email!',
        password: 'Vui lòng nhập mật khẩu!',
      });
    } else if (input.email.trim() === '') {
      setErrors({
        ...errors,
        email: 'Vui lòng nhập email!',
      });
    } else if (input.password.trim() === '') {
      setErrors({
        ...errors,
        password: 'Vui lòng nhập mật khẩu!',
      });
    } else {
      // console.log(input);

      authApi
        .login(input)
        .then(async (res) => {
          if (res.access_token) {
            dispatch(requestLoginSuccess(res));
            const token = localStorage.getItem(TOKEN)
              ? (JSON.parse(localStorage.getItem(TOKEN) as string) as LoginResp)
              : null;
            if (token) {
              const myDecodedToken = decodeToken(
                token.access_token
              ) as LoginRespData;
              const isMyTokenExpired = isExpired(token.access_token);
              if (!isMyTokenExpired) {
                try {
                  const resp = await userApi.getUserByEmail(myDecodedToken.sub);

                  const { data } = resp;
                  dispatch(
                    loadUserWhenLoginSuccess({
                      ...data,
                      roles: myDecodedToken.roles,
                    })
                  );
                } catch (error) {
                  return null;
                }
              } else {
                // refresh token
              }
            }
            toast.success('Đăng nhập thành công!');
            navigate.push(ADMIN__HOME);
          } else {
            toast.error('Tên tài khoản hoặc mật khẩu không chính xác!');
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error('Đã xảy ra lỗi vui lòng thử lại!');
        });
    }
  };

  return (
    <div className="login__admin">
      <div className="login__admin__main">
        <div className="login__admin__logo">
          <img src="/imgs/logo.png" alt="" />
          <span>Hệ thống gia sư trực tuyến</span>
        </div>
        <form action="" className="login__admin__form" onSubmit={handleLogin}>
          <div className="input__ad__item">
            <div className="login__label__ad"></div>
            <Input
              className="login__input__ad"
              placeholder="Nhập email..."
              name="email"
              value={input.email}
              onChange={handleOnChange}
            />
            <span className="error"> {errors.email}</span>
          </div>
          <div className="input__ad__item">
            <div className="login__label__ad"></div>
            <Input.Password
              className="login__input__ad"
              placeholder="Nhập mật khẩu..."
              type="password"
              name="password"
              value={input.password}
              onChange={handleOnChange}
            />
            <span className="error">{errors.password}</span>
          </div>
          <div className="input__ad__item save">
            <Checkbox>Lưu tài khoản</Checkbox>
            <Link to={'/'}>Quên mật khẩu?</Link>
          </div>
          <div className="input__ad__actions">
            <Button type="primary" size="large" htmlType="submit">
              Đăng nhập
            </Button>
            <Link to={'/'} className="input__back">
              <span>Thoát</span>
              <RollbackOutlined />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
