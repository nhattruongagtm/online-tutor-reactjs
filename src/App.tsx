import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router";
import { updateStatus, updateStatusForgotPassword } from "./actions/signup";
import "./App.scss";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import Login from "./components/Auth/Login/Login";
import SignUp from "./components/Auth/SignUp/SignUp";
import FAQ from "./components/FAQ/FAQ";
import FindTutorList from "./components/FindTutorList/FindTutorList";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import News from "./components/News/News";
import TutorList from "./components/TutorList/TutorList";
import WaitingClassList from "./components/WaitingClassList/WaitingClassList";
import {
  CART_PATH,
  COURSE_PATH,
  FAQ_PATH,
  FIND_TUTOR_PATH,
  FORGET_PASSWORD_PATH,
  HOME_PATH,
  LOGIN_PATH,
  ME_PATH,
  NEWS_PATH, SIGNUP_PATH,
  TUTOR_LIST_PATH,
  TUTOR_PATH,
  WAITING_CLASS_PATH
} from "./constants/path";
import Cart from "./pages/Cart/Cart";
import DetailCourse from "./pages/DetailCourse/DetailCourse";
import Me from "./pages/Me/Me";
import Tutor from "./pages/Tutor/Tutor";
function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const stateList = [`${SIGNUP_PATH}`, `${FORGET_PASSWORD_PATH}`];

  useEffect(() => {
    if (stateList.includes(location.pathname)) {
      dispatch(updateStatusForgotPassword(0));
      dispatch(updateStatus(0));
    }
  }, [location]);

  const path = [`${LOGIN_PATH}`, `${SIGNUP_PATH}`, `${FORGET_PASSWORD_PATH}`];
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
              <Route path={COURSE_PATH}>
                <DetailCourse />
              </Route>
              <Route path={CART_PATH}>
                <Cart />
              </Route>
              <Route path={TUTOR_PATH}>
                <Tutor />
              </Route>
            </Switch>
          </div>
          <Route path={ME_PATH}>
            <Me />
          </Route>

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
