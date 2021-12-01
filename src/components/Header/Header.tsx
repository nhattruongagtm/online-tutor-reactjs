import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../Header/header.scss";
import {FAQ_PATH, FIND_TUTOR_PATH, HOME_PATH, LOGIN_PATH, NEWS_PATH, TUTOR_LIST_PATH, WAITING_CLASS_PATH} from '../../constants/path';
interface IRoutes {
  path: string;
  title: string;
}
export default function Header() {
  const routes: IRoutes[] = [
    {
      path: `${HOME_PATH}`,
      title: "Trang chủ",
    },
    {
      path: `${FIND_TUTOR_PATH}`,
      title: "Đăng tìm gia sư",
    },
    {
      path: `${WAITING_CLASS_PATH}`,
      title: "Lớp chờ gia sư",
    },
    {
      path: `${TUTOR_LIST_PATH}`,
      title: "Danh sách gia sư",
    },
    {
      path: `${NEWS_PATH}`,
      title: "tin tức",
    },
    {
      path: `${FAQ_PATH}`,
      title: "Hỏi đáp",
    },
  ];
  return (
    <div className="header">
      <div className="header__logo">
        {/* <img
          src="https://c8.alamy.com/comp/2E2PMN6/vector-logo-of-a-tutor-educational-courses-2E2PMN6.jpg"
          alt=""
        /> */}
      </div>
      {/* header__navigation--active */}
      <ul className="header__navigation">
        {routes.map((route, index) => {
          return (
            <NavLink to={route.path} className="header__navigation__item" key={index}>
              {route.title}
            </NavLink>
          );
        })}
      </ul>
      <div className="header__auth">
        <div className="header__auth__cart">
          <i className="fas fa-shopping-cart"></i>
          <div className="header__auth__cart__number">2</div>
        </div>
        {/* <div className="header__auth__user">
          <div className="header__auth__user__img">
            <img
              src="https://i.pinimg.com/originals/5f/12/21/5f12212ed4d94b0dafe0f18a8e55832b.jpg"
              alt=""
            />
          </div>
          <div className="header__auth__user__name">Nhật Trường</div>
        </div> */}
        <Link to={LOGIN_PATH} className="header__auth__btn" >Đăng nhập</Link>
      </div>
    </div>
  );
}
