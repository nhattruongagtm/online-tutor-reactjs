import React from 'react';
import '../ForgotPassword/style.scss';
import { Prompt } from 'react-router';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import '../SignUp/signup.scss';
import '../Login/login.scss';
import EmailValidation from './EmailValidation';
import NewPassword from './NewPassword';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { HOME_PATH, LOGIN_PATH } from '../../../constants/path';
import { InitialStateForgot } from '../../../reducers/forgotPasswordSlice';
export interface ForgotSelector {
  forgotPassword: InitialStateForgot;
}
export default function ForgotPassword() {
  const history = useHistory();
  const forgotSelector = useSelector(
    (state: ForgotSelector) => state.forgotPassword
  );
  const { progress } = forgotSelector;
  const [statusBar, setStatusBar] = useState<number>(forgotSelector.progress);

  const [userID, setUserID] = useState<string>();

  useEffect(() => {
    setStatusBar(progress);
  }, [progress]);

  const statusList: string[] = [
    'Xác thực tài khoản',
    'Tạo mật khẩu mới',
    'Hoàn thành',
  ];

  const SuccessNotification = () => {
    return (
      <div className="signup__success">
        <div className="signup__success__img"></div>
        <div className="signup__success__notify">
          <div>Đổi mật khẩu thành công!</div>
          <div>Vui lòng đăng nhập để bắt đầu!</div>
          <button
            className="signup__success__login forgot__success"
            onClick={() => history.push(LOGIN_PATH)}
          >
            Đăng nhập
          </button>
          {/* <Button variant="contained" onClick={()=>history.push(HOME_PATH)} >Đăng nhập</Button>   */}
        </div>
      </div>
    );
  };

  const handleGetUserID = (userID: string) => {
    setUserID(userID);
  };

  return (
    <div className="signup__main__wrap forgot__password">
      <Prompt
        when={statusBar === 1 ? true : false}
        message={'Bạn có muốn thoát khỏi trang này?'}
      />
      <div className="signup__main__wrap__title forgot__title">
        <div> Quên mật khẩu </div>
      </div>
      <div className="signup__main__wrap__status forgot__status">
        {/* signup__status__item--complete */}
        {statusList.map((item, index) => {
          return (
            <div
              className={
                statusBar < index
                  ? 'signup__status__item'
                  : 'signup__status__item signup__status__item--complete'
              }
              key={index}
            >
              <div className="signup__status__item__number">{index + 1}</div>
              <div className="signup__status__item__title">{item}</div>
            </div>
          );
        })}
      </div>

      <div className="signup__main__wrap__element">
        {statusBar === 0 && <EmailValidation sendMail={handleGetUserID} />}
        {statusBar === 1 && <NewPassword onGetUserID={userID} />}
        {statusBar === 2 && <SuccessNotification />}
      </div>
      <div
        className="signup__form__nav__back forgot__nav__back"
        onClick={() => history.goBack()}
      >
        <i className="fas fa-arrow-left"></i>Quay lại
      </div>
    </div>
  );
}
