import React from 'react';
import { Col, Stack } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ADMIN__COURSE, ADMIN__HOME, ADMIN__PROFILE, ADMIN__SETTINGS, ADMIN__USER, ADMIN__USER__TUTOR } from '../routes/path';
interface Route {
  icon: string;
  title: string;
  path: string;
}
export default function Navigation() {
  const routes: Route[] = [
    {
      icon: 'fas fa-columns',
      title: 'Dashboard',
      path: `${ADMIN__HOME}`,
    },
    {
      icon: 'fas fa-columns',
      title: 'Người dùng',
      path: `${ADMIN__USER__TUTOR}`,
    },
    {
      icon: 'fab fa-discourse',
      title: 'Khóa học',
      path: `${ADMIN__COURSE}`,
    },
    {
      icon: 'far fa-user',   
      title: 'Hồ Sơ',
      path: `${ADMIN__PROFILE}`,
    },
    {
      icon: 'fas fa-cog',
      title: 'Cài đặt',
      path: `${ADMIN__SETTINGS}`,  
    },
  ];
  return (
    <Col xs={2} md={2} sm={2} className="dashboard__navigation">
      <div className="dashboard__logo">
        <div className="dashboard__logo__img"></div>
      </div>
      <Stack
        direction="vertical"
        gap={2}
        className="dashboard__navigation__list"
      >
        {routes.map((route) => (
          <NavLink to={route.path} key={route.path}>
            <div className="dashboard__navigation__item">
              <i className={route.icon}></i>
              <span>{route.title}</span>
            </div>
          </NavLink>
        ))}

        <div className="dashboard__navigation__item dashboard__logout">
          <i className="fas fa-sign-out-alt"></i>
          <span>Đăng xuất</span>
        </div>
      </Stack>
    </Col>
  );
}
