import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router';
import { userApi } from '../../api/userApi';
import {
  COURSE_INFO_PATH,
  ME_PATH,
  PROFILE_PATH,
  SCHEDULE_PATH,
} from '../../constants/path';
import { loadUserInfo, UserProfile } from '../../reducers/profileSlice';
import { RootState } from '../../store';
import CourseInfo from './Components/CourseInfo';
import EditPost from './Components/EditPost';
import ProfileInfo2 from './Components/ProfileInfo2';
import { TimeTable } from './Components/TimeTable';
import Navigation from './Navigation';
import './style.scss';
import TutorProfile from './TutorProfile';
export default function Me() {
  const dispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.loginUser.roles);
  const user = useSelector((state: RootState) => state.loginUser.user);
  useEffect(() => {
    user &&
      userApi
        .getUserByID(user.id)
        .then((res) => {
          console.log(res.data);
          const userInfo = res.data as UserProfile;
          dispatch(loadUserInfo(userInfo));
        })
        .catch((e) => {
          console.log(e);
        });
  }, [user]);
  return (
    <div className="me">
      <Navigation />
      <div className="me__main">
        <Switch>
          <Route path={`${ME_PATH}${PROFILE_PATH}`}>
            {/* {roles.includes('ROLE_TUTOR') ? (
              <TutorProfile />
            ) : (
              <ProfileInfo2 />
            )} */}
            <ProfileInfo2 />
          </Route>

          <Route path={`${ME_PATH}${COURSE_INFO_PATH}`}>
            <CourseInfo />
          </Route>
          <Route path={`${ME_PATH}${SCHEDULE_PATH}`}>
            <TimeTable />
          </Route>
          <Route path={`${ME_PATH}/`}>
            <EditPost />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
