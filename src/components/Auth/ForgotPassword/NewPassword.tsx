import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStatusForgotPassword } from "../../../actions/signup";

interface Validation {
  title: string;
  status: boolean;
}
const validationList: Validation[] = [
  {
    title: "Ít nhất 8 ký tự",
    status: true,
  },
  {
    title: "Ít nhất 1 chữ cái in thường và 1 chữ cái in hoa",
    status: false,
  },
  {
    title: "Ít nhất 1 số",
    status: true,
  },
  {
    title: "Ít nhất một ký tự đặt biệt (VD: @,#,&,...)",
    status: false,
  },
];

export default function NewPassword() {
  const [checkValidation, setCheckValidation] = useState(validationList);
  const dispatch = useDispatch();

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateStatusForgotPassword(2));
  }

  return (
    <form className="signup__main__wrap__form" onSubmit={handleChangePassword}>
      <div className="signup__form__item">
        <div className="signup__form__item__label ">Mật khẩu mới:</div>
        <input type="password" placeholder="Nhập mật khẩu mới" />
      </div>

      <div className="signup__form__validate password__validation">
        {checkValidation.map((item, index) => {
          return (
            <div
              className={
                item.status
                  ? "signup__form__validate__item signup__form__validate__item--true"
                  : "signup__form__validate__item"
              }
              key={index}
            >
              <i className="fas fa-check-circle"></i>
              <span>{item.title}</span>
            </div>
          );
        })}
      </div>
      <div className="signup__form__item">
        <div className="signup__form__item__label ">Xác nhận mật khẩu: </div>
        <input type="password" placeholder="Xác nhận mật khẩu" />
      </div>
      <div className="signup__form__nav forgot__nav">
        <div className="signup__form__nav__back forgot__nav__back"></div>
        <button type="submit">Đồng ý</button>
      </div>
    </form>
  );
}
