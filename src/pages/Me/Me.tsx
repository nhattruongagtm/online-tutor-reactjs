import { METHODS } from "http";
import React from "react";
import { Route, Switch } from "react-router";
import { COURSE_INFO_PATH, ME_PATH, PROFILE_PATH, SCHEDULE_PATH } from "../../constants/path";
import CourseInfo from "./Components/CourseInfo";
import ProfileInfo from "./Components/ProfileInfo";
import ProfileInfo2 from "./Components/ProfileInfo2";
import { TimeTable } from './Components/TimeTable'
import Navigation from "./Navigation";
import "./style.scss";
export default function Me() {
  return (
    <div className="me">
      <Navigation />
      <div className="me__main">
        <Switch>
          <Route path={`${ME_PATH}${PROFILE_PATH}`}>
            <ProfileInfo2 />
          </Route>
          
          <Route path={`${ME_PATH}${COURSE_INFO_PATH}`}>
            <CourseInfo />
          </Route>
          <Route path={`${ME_PATH}${SCHEDULE_PATH}`}>
            <TimeTable />    
          </Route>
        </Switch>
      </div>
    </div>
  );
}
