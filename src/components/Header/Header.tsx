import React, { useEffect, useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import {
  CART_PATH,
  FAQ_PATH,
  FIND_TUTOR_PATH,
  HOME_PATH,
  LOGIN_PATH,
  ME_PATH,
  NEWS_PATH,
  PROFILE_PATH,
  TUTOR_LIST_PATH,
  WAITING_CLASS_PATH,
} from '../../constants/path';
import '../Header/header.scss';
import { ACCESS_TOKEN } from '../../constants/auth';
import { ClassItem } from '../../components/WaitingClassList/WaitingClassList';
import { courseApi } from '../../api/CourseApi';
import useUser from '../../hooks/useUser';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Params } from '../../api/tutorApi';
import { loadCartList } from '../../reducers/cartSlice';
import { updatePageData } from '../../reducers/cartSlice';
interface IRoutes {
  path: string;
  title: string;
}
export default function Header() {
  const dispatch = useDispatch();
  const [savedCourse, setSavedCourse] = useState<ClassItem[]>();
  const [user] = useUser();
  const cart = useSelector((state: RootState) => state.cart);
  const { currentPage, list, totalItems, totalPages } = cart;
  // get saved courses (cart)
  useEffect(() => {
    const params: Params = {
      page: currentPage,
      limit: 4,
    };
    user &&
      courseApi
        .getCartList(user.id, params)
        .then((res) => {
          console.log(res);
          dispatch(updatePageData(res.data));
        })
        .catch((e) => {
          console.log(e);
        });
  }, [user, currentPage]);

  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;
  const routes: IRoutes[] = [
    {
      path: `${HOME_PATH}`,
      title: 'Trang chủ',
    },
    {
      path: `${FIND_TUTOR_PATH}`,
      title: 'Đăng bài viết',
    },
    {
      path: `${WAITING_CLASS_PATH}`,
      title: 'Lớp chờ gia sư',
    },
    {
      path: `${TUTOR_LIST_PATH}`,
      title: 'Danh sách gia sư',
    },
    {
      path: `${NEWS_PATH}`,
      title: 'Tin tức',
    },
    // {
    //   path: `${FAQ_PATH}`,
    //   title: "Hỏi đáp",
    // },
  ];

  useEffect(() => {
    routes.forEach((route) => {
      if (route.path === '/') {
        document.title = 'Gia sư trực tuyến';
      } else if (route.path === pathName) {
        document.title = route.title;
      }
    });
  }, [location]);
  return (
    <div className="header">
      <div className="header__main">
        <div className="header__logo">
          {/* <img
          src="https://c8.alamy.com/comp/2E2PMN6/vector-logo-of-a-tutor-educational-courses-2E2PMN6.jpg"
          alt=""
        /> */}
        </div>
        {/* header__navigation--active */}
        <div className="header__navigation">
          {routes.map((route, index) => {
            return (
              <NavLink
                to={route.path}
                className="header__navigation__item"
                key={index}
              >
                {route.title}
              </NavLink>
            );
          })}
        </div>
        <div className="header__auth">
          <div
            className="header__auth__cart"
            onClick={() => history.push(CART_PATH)}
          >
            {/* <i className="fas fa-shopping-cart"></i> */}
            <i className="fa-solid fa-book"></i>
            <div className="header__auth__cart__number">{totalItems}</div>
          </div>

          {localStorage.getItem(ACCESS_TOKEN) ? (
            <div
              className="header__auth__user"
              onClick={() => {
                history.push(`${ME_PATH}${PROFILE_PATH}`);
              }}
            >
              <div className="header__auth__user__img">
                <img
                  src={
                    user?.avatar ||
                    `https://avatars.dicebear.com/api/avataaars/${user?.id}
              }.jpg`
                  }
                  alt=""
                />
              </div>
              <div className="header__auth__user__name">
                {user?.displayName}
              </div>
            </div>
          ) : (
            <Link to={LOGIN_PATH} className="header__auth__btn">
              Đăng nhập
            </Link>
          )}
          <div className="header__auth__menu">
            <label htmlFor="header__menu">
              <i className="fas fa-bars"></i>
            </label>
            <input type="checkbox" id="header__menu" hidden />

            <ul className="navigation__responsive">
              <li>
                <label htmlFor="header__menu">
                  <i className="fas fa-times-circle menu__close__header"></i>
                </label>
              </li>

              {routes.map((route, index) => {
                return (
                  <Link key={index} to={route.path}>
                    <span>{route.title}</span>
                    <i className="fas fa-arrow-right menu__hover__header"></i>
                  </Link>
                );
              })}
            </ul>

            <label
              htmlFor="header__menu"
              className="header__menu__layer"
            ></label>
          </div>
        </div>
      </div>
    </div>
  );
}
