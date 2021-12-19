import React from 'react';
import './adminUsers.scss';

import { Col, Row } from 'react-bootstrap';
import { Route, Switch } from 'react-router';
import { TutorTab } from './TutorTab';
import { ADMIN__USER__STUDENT, ADMIN__USER__TUTOR } from '../../routes/path';
import { StudentTab } from './StudentTab';
import { NavLink } from 'react-router-dom';
import { Profile } from './Profile';
import { Header } from './Header';
interface UserProps {}

interface TabRoute {
  title: string;
  icon: string;
  path: string;
}

export const User = (props: UserProps) => {
  const tabs: TabRoute[] = [
    {
      title: 'Gia sư',
      icon: 'fab fa-discourse',
      path: `${ADMIN__USER__TUTOR}`,
    },
    {
      title: 'Học viên',
      icon: 'fas fa-user-graduate',
      path: `${ADMIN__USER__STUDENT}`,
    },
  ];
  return (
    <>
      <Col sm={8} className="dashboard__users">  
        <Header/>
        <div className="dashboard__users__main">
          <div className="dashboard__users__main__title">
            {tabs.map((tab) => (
              <NavLink to={tab.path} key={tab.path}>
                <div className="dashboard__users__main__title__item">
                  <i className={tab.icon}></i>
                  <span>{tab.title}</span>
                </div>
              </NavLink>
            ))}
          </div>
          <div className="dashboard__users__main__list">
            <div className="dashboard__users__main__list__item">
              <Switch>
                <Route path={ADMIN__USER__TUTOR}>
                  <TutorTab />
                </Route>
                <Route path={ADMIN__USER__STUDENT}>
                  <StudentTab />
                </Route>
              </Switch>
            </div>
          </div>
          <div className="dashboard__users__main__pagination">
            <ul className="dashboard__pagination">
              <li>
                <i className="fas fa-chevron-left"></i>
              </li>
              <li>1</li>
              <li className="dashboard__pagination--active">2</li>
              <li>3</li>
              <li>...</li>
              <li>15</li>
              <li>
                <i className="fas fa-chevron-right"></i>
              </li>
            </ul>
          </div>
        </div>
      </Col>
      <Col className="dashboard__users__profile">
        <Profile />
      </Col>
    </>
  );
};
