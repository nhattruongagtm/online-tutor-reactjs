import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';

interface ChangePasswordProps {}

export const ChangePassword = (props: ChangePasswordProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSendCode, setIsSendCode] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setStep(0);
  };
  const handleSendCode = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSendCode(true);
      setIsSending(false);
      setStep(1);
    }, 3000);
  };
  const handleSendAgain = () => {
    setStep(0);
    handleSendCode();
  };
  const handleConformCode = () => {
    setIsSending(true);
    setTimeout(() => {
      setStep(2);
      setIsSending(false);
    }, 2000);
  };
  const handleChangePassword = () => {
    setIsSending(true);
    setTimeout(() => {
      setStep(3);
      setIsSending(false);
    }, 2000);
  };
  return (
    <div className="profile__password">
      <div className="profile__base__footer">
        <button onClick={handleOpen}>Đổi mật khẩu</button>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent>
          {step !== 3 && (
            <DialogContentText>
              Vui lòng thực hiện đầy đủ các bước để tiến hành đổi mật khẩu cho
              tài khoản của bạn.
            </DialogContentText>
          )}
          <Typography className={step !== 3 ? "typoraphy" : "typoraphy__success"}>
            {step <= 1
              ? 'B1: Nhập mã sẽ được gửi đến email đăng ký của bạn.'
              : step === 3
              ? 'Thay đổi mật khẩu thành công!'
              : 'B2: Thay đổi mật khẩu mới.'}  
          </Typography>
          {step === 0 && (
            <Button
              variant="contained"
              size="large"
              onClick={handleSendCode}
              className="btn__send__code"
            >
              {isSending ? 'Đang gửi...' : 'Gửi mã'}
            </Button>
          )}
          {step === 1 && (
            <>
              <div className="frame__type__code">
                <input
                  type="text"
                  placeholder="Nhập mã code..."
                  className="change__password__input"
                />
                <span onClick={handleSendAgain}>Gửi lại mã</span>
              </div>
              <Button
                variant="contained"
                onClick={handleConformCode}
                className="btn__send__code"
              >
                {isSending ? 'Đang xác nhận mã...' : 'Tiếp tục'}
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="frame__type__code">
                <input
                  type="passwor"
                  placeholder="Nhập mật khẩu mới..."
                  className="change__password__input"
                />
                <input
                  type="passwor"
                  placeholder="Xác nhận mật khẩu..."
                  className="change__password__input"
                />
              </div>
              <Button
                variant="contained"
                className="btn__send__code"
                onClick={handleChangePassword}
              >
                {isSending ? 'Vui lòng chờ...' : 'Xác nhận'}
              </Button>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{step !== 3 ? 'Hủy' : 'Đóng'}</Button>
          {/* <Button onClick={handleClose}>Tiếptục</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};
