import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../../actions/signup";

interface Validation {
  title: string;
  status: boolean;
}
export default function SignUpForm() {
  const dispatch = useDispatch();
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateStatus(1));
  };

  const [checkValidation, setCheckValidation] = useState(validationList);
  return (
    <>
      <form className="signup__main__wrap__form" onSubmit={handleSubmit}>
        <div className="signup__form__item">
          <div className="signup__form__item__label">
            Email<span>*</span>
          </div>
          <input type="text" placeholder="Email" />
        </div>
        <div className="signup__form__item">
          <div className="signup__form__item__label">
            Mật khẩu<span>*</span>
          </div>
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>
        <div className="signup__form__validate">
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
          <div className="signup__form__item__label">
            Nhập lại mật khẩu<span>*</span>
          </div>
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>
        <div className="signup__form__nav">
          <div className="signup__form__nav__back">
            {/* onClick={() => setType(-1)} */}
            <i className="fas fa-arrow-left"></i>Quay lại
          </div>
          <button type="submit">Tiếp theo</button>
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
