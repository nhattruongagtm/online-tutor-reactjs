import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import * as yup from 'yup';
import { InitialStateSignUp, SignUpSelector } from '../../../reducers/signup';
import { requestCheckCode, requestSignUp } from '../../../reducers/signUpSlice';

const ValidationMain = styled.div`
  /* background-color: grey; */
  height: 100%;
  /* margin-top: 20px; */
  padding-top: 20px;

  .signup__form__nav {
    display: flex;
    width: fit-content;
    justify-content: center;
    align-items: center;
    gap: 50px;
    height: 45px;
    margin: 60px 0px 25px 130px;
    &__back {
      cursor: pointer;
      color: gray;

      i {
        margin-right: 10px;
      }
    }
    &__back:hover {
      color: black;
    }
    button {
      cursor: pointer;
      height: 100%;
      width: 140px;
      color: white;
      border-radius: 5px;
      font-size: 17px;
      transition: opacity 0.2s;
      background-color: rgb(0, 54, 201);
    }
    button:hover {
      opacity: 0.9;
    }
  }
`;
const ValidationTitle = styled.div`
  color: #a3a3a3;
  font-style: italic;
  margin-bottom: 30px;
`;
const ValidationForm = styled.form``;
const FormInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 7px;
  .form__label {
    width: 120px;
    font-size: 14px;
  }
  input {
    outline: none;
    border-radius: 5px;
    border: 1px solid #bbbbbb;
    width: calc(100% - 120px - 20px);
    height: 45px;
    padding: 0 10px;
  }
`;
const ResendCode = styled.div`
  display: flex;
  float: right;
  font-size: 14px;
  gap: 5px;

  span:last-child {
    font-style: italic;
    cursor: pointer;

    :hover {
      color: #0000b88f;
      text-decoration: underline;
    }
  }
`;
interface CodeValidation {
  code: string;
}
export default function CodeValidation() {
  const validationShema = yup.object().shape({
    code: yup
      .string()
      .required('Vui lòng nhập mã xác nhận!')
      .length(6, 'Mã xác nhận gồm 6 ký tự, vui lòng thử lại!'),
  });
  const formOptions = { resolver: yupResolver(validationShema) };
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeValidation>(formOptions);
  // const inputs = useSelector((state: IInitialState) => state.signUpInfo);
  const [message, setMessage] = useState<string>('');
  const signUpUser = useSelector((state : SignUpSelector)=> state.signUpUser.user);

  useEffect(() => {
    if (errors.code) {
      const mess = errors.code.message;
      setMessage(mess as string);
    }
  }, [errors.code?.message]);

  const handleSendCode = (data: CodeValidation) => {
    setMessage('');
    dispatch(requestCheckCode(data.code));  
  };
  const handleReSendMail = () =>{
    dispatch(requestSignUp(signUpUser));  
  }

  return (
    <ValidationMain>
      <ValidationTitle>
        Chúng tôi đã gửi mã xác nhận vào email mà bạn đã đăng ký. Vui lòng kiểm
        tra email.
      </ValidationTitle>
      <ValidationForm onSubmit={handleSubmit(handleSendCode)}>
        <FormInput>
          <div className="form__label">Nhập mã xác nhận: </div>
          <input
            type="text"
            placeholder="Nhập mã xác nhận"
            {...register('code')}
          />
        </FormInput>
        <FormInput>
          <div className="form__label"> </div>
          <p style={{ fontSize: '12px', color: 'red' }}>{message}</p>
        </FormInput>
        <ResendCode>
          <span>Bạn chưa nhận được mã? </span>
          <span onClick={handleReSendMail}>Gửi lại mã</span>
        </ResendCode>
        <div className="signup__form__nav">
          <div className="signup__form__nav__back">
            {/* onClick={() => setType(-1)} */}
            <i className="fas fa-arrow-left"></i>Quay lại
          </div>
          <button type="submit">Tiếp theo</button>
        </div>
      </ValidationForm>
    </ValidationMain>
  );
}
