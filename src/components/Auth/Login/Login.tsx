import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FORGET_PASSWORD_PATH, HOME_PATH, SIGNUP_PATH } from "../../../constants/path";
import "../Login/login.scss";
import LoginForm from "./LoginForm";
import { facebookProvider,googleProvider } from "../../../config/authMethods";
import { FacebookAuthProvider, GoogleAuthProvider } from "@firebase/auth";
import socialAuth from "../../../auth/auth";



export default function Login() {

  // 1 là gia sư, 0 là học viên, mặc định -1
  const [type, setType] = useState< -1 | 1 | 0>(-1);
  const history = useHistory();


  // đăng nhập bằng google, facebook
  const handleLoginAPI = async (provider: FacebookAuthProvider | GoogleAuthProvider) =>{
    const res = await socialAuth(provider);




    res && history.push(HOME_PATH) 
  }
  


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
          
          <LoginForm type={type}/>

          <Link to={FORGET_PASSWORD_PATH}><div className="login__main__forget">Quên mật khẩu?</div></Link>
          <div className="login__main__option">
            --------hoặc đăng nhập bằng---------
          </div>
          <div className="login__main__api">
            <button className="login__main__api--google" onClick={()=>handleLoginAPI(googleProvider)}>
            Google
            </button>
           
            <button className="login__main__api--facebook" onClick={()=>handleLoginAPI(facebookProvider)}>Facebook</button>
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
