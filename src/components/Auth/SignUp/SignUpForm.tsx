import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress } from '@mui/material';
import md5 from 'md5';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { authApi } from '../../../api/authApi';
import { InitialStateSignUp } from '../../../reducers/signup';
import { requestSignUp } from '../../../reducers/signUpSlice';
interface Validation {
  title: string;
  status: boolean;
}
interface FormInput {
  email: string;
  password: string;
  repassword: string;
}
interface SignUpFormProps {
  type: number;
}
export interface SignUpSelector {
  signUpUser: InitialStateSignUp;
}

export default function SignUpForm({ type: signUpType }: SignUpFormProps) {
  // loading
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExistMail, setIsExistMail] = useState(false);
  // use React Hook Form
  const ValidationShema = yup.object().shape({
    email: yup
      .string()
      .required('Vui lòng nhập email!')
      .email('Vui lòng nhập đúng email!'),

    password: yup
      .string()
      .required('Vui lòng nhập mật khẩu!')
      .min(8, 'Mật khẩu phải chứa ít nhất 8 ký tự!'),
    repassword: yup
      .string()
      .required('Vui lòng xác nhận mật khẩu!')
      .oneOf([yup.ref('password')], 'Mật khẩu không khớp!'),
  });
  const formOptions = { resolver: yupResolver(ValidationShema) };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput>(formOptions);
  const dispatch = useDispatch();
  const signUpSelector = useSelector(
    (state: SignUpSelector) => state.signUpUser
  );
  const { loading } = signUpSelector;

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
  // const inputs = useSelector((state: IInitialState) => state.signUpInfo);

  const handleSubmitSignup = async (data: FormInput) => {
    if (!isExistMail) {
      dispatch(
        requestSignUp({
          displayName: '',
          password: md5(data.password),
          phone: '',
          district: '',
          city: '',
          email: data.email,
          gender: 0,
          type: signUpType,
        })
      );
    }
  };

  const emailValue = watch('email');
  useEffect(() => {
    let isCancel = false;
    const checkEmail = async () => {
      try {
        const res = await authApi.checkMail(emailValue || '');
        if (res) {
          console.log('email is exist!');
          if (!isCancel) {
            setIsExistMail(true);
          }
        } else {
          if (!isCancel) {
            setIsExistMail(false);
          }
        }
      } catch (error) {}
    };
    checkEmail();

    return () => {
      isCancel = true;
    };
  }, [emailValue]);

  console.log(errors);

  const [checkValidation, setCheckValidation] = useState(validationList);
  return (
    <>
      <form
        className="signup__main__wrap__form"
        onSubmit={handleSubmit(handleSubmitSignup)}
      >
        <div
          className={
            errors.email || isExistMail
              ? 'signup__form__item validate__error'
              : 'signup__form__item'
          }
        >
          <div className="signup__form__item__label">
            Email<span>*</span>
          </div>
          <div className="input__item__form">
            <input
              type="text"
              placeholder="Email"
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Vui lòng nhập đúng email!',
                },
              })}
            />
            <span className="error__input">
              {isExistMail && 'Email đã tồn tại!'}
            </span>
            <span className="error__input">
              {errors.email && errors.email.message}
            </span>
          </div>
        </div>
        <div
          className={
            errors.password
              ? 'signup__form__item validate__error'
              : 'signup__form__item'
          }
        >
          <div className="signup__form__item__label">
            Mật khẩu<span>*</span>
          </div>
          <div className="input__item__form">
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              {...register('password')}
            />
            <span className="error__input">{errors.password && errors.password.message}</span>
          </div>
        </div>
        {/* <div className="signup__form__validate">
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
        </div> */}
        <div
          className={
            errors.repassword
              ? 'signup__form__item validate__error'
              : 'signup__form__item'
          }
        >
          <div className="signup__form__item__label">
            Nhập lại mật khẩu<span>*</span>
          </div>
          <div className="input__item__form">
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              {...register('repassword')}
            />
            <span className="error__input">{errors.repassword && errors.repassword.message}</span>
          </div>
        </div>
        <div className="signup__form__nav">
          <div className="signup__form__nav__back">
            {/* onClick={() => setType(-1)} */}
            <i className="fas fa-arrow-left"></i>Quay lại
          </div>
          <Button variant="contained" type="submit">
            {loading && (
              <CircularProgress
                style={{ width: '30px', height: '30px' }}
                className="loading"
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
      <div className="signup__main__wrap__options">
        ----- hoặc đăng ký bằng -----
      </div>
      <div className="signup__main__wrap__api">
        <button className="signup__api signup__api--gg">Google</button>
        <button className="signup__api signup__api--fb">Facebook</button>
      </div>
    </>
  );
}
