import { Modal } from 'antd';
import React, { useState } from 'react';
import { Col, Stack } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants/auth';
import { SUBJECT_PATH } from '../../constants/path';
import ProfileAd from './Profile/ProfileAd';
import {
  ADMIN__BLOG,
  ADMIN__COURSE,
  ADMIN__HOME,
  ADMIN__PROFILE,
  ADMIN__SETTINGS,
  ADMIN__USER,
  ADMIN__USER__STUDENT,
  ADMIN__USER__TUTOR,
  ADMIN__SUBJECT,
} from '../routes/path';
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
      icon: 'fa-solid fa-users',
      title: 'Người dùng',
      path: `${ADMIN__USER__TUTOR}` || `${ADMIN__USER__STUDENT}`,
    },
    {
      icon: 'fab fa-discourse',
      title: 'Khóa học',
      path: `${ADMIN__COURSE}`,
    },
    {
      icon: 'fa-brands fa-blogger',
      title: 'Bài viết',
      path: `${ADMIN__BLOG}`,
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showLogoutModal = () => {
    setIsLogout(true);
  };

  const handleOkLogout = () => {
    setIsLogout(false);
  };

  const handleCancelLogout = () => {
    setIsLogout(false);
  };
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

        <>
          <div className="dashboard__navigation__item" onClick={showModal}>
            <i className="far fa-user"></i>
            <span>Hồ sơ</span>
          </div>
          <Modal
            title="Thông tin cá nhân"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <ProfileAd />
          </Modal>
        </>

        <div
          className="dashboard__navigation__item dashboard__logout"
          onClick={showLogoutModal}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Đăng xuất</span>
        </div>
        <Modal
          title="Đăng xuất"
          visible={isLogout}
          onOk={handleOkLogout}
          onCancel={handleCancelLogout}
        >
          <p>Bạn có muốn đăng xuất không?</p>
        </Modal>
      </Stack>
    </Col>
  );
}
