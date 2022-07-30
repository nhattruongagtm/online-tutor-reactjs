import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ACCESS_TOKEN, TOKEN } from '../../constants/auth';
import {
  COURSE_INFO_PATH,
  HOME_PATH,
  ME_PATH,
  PROFILE_PATH,
  SCHEDULE_PATH,
} from '../../constants/path';
import { useHistory } from 'react-router';
import './style.scss';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
interface NavigationList {
  icon: string;
  title: string;
  path: string;
}
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Navigation() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const history = useHistory();
  const [isSignOut, setIsSignOut] = useState<boolean>(false);

  const navigationList: NavigationList[] = [
    {
      icon: 'fas fa-info-circle',
      title: 'Tổng quan',
      path: `${ME_PATH}${PROFILE_PATH}`,
    },
    {
      icon: 'fas fa-book',
      title: 'Khóa học',
      path: `${ME_PATH}${COURSE_INFO_PATH}`,
    },
    {
      icon: 'fas fa-table',
      title: 'Lịch học',
      path: `${ME_PATH}${SCHEDULE_PATH}`,
    },
  ];

  const handleSignOut = () => {
    localStorage.removeItem(TOKEN);
    !localStorage.getItem(TOKEN) && history.push(HOME_PATH);
  };
  return (
    <div className="me__nav">
      <div className="me__nav__body">
        {navigationList.map((item) => {
          return (
            <NavLink to={item.path} key={item.icon}>
              <div className="me__nav__item">
                <i className={item.icon}></i>
                <span>{item.title}</span>
              </div>
            </NavLink>
          );
        })}
        <label className="me__nav__item" onClick={handleClickOpen}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Đăng xuất</span>
        </label>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Đăng xuất</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Bạn có muốn đăng xuất không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Thoát</Button>
          <Button onClick={handleSignOut}>Đông ý</Button>
        </DialogActions>
      </Dialog>

      <div className="me__nav__footer"></div>
    </div>
  );
}
