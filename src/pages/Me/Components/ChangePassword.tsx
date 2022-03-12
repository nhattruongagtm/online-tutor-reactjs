import { Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import md5 from 'md5';
import React, { useState } from 'react';
import { authApi } from '../../../api/authApi';
import NewPassword from '../../../components/Auth/ForgotPassword/NewPassword';

interface ChangePasswordProps {}

interface ChangePassword {
  newPassword: string;
  retype: string;
}
export const ChangePassword = (props: ChangePasswordProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [inputStep1, setInputStep1] = useState<string>('');
  const [inputStep2, setInputStep2] = useState<ChangePassword>({
    newPassword: '',
    retype: '',
  });
  const [code, setCode] = useState<string>('');

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setStep(0);
  };
  const handleSendCode = () => {
    setIsSending(true);
    authApi.sendMailToSignUp('nhattruongagtm@gmail.com').then((res) => {
      if (res) {
        setTimeout(() => {
          // setCode(res);
          setIsSending(false);
          setStep(1);
        }, 2000);
      } else {
        console.log('Không thể gửi mã, vui lòng thử lại!');
      }
    });  
  };
  const handleSendAgain = () => {
    setStep(0);
    handleSendCode();
  };
  const handleConformCode = () => {
    if (inputStep1 !== '') {
      if (inputStep1 === code) {
        setStep(2);
      } else {
        console.log('Sai mã!');
      }
    } else {
      console.log('Vui lòng nhập mã!');
    }
  };
  const handleChangePassword = () => {

    if (inputStep2.newPassword === '') {
      console.log('Vui lòng nhập mật khẩu!');
    } else if (inputStep2.newPassword.length < 8) {
      console.log('Mật khẩu phải chứa tối thiểu 8 ký tự!');
    } else if (inputStep2.retype === '') {
      console.log('Vui lòng xác nhận mật khẩu!');
    } else if (inputStep2.newPassword !== inputStep2.retype) {
      console.log('Mật khẩu không khớp!');
    } else {
      setIsSending(true);
      authApi.changePassword(5, md5(inputStep2.newPassword)).then((res) => {
        if (res) {
          // if (res.status === 200) {
          //   setTimeout(() => {
          //     setStep(3);
          //     setIsSending(false);
          //   }, 2000);
          // } else {
          //   console.log('Đã xảy lỗi, vui lòng thử lại!');
          //   setIsSending(false);
          // }
        }
      }).catch(e=>{
        console.log(e);
        setIsSending(false);
      });
    }
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
          <Typography
            className={step !== 3 ? 'typoraphy' : 'typoraphy__success'}
          >
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
                  value={inputStep1}
                  onChange={(e) => setInputStep1(e.target.value)}
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
                  type="password"
                  placeholder="Nhập mật khẩu mới..."
                  className="change__password__input"
                  value={inputStep2.newPassword}
                  onChange={(e) =>
                    setInputStep2({
                      ...inputStep2,
                      newPassword: e.target.value,
                    })
                  }
                />
                <input
                  type="password"
                  placeholder="Xác nhận mật khẩu..."
                  className="change__password__input"
                  value={inputStep2.retype}
                  onChange={(e) =>
                    setInputStep2({ ...inputStep2, retype: e.target.value })
                  }
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
