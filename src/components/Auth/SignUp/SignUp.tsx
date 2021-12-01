import React, { useEffect, useState } from "react";
import "../SignUp/signup.scss";
import "../Login/login.scss";
import { Link } from "react-router-dom";
import { LOGIN_PATH, SIGNUP_PATH } from "../../../constants/path";
import { useHistory } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import CodeValidation from "./CodeValidation";
import InfoValidation from "./InfoValidation";
import { useSelector } from "react-redux";
import {Prompt} from 'react-router';

interface RootState {
  signUpStatus: {
    status: number;
  };
}
export default function SignUp() {
  const history = useHistory();
  const [type, setType] = useState<number>(-1);
  const status = useSelector((state: RootState) => state.signUpStatus.status);
  const [statusBar, setStatusBar] = useState<number>(status);

  useEffect(() => {
    setStatusBar(status);
  }, [status]);

  const statusList: string[] = [
    "Thông tin tài khoản",
    "Xác thực tài khoản",
    "Thông tin cá nhân",
    "Hoàn thành",
  ];

  const SuccessNotification = () => {
    return (
      <div className="signup__success">
        <div className="signup__success__img"></div>
        <div className="signup__success__notify">
          <div>Đăng ký tài khoản thành công!</div>
          <div>
            Vui lòng đăng nhập để bắt đầu{" "}
            {Number(type) === 1 ? "giảng dạy" : "học"}
          </div>
        </div>
        <button className="signup__success__login">Đăng nhập</button>
      </div>
    );
  };

  return (
    <div className="signup__main login__main"> 
      {Number(type) === -1 ? (
        <div className="login__main__wrap login__main__wrap__options">
          <div className="login__main__title">
            <div className="title__login">Đăng ký tài khoản</div>
          </div>
          <div className="login__main__wrap__options__form">
            <div className="login__main__toporaphy">Đăng ký với tư cách</div>
            <div className="login__options">
              <div className="login__options__item" onClick={() => setType(1)}>
                <div className="login__options__item__parent">
                  <div className="login__options__item__img tutor__icon"></div>
                  <span>Gia sư</span>
                </div>
                <i className="fas fa-arrow-right"></i>
              </div>
              <div className="login__options__item" onClick={() => setType(0)}>
                <div className="login__options__item__parent">
                  <div className="login__options__item__img student__icon"></div>
                  <span>Học viên</span>
                </div>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
            <div className="login__main__nav login__main__nav__options">
              <span>Bạn đã có tài khoản? </span>
              <Link to={LOGIN_PATH}>
                <button>Đăng nhập</button>
              </Link>
            </div>
          </div>
          <div
            className="login__main__back login__options__back"
            onClick={() => history.goBack()}
          >
            <i className="fas fa-arrow-left"></i>
            <span>Quay lại</span>
          </div>
        </div>
      ) : (
        <div className="signup__main__wrap">
          <Prompt when = {true} message={'Bạn có muốn thoát khỏi trang này?'}/> 
          <div className="signup__main__wrap__title">
            <div> Đăng ký tài khoản </div>
            <div>{Number(type) === 1 ? "Gia sư" : "Học viên"}</div>
          </div>
          <div className="signup__main__wrap__status ">
            {/* signup__status__item--complete */}
            {statusList.map((item, index) => {
              return (
                <div
                  className={
                    Number(statusBar) < index
                      ? "signup__status__item"
                      : "signup__status__item signup__status__item--complete"
                  }
                  key={index}
                >
                  <div className="signup__status__item__number">
                    {Number(index + 1)}
                  </div>
                  <div className="signup__status__item__title">{item}</div>
                </div>
              );
            })}
          </div>
          <div className="signup__main__wrap__element">
            {statusBar === 0 && <SignUpForm />}
            {statusBar === 1 && <CodeValidation />}
            {statusBar === 2 && <InfoValidation />}
            {statusBar === 3 && <SuccessNotification />}
          </div>
          <div className="signup__main__wrap__login">
            Bạn đã có tài khoản?{" "}
            <span onClick={() => history.push(LOGIN_PATH)}>Đăng nhập ngay</span>
          </div>
        </div>
      )}
    </div>
  );
}
