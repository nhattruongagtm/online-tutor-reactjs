import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Route, Switch } from 'react-router';
import useUser from '../../hooks/useUser';
import {
  ADMIN__BLOG,
  ADMIN__BLOG__CREATE,
  ADMIN__COURSE,
  ADMIN__HOME,
  ADMIN__POST,
  ADMIN__PROFILE,
  ADMIN__SETTINGS,
  ADMIN__SUBJECT,
  ADMIN__USER
} from '../routes/path';
import Blog from './Blog/Blog';
import NewBlog from './Blog/NewBlog';
import { Courses } from './Courses/Courses';
import './dashboard.scss';
import { Home } from './Home/Home';
import Navigation from './Navigation';
import Posts from './Post/Posts';
import Profile from './Profile/Profile';
import { Settings } from './Settings/Settings';
import Subject from './Subject/Subject';
import { User } from './User/User';
export interface DashBoardProps {}

export default function DashBoard(props: DashBoardProps) {
  const [user] = useUser();
  return (
    <div className="dashboard">
      <Container className="dashboard__main dashboard__container">
        <Row className="dashboard__main__page">
          <Navigation />
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
                        src={
                          user?.avatar ||
                          `https://avatars.dicebear.com/api/avataaars/${user?.id}
                      }.jpg`
                        }
                        alt=""
                      />
                    </div>
                    <span>{'Admin'}</span>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
              </div>
            </div>
            <Row className="dashboard__main__work">
              <Switch>
                <Route exact path={ADMIN__HOME}>
                  <Home />
                </Route>
                <Route path={`${ADMIN__USER}/:slug`}>
                  <User />
                </Route>
                <Route path={ADMIN__PROFILE}>
                  <Profile />
                </Route>
                <Route path={ADMIN__SETTINGS}>
                  <Settings />
                </Route>
                <Route path={ADMIN__POST}>
                  <Posts />
                </Route>
                <Route path={ADMIN__COURSE}>
                  <Courses />
                </Route>
                <Route path={ADMIN__SUBJECT}>
                  <Subject />
                </Route>
                <Route path={ADMIN__BLOG}>
                  <Route path={ADMIN__BLOG__CREATE}>
                    <NewBlog />
                  </Route>
                  <Route path="*">
                    <Blog />
                  </Route>
                </Route>
              </Switch>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
