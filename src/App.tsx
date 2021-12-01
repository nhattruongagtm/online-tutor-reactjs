import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header/Header";
import { Route, Switch, useLocation } from "react-router";
import Home from "./components/Home/Home";
import FindTutorList from "./components/FindTutorList/FindTutorList";
import WaitingClassList from "./components/WaitingClassList/WaitingClassList";
import TutorList from "./components/TutorList/TutorList";
import News from "./components/News/News";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login/Login";
import SignUp from "./components/Auth/SignUp/SignUp";
import {
  FAQ_PATH,
  FIND_TUTOR_PATH,
  FORGET_PASSWORD_PATH,
  HOME_PATH,
  LOGIN_PATH,
  NEWS_PATH,
  SIGNUP_PATH,
  TUTOR_LIST_PATH,
  WAITING_CLASS_PATH,
} from "./constants/path";
import { useDispatch } from "react-redux";
import { updateStatus, updateStatusForgotPassword } from "./actions/signup";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const stateList = [`${SIGNUP_PATH}`,`${FORGET_PASSWORD_PATH}`];

  useEffect(()=>{ 
    if(stateList.includes(location.pathname)){
      dispatch(updateStatusForgotPassword(0));
      dispatch(updateStatus(0));
    }
  },[location]);


  const path = [`${LOGIN_PATH}`, `${SIGNUP_PATH}`,`${FORGET_PASSWORD_PATH}`];  
  const isAuth = () => {
    if (path.includes(location.pathname)) {
      return true;
    }
    return false;
  };

  return (
    <div>
      {!isAuth() ? (
        <>
          <Header />
          <div className="container">
            <Switch>
              <Route path={HOME_PATH} exact>
                <Home />
              </Route>
              <Route path={FIND_TUTOR_PATH}>
                <FindTutorList />
              </Route>
              <Route path={WAITING_CLASS_PATH}>
                <WaitingClassList />
              </Route>
              <Route path={TUTOR_LIST_PATH}>
                <TutorList />
              </Route>
              <Route path={NEWS_PATH}>
                <News />
              </Route>
              <Route path={FAQ_PATH}>
                <FAQ />
              </Route>
            </Switch>
          </div>
          <Footer />
        </>
      ) : (
        <div className="user">
          <div className="user__image">
            {/* <div></div> */}
            <img
              src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/vp938-audi-24-a-klhr93qh.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=60a3c0dcbf47f5522292b4e193e60384"
              alt=""
            />
          </div>
          <Switch>
            <Route path={LOGIN_PATH}>
              <Login />
            </Route>
            <Route path={SIGNUP_PATH}>
              <SignUp />
            </Route>
            <Route path={FORGET_PASSWORD_PATH}>
              <ForgotPassword />  
            </Route>
          </Switch>
        </div>
      )}
    </div>
  );
}

export default App;
