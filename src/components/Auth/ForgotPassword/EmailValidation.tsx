import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStatusForgotPassword } from "../../../actions/signup";
import "../SignUp/signup.scss";
interface SendMailProps {
  sendMail: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
export default function EmailValidation({ sendMail }: SendMailProps) {
  const [status, setStatus] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleSendMail = () => {
    setStatus(true);
  };
  const handleSendCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateStatusForgotPassword(1));
  };
  return (
    <form className="signup__main__wrap__form" onSubmit={handleSendCode}>
      {!status ? (
        <>
          <div className="signup__form__item">
            <div className="signup__form__item__label ">Email:</div>
            <input type="text" placeholder="Email" name="email" />
          </div>
          <div className="signup__form__item forgot__email">
            <div className="signup__form__item__label "></div>
            <span>
              Chúng tôi sẽ gửi mã code vào email mà bạn đã đăng ký. Vui lòng
              kiểm tra email.
            </span>
          </div>
          <div className="signup__form__nav forgot__nav">
            <div className="signup__form__nav__back forgot__nav__back "></div>
            <div className="forgot__nav__btn" onClick={handleSendMail}>
              Gửi mã
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="signup__form__item">
            <div className="signup__form__item__label ">Mã xác nhận:</div>
            <input type="text" placeholder="Nhập mã xác nhận" name="code" />
          </div>
          <div className="signup__form__item forgot__email">
            <div className="signup__form__item__label "></div>
            <span>
              Chúng tôi sẽ đã mã code vào email mà bạn đã đăng ký. Vui lòng kiểm
              tra email và xác nhận.{" "}
            </span>
          </div>
          <div className="signup__form__nav forgot__nav">
            <div className="signup__form__nav__back forgot__nav__back"></div>
            <button type="submit">Tiếp theo</button>
          </div>
        </>
      )}
    </form>
  );
}
