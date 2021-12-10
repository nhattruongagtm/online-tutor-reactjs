import { CircularProgress } from "@material-ui/core";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateStatusForgotPassword } from "../../../actions/signup";
import "../SignUp/signup.scss";
interface SendMailProps {
  sendMail: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
interface FormValue {
  email: string;
  code: string;
}
export default function EmailValidation({ sendMail }: SendMailProps) {
  const [status, setStatus] = useState<boolean>(false);
  const [isSendMail,setIsSendMail] = useState<boolean>();
  const [isSendCode,setIsSendCode] = useState<boolean>();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();

  const handleSendMail = () => {
    setIsSendMail(true);
    setTimeout(() => {
      setStatus(true);
      setIsSendMail(false);
    }, 1000);
  };
  const handleSendCode = () => {
    setIsSendCode(true);
    setTimeout(()=>{
      dispatch(updateStatusForgotPassword(1));
      setIsSendCode(false);

    }, 2000);
  };
  return (
    <div className="signup__main__wrap__form">
      {!status ? (
        <form onSubmit={handleSubmit(handleSendMail)}>
          <div className="signup__form__item">
            <label className="signup__form__item__label ">Email:</label>
            <input
              type="text"
              placeholder="Email"
              className={errors.email && "login__error"}
              {...register("email", {
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              })}
            />
          </div>
          <div className="signup__form__item signup__form__item--validate">
            <label className="signup__form__item__label "></label>
            {errors.email?.type === "pattern" && <span>Email không đúng!</span>}
            {errors.email?.type === "required" && (
              <span>Vui lòng nhập email!</span>
            )}
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
            {/* <div className="forgot__nav__btn" onClick={handleSendMail}>
              Gửi mã
            </div> */}
            <Button variant="contained" type="submit">
              <Typography sx={{mr: 1}}>Gửi mã </Typography>
              {isSendMail && <CircularProgress size={20} className="cirlce__progress"/>}
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(handleSendCode)}>
          <div className="signup__form__item">
            <div className="signup__form__item__label ">Mã xác nhận:</div>
            <input type="text" placeholder="Nhập mã xác nhận" {...register("code")}/>
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
            <Button variant="contained" type="submit">
            <Typography sx={{mr: 1}}>Tiếp theo </Typography>
              {isSendCode && <CircularProgress size={20} className="cirlce__progress"/>}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
