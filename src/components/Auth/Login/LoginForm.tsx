import React, { useState } from "react";
import register, { useForm } from "react-hook-form";
import Button from '@mui/material/Button'
import { Typography } from "@mui/material";
import  {CircularProgress} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { HOME_PATH, LOGIN_PATH } from "../../../constants/path";

interface FormInput {
  email: string;
  password: string;
  save: boolean;
}

export default function LoginForm() {
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();
  const handleLoginSubmit = (data: FormInput) => {
    setIsLoading(true);
    setTimeout(()=>{
      setIsLoading(false);
      history.push(HOME_PATH);
    },1000)
  };
  return (
    <form
      className="login__main__form"
      onSubmit={handleSubmit(handleLoginSubmit)}
    >
      <div className="login__main__form__info">
        <div className="login__main__form__info__label">Email</div>
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i })}
          className={errors.email && "login__error"}
        />
        {errors.email?.type === "pattern" && <span>Email không đúng!</span>}
        {errors.email?.type === "required" && <span>Vui lòng nhập email!</span>}
      </div>
      <div className="login__main__form__info">
        <div className="login__main__form__info__label">Mật khẩu</div>
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          {...register("password",{ required : true, pattern : /^[a-z0-9]/i, minLength: 8})}
          className={errors.password && "login__error"}
        />
        {errors.password?.type === "required" && (<span>Vui lòng nhập mật khẩu!</span>)}
        {/* {errors.password?.type === "pattern" && (<span>Mật khẩu không hợp nlệ!</span>)} */}
        {errors.password?.type === "minLength" && (<span>Mật khẩu phải tối thiểu 8 ký tự!</span>)}
      </div>
      <div className="login__main__form__save">
        <label htmlFor="save__account">
          <input type="checkbox" id="save__account" {...register("save")} />
          <span>Ghi nhớ tài khoản</span>
        </label>
      </div>
      {/* <button type="submit">Đăng nhập</button> */}
      <Button variant="contained" type="submit">  
          <Typography sx={{ mr: 1 }}>Đăng nhập </Typography>
          {isLoading && (
            <CircularProgress size={20} className="cirlce__progress" />
          )}
        </Button>
    </form>
  );
}
