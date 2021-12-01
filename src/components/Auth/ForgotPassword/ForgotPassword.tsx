import React from 'react'
import "../ForgotPassword/style.scss"
import { Prompt } from 'react-router';
import { useHistory } from 'react-router';
import { useState,useEffect } from 'react';
import "../SignUp/signup.scss"
import "../Login/login.scss"
import EmailValidation from './EmailValidation';
import NewPassword from './NewPassword';
import { useSelector } from 'react-redux';
interface RootState{
  forgotStatus: { status : number};
}
export default function ForgotPassword() {
    const history = useHistory();
    const status = useSelector((state: RootState) => state.forgotStatus.status);
    const [statusBar, setStatusBar] = useState<number>(status); 
  
    useEffect(() => {
      setStatusBar(status);
    }, [status]);
  
    const statusList: string[] = [
      "Xác thực tài khoản",
      "Tạo mật khẩu mới",
      "Hoàn thành",
    ];

    const SuccessNotification = () => {
        return (
          <div className="signup__success">
            <div className="signup__success__img"></div>
            <div className="signup__success__notify">
              <div>Đổi mật khẩu thành công!</div>
              <div>
                Vui lòng đăng nhập để bắt đầu!
            </div>
            <button className="signup__success__login forgot__success">Đăng nhập</button>  
          </div>
          </div>
        );
      };
  
    return (
        <div className="signup__main__wrap forgot__password">
        <Prompt when = {true} message={'Bạn có muốn thoát khỏi trang này?'}/> 
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
                    ? "signup__status__item"
                    : "signup__status__item signup__status__item--complete"
                }
                key={index}
              >
                <div className="signup__status__item__number">
                  {index + 1}
                </div>
                <div className="signup__status__item__title">{item}</div>
              </div>
            );
          })}
        </div>

        <div className="signup__main__wrap__element">
          {statusBar === 0 && <EmailValidation sendMail={(e)=>{}}/>}
          {statusBar === 1 && <NewPassword />}
          {statusBar === 2 && <SuccessNotification />}
        </div> 
        <div className="signup__form__nav__back forgot__nav__back" onClick={()=> history.goBack()}>
        
        <i className="fas fa-arrow-left" ></i>Quay lại
      </div>
          
      </div>
    
    )
}
