import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateStatus } from "../../../actions/signup";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
interface Validation {
  title: string;
  status: boolean;
}
interface FormInput {
  email: string;
  password: string;
  repassword: string;
}
export default function SignUpForm() {
  // use React Hook Form
  const ValidationShema = yup.object().shape({
    email: yup.string().required("Vui lòng nhập email"),
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu!")
      .min(8, "Mật khẩu phải chứa ít nhất 8 ký tự!"),
    repassword: yup
      .string()
      .required("Vui lòng xác nhận mật khẩu!")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp!"),
  });
  const formOptions = { resolver: yupResolver(ValidationShema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>(formOptions);
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

  const handleSubmitSignup = () => {
   
    setTimeout(()=>{
      dispatch(updateStatus(1));
    },1000);
  };

  const [checkValidation, setCheckValidation] = useState(validationList);
  return (
    <>
      <form className="signup__main__wrap__form" onSubmit={handleSubmit(handleSubmitSignup)}>  
        <div className={errors.email ? "signup__form__item validate__error" : "signup__form__item"}>
          <div className="signup__form__item__label">
            Email<span>*</span>
          </div>
          <input type="text" placeholder="Email" {...register("email")}/>  
        </div>
        <div className={errors.password ? "signup__form__item validate__error" : "signup__form__item"}>   
          <div className="signup__form__item__label">
            Mật khẩu<span>*</span>
          </div>
          <input type="password" placeholder="Nhập mật khẩu" {...register("password")}/>
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
        <div className={errors.repassword ? "signup__form__item validate__error" : "signup__form__item"}>
          <div className="signup__form__item__label">
            Nhập lại mật khẩu<span>*</span>
          </div>
          <input type="password" placeholder="Xác nhận mật khẩu" {...register("repassword")}/>
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
