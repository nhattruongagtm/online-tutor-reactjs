import React from "react";
import { NavLink } from "react-router-dom";
import { COURSE_INFO_PATH, ME_PATH, PROFILE_PATH } from "../../constants/path";
import "./style.scss";
interface NavigationList {
  icon: string;
  title: string;
  path: string;
}
export default function Navigation() {
  const navigationList: NavigationList[] = [
    {
      icon: "fas fa-info-circle",
      title: "Thông tin cá nhân",
      path: `${ME_PATH}${PROFILE_PATH}`,
    },
    {
      icon: "fas fa-book",
      title: "Khóa học",
      path: `${ME_PATH}${COURSE_INFO_PATH}`,
    },
    {
      icon: "fas fa-table",
      title: "Lịch học",
      path: `${ME_PATH}${COURSE_INFO_PATH}`,
    },
    {
      icon: "fas fa-sign-out-alt",
      title: "Đăng xuất",
      path: `${ME_PATH}${COURSE_INFO_PATH}`,
    },
  ];
  return (
    <div className="me__nav">
      <div className="me__nav__body">
        {navigationList.map((item) => {
          return (
            <NavLink to={item.path} key={item.icon}>
              <div className="me__nav__item">
                <i className={item.icon}></i>
                <span>{item.title}</span>
              </div>
            </NavLink>
          );
        })}
      </div>

      <div className="me__nav__footer"></div>
    </div>
  );
}
