import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Switch, useLocation } from 'react-router';
import { Courses } from './Courses/Courses';
import { ADMIN__COURSE, ADMIN__HOME, ADMIN__PROFILE, ADMIN__SETTINGS, ADMIN__USER, ADMIN__USER__TUTOR } from '../routes/path';
import './dashboard.scss';
import { Home } from './Home/Home';
import Navigation from './Navigation';
import Profile from './Profile/Profile';
import { Settings } from './Settings/Settings';
import { User } from './User/User';

export interface DashBoardProps {}

export default function DashBoard(props: DashBoardProps) {
  
  return (
    <div className="dashboard">
      <Container className="dashboard__main dashboard__container">
        <Row className="dashboard__main__page">
          <Navigation/>
          <Col className="dashboard__page">
            <div className="dashboard__header">
              <div className="dashboard__header__title">Dashboard</div>
              <div className="dashboard__header__main">
                <div className="dashboard__header__main__search">
                  <div className="header__search__contain">
                    <input type="text" placeholder="Tìm kiếm" />
                    <button>
                      {' '}
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
                <div className="dashboard__header__main__info">
                  <div className="header__info__contain">
                    <div className="header__info__contain__avatar">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Angelina_Jolie_2_June_2014_%28cropped%29.jpg"
                        alt=""
                      />
                    </div>
                    <span>Angelia Joli</span>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
              </div>
            </div>
            <Row className="dashboard__main__work">
              <Switch>
                <Route exact path={ADMIN__HOME}>
                    <Home/>
                </Route>
                <Route path={`${ADMIN__USER}/:slug`} >
                    <User/>
                </Route>
                <Route path={ADMIN__PROFILE}>
                    <Profile/>  
                </Route>
                <Route path={ADMIN__SETTINGS}>  
                    <Settings/>    
                </Route>
                <Route path={ADMIN__COURSE}>
                    <Courses/>    
                </Route>
              </Switch>
             </Row>
          </Col>
        </Row>
      </Container>  
    </div>
  );
}
