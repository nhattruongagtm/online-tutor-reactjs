import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants/auth';
import { COURSE_INFO_PATH, HOME_PATH, ME_PATH, PROFILE_PATH, SCHEDULE_PATH } from '../../constants/path';
import { useHistory } from 'react-router';
import './style.scss';
interface NavigationList {
  icon: string;
  title: string;
  path: string;
}
export default function Navigation() {
  const history = useHistory();
  const [isSignOut,setIsSignOut] = useState<boolean>(false);

  const navigationList: NavigationList[] = [
    {
      icon: 'fas fa-info-circle',
      title: 'Tổng quan',
      path: `${ME_PATH}${PROFILE_PATH}`,
    },
    {
      icon: 'fas fa-book',
      title: 'Khóa học',
      path: `${ME_PATH}${COURSE_INFO_PATH}`,
    },
    {
      icon: 'fas fa-table',
      title: 'Lịch học',
      path: `${ME_PATH}${SCHEDULE_PATH}`,
    },
  ];

  const handleSignOut = () =>{
    localStorage.removeItem(ACCESS_TOKEN);
    !localStorage.getItem(ACCESS_TOKEN) && history.push(HOME_PATH);
  }
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
        <label className="me__nav__item" onClick={()=>setIsSignOut(!isSignOut)}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Đăng xuất</span>
        </label>
      </div>
        {isSignOut && (
           <div className="me__nav__signout">
           <div className="me__nav__signout__title">
             Bạn chắc chắn muốn đăng xuất chứ?
           </div>
           <div className="me__nav__signout__btn">
             <button className="signout__btn signout__btn--cancel" onClick={()=>setIsSignOut(false)}>Đóng</button>
             <button className="signout__btn signout__btn--agree"onClick={handleSignOut}>Đồng ý</button>
           </div>
     
           </div>
        )}

      <div className="me__nav__footer"></div>
    </div>
  );
}
