import { Typography } from '@material-ui/core';
import { Button } from 'antd';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import md5 from 'md5';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { authApi } from '../../../api/authApi';
import NewPassword from '../../../components/Auth/ForgotPassword/NewPassword';
import useUser from '../../../hooks/useUser';

interface ChangePasswordProps {}

interface Change {
  newPassword: string;
  retype: string;
}
export const ChangePassword = (props: ChangePasswordProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [inputStep1, setInputStep1] = useState<string>('');
  const [inputStep2, setInputStep2] = useState<Change>({
    newPassword: '',
    retype: '',
  });
  const [user] = useUser();
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
    user &&
      authApi
        .sendMailToSignUp(user.email)
        .then((res) => {
          if (res) {
            console.log(res);
            setCode(res);
            setIsSending(false);
            setStep(1);
          } else {
            toast.error('Không thể gửi mã, vui lòng thử lại!');
          }
        })
        .catch((e) => {
          console.log(e);
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
        toast.error('Mã xác nhận không đúng! Vui lòng thử lại!');
      }
    } else {
      toast.warning('Vui lòng nhập mã xác nhận!');
    }
  };
  const handleChangePassword = () => {
    if (inputStep2.newPassword === '') {
      toast.error('Vui lòng nhập mật khẩu!');
    } else if (inputStep2.newPassword.length < 8) {
      toast.error('Mật khẩu phải chứa tối thiểu 8 ký tự!');
    } else if (inputStep2.retype === '') {
      toast.error('Vui lòng xác nhận mật khẩu!');
    } else if (inputStep2.newPassword !== inputStep2.retype) {
      toast.error('Mật khẩu không khớp!');
    } else {
      setIsSending(true);
      user &&
        authApi
          .changePassword(user.id, inputStep2.newPassword)
          .then((res) => {
            if (res) {
              setStep(3);
            } else {
              toast.error('Đã xảy lỗi, vui lòng thử lại!');
            }
            setIsSending(false);
          })
          .catch((e) => {
            console.log(e);
            toast.error('Đã xảy lỗi, vui lòng thử lại!');
            setIsSending(false);
          });
    }
  };

  return (
    <div className="profile__password">
      <div className="profile__base__footer">
        <Button onClick={handleOpen}>Đổi mật khẩu</Button>
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
              <Button onClick={handleConformCode} className="btn__send__code">
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
