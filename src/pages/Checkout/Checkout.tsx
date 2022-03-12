import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { courseApi } from '../../api/CourseApi';
import { ClassItem } from '../../components/WaitingClassList/WaitingClassList';
import './checkout.scss';
import qs from 'query-string';
import { DetailInfo } from '../DetailCourse/DetailInfo';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
interface Props {}

interface Payment {
  className: string;
  type: number;
}

export const Checkout = (props: Props) => {
  const [course, setCourse] = useState<ClassItem>();
  const [isFail, setIsFail] = useState<boolean>();
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const [paymentStatus, setPaymentStatus] = useState<boolean>(true);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const payments: Payment[] = [
    {
      className: 'icon_visa',
      type: 0,
    },
    {
      className: 'icon_paypal',
      type: 1,
    },
    {
      className: 'icon_momo',
      type: 2,
    },
  ];
  const notifyModals = {
    checkoutNow: {
      title: 'Đăng ký khóa học thành công!',
      content:
        'Cám ơn bạn đã đăng ký khóa học của chúng tôi. Chúc bạn có một khóa học thật tốt và đạt kết quả cao.',
    },
    checkoutLater: {
      title: 'Đăng ký khóa học thành công!',
      content:
        'Cám ơn bạn đã đăng ký khóa học của chúng tôi. Chúc bạn có một khóa học thật tốt và đạt kết quả cao. Để bắt đầu khóa học, vui lòng thanh toán học phí 3 ngày trước khi khóa học diễn ra.',
    },
  };
  const validates = ['fas fa-check-circle', 'fas fa-times-circle'];
  const path = useLocation().search;
  const objectPath = qs.parse(path);
  const id = objectPath.id;

  useEffect(() => {
    // call api to get detail data
    courseApi
      .getCourseByID(Number(id))
      .then((res) => {
        if (res) {
          setCourse(res);
        }
      })
      .catch((e) => {
        if (e) {
          setTimeout(() => {
            setIsFail(true);
          }, 10000);
        }
      });
  }, []);

  const handleCheckout = (value: boolean) => {
    handleClickOpen();
    setPaymentStatus(value);
  };

  const CheckoutDialog = () => {
    return (
      <div className="checkout__dialog">
        <div className="checkout__notify__icon">
        <i className="fas fa-check-circle"></i>
        </div>
        <div className="checkout__notify__title">
          {paymentStatus
            ? notifyModals.checkoutNow.title
            : notifyModals.checkoutLater.title}
        </div>
        <div className="checkout__notify__content">
          {paymentStatus
            ? notifyModals.checkoutNow.content
            : notifyModals.checkoutLater.content}
        </div>
        <div className="checkout__notify__close" onClick={handleClose}>Đóng</div>
      </div>
    );
  };

  return (
    <div className="checkout__container">
      <div className="checkout__main">
        <div className="checkout__main__left">
          {/* <div className="main__left__title">
                        <div className="left__title__name"></div>
                        <div className="left__title__price"></div>
                    </div>
                    <div className="main__left__info">
                        <div className="left__info__img">

                        </div>
                        <div className="left__info__general">
                            
                        </div>
                    </div> */}
          {course && <DetailInfo course={course} isRegister={true} />}
        </div>
        <div className="checkout__main__right">
          <div className="main__right__title">
            <p>Thanh toán</p>
          </div>
          <div className="main__right__info">
            <div className="main__right__info__title">
              <p>Phương thức thanh toán</p>
            </div>
            <div className="checkout__form">
              <div className="main__right__payments">
                {payments.map((payment) => (
                  <div
                    className={
                      paymentMethod !== payment.type
                        ? 'main__right__payments__item'
                        : `main__right__payments__item payments__items--active`
                    }
                    onClick={() => setPaymentMethod(payment.type)}
                  >
                    <div className={payment.className}></div>
                  </div>
                ))}
              </div>
              <div className="main__right__item__detail">
                <div className="checkout__form__item">
                  <div className="checkout__form__title">Số tài khoản</div>
                  <div className="checkout__form__input">
                    <div className="checkout__form__input__main">
                      <input type="text" />
                      <div className="checkout__input__validate none">
                        <i className="fas fa-check-circle"></i>
                        {/* <i className="fas fa-times-circle"></i> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="checkout__form__item__main">
                  <div className="checkout__form__item">
                    <div className="checkout__form__title">Ngày hết hạn</div>
                    <div className="checkout__form__input">
                      <div className="checkout__form__input__main">
                        <input type="text" />
                        <div className="checkout__input__validate none">
                          <i className="fas fa-check-circle"></i>
                          {/* <i className="fas fa-times-circle"></i> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="checkout__form__item">
                    <div className="checkout__form__title">CVV</div>
                    <div className="checkout__form__input">
                      <div className="checkout__form__input__main">
                        <input type="text" />
                        <div className="checkout__input__validate none">
                          <i className="fas fa-check-circle"></i>
                          {/* <i className="fas fa-times-circle"></i> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="checkout__form__item">
                  <div className="checkout__form__title">Tên chủ thẻ</div>
                  <div className="checkout__form__input">
                    <div className="checkout__form__input__main">
                      <input type="text" />
                      <div className="checkout__input__validate none">
                        <i className="fas fa-check-circle"></i>
                        {/* <i className="fas fa-times-circle"></i> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="checkout__total">
                  <div className="checkout__total__title">Thành tiền</div>
                  <div className="checkout__total__price">2.500.000 VND</div>
                </div>
              </div>
            </div>
            <div className="checkout__form__item checkout__form__item__discount">
              <div className="checkout__form__title">
                Nhập mã giảm giá (nếu có):{' '}
              </div>
              <div className="checkout__form__input">
                <div className="checkout__form__input__main">
                  <input type="text" />
                  <button>Kiểm tra</button>
                </div>
              </div>
            </div>
            <div className="checkout__buttons">
              <div
                className="checkout__now"
                onClick={() => handleCheckout(true)}
              >
                Thanh toán ngay
              </div>
              <div
                className="checkout__later"
                onClick={() => handleCheckout(false)}
              >
                Thanh toán sau
              </div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <CheckoutDialog/>
              </Dialog>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
