import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FORGET_PASSWORD_PATH, SIGNUP_PATH } from "../../../constants/path";

import "../Login/login.scss";
export default function Login() {
  const [type, setType] = useState<-1 | 1 | 0>(-1);
  const history = useHistory();

  return (
    <div className="login__main">
      {type === -1 ? (
        <div className="login__main__wrap login__main__wrap__options">
          <div className="login__main__title">
            <div className="title__login">Đăng nhập</div>
          </div>
          <div className="login__main__wrap__options__form">
            <div className="login__main__toporaphy">Đăng nhập với tư cách</div>
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
              <span>Bạn chưa có tài khoản? </span>
              <Link to={SIGNUP_PATH}>
                <button>Đăng ký</button>
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
        <div className="login__main__wrap">
          <div className="login__main__back" onClick={() => setType(-1)}>
            <i className="fas fa-arrow-left"></i>
            <span>Quay lại</span>
          </div>
          <div className="login__main__title">
            <div>Đăng nhập</div>
            <span>{Number(type) === 1 ? "Gia sư" : "Học viên"}</span>
          </div>
          <form className="login__main__form">
            <div className="login__main__form__info">
              <div className="login__main__form__info__label">Email</div>
              <input type="text" placeholder="Email" />
            </div>
            <div className="login__main__form__info">
              <div className="login__main__form__info__label">Mật khẩu</div>
              <input type="password" placeholder="Nhập mật khẩu" />
            </div>
            <div className="login__main__form__save">
             <label htmlFor="save__account"> <input type="checkbox" id="save__account"/> <span>Ghi nhớ tài khoản</span></label>
            </div>
            <button type="submit">Đăng nhập</button>
          </form>
          <Link to={FORGET_PASSWORD_PATH}><div className="login__main__forget">Quên mật khẩu?</div></Link>
          <div className="login__main__option">
            --------hoặc đăng nhập bằng---------
          </div>
          <div className="login__main__api">
            <button className="login__main__api--google">Google</button>
            <button className="login__main__api--facebook">Facebook</button>
          </div>
          <div className="login__main__nav">
            <span>Bạn chưa có tài khoản? </span>
            <Link to={SIGNUP_PATH}>
              <button>Đăng ký</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
