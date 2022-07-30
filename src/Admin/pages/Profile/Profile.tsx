import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './profile.scss';
interface ProfileBriefProps {
  onToogleChangePassword: () => void;
}
export default function Profile() {
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const ProfileBrief = ({ onToogleChangePassword }: ProfileBriefProps) => {
    const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) =>{
      if(e.target.files){
        const file = e.target.files[0];
      }
      
    }
    return (
      <>
        <div className="profile__admin__main__brief__avatar">
          <img
            src="https://kenh14cdn.com/203336854389633024/2021/9/20/5190646820650698202562227858934053028757504n-1632154856430648241898.jpg"
            alt=""
          />
          <label
            className="profile__admin__change__avatar"
            htmlFor="admin__change__avatar"
          >
            <i className="fas fa-camera"></i>
          </label>
          <input type="file" id="admin__change__avatar" hidden onChange={handleChangeAvatar} />
        </div>
        <div className="profile__admin__main__brief__name">
          <span>Huynh Nhat Truong</span>
        </div>
        <div className="profile__admin__main__brief__info">
          <div className="profile__admin__brief__info__item">
            <i className="fas fa-user-tie"></i>{' '}
            <span>nhattruongagtm@gmail.com</span>
          </div>
          <div className="profile__admin__brief__info__item">
            <i className="fas fa-user-tie"></i> <span>0384458719</span>
          </div>
          <div className="profile__admin__brief__info__item">
            <i className="fas fa-user-tie"></i>{' '}
            <span>Hiep Hoa, Duc Hoa, Long An</span>
          </div>
        </div>
        <div className="profile__admin__main__brief__more">
          <button type="submit" onClick={() => onToogleChangePassword()}>
            Đổi mật khẩu{' '}
          </button>
        </div>
      </>
    );
  };

  const ProfileChangePassword = () => {
    return (
      <div className="profile__admin__changepass">
        <div className="profile__admin__changepass__back"></div>
        <div className="profile__admin__changepass__main">
          <div className="admin__change__title">
            <p>Đổi mật khẩu</p>
          </div>
          <div className="admin__change__step1">
            <div className="admin__change__item">
              <p>Nhập email:</p>
              <input type="email" />
            </div>
            <button type="submit">Gửi mã xác nhận</button>
          </div>
          <div className="admin__change__step1 admin__change__step2">
            <div className="admin__change__item">
              <p>Xác nhận mã:</p>
              <input type="text" />
            </div>
            <button type="submit">Tiếp tục</button>
          </div>
          <div className="admin__change__step1 admin__change__step3">
            <div className="admin__change__item">
              <p>Mật khẩu mới:</p>
              <input type="password" placeholder="Nhập mật khẩu" />
            </div>
            <div className="admin__change__item">
              <p>Xác nhận mật khẩu mới:</p>
              <input type="password" placeholder="Xác nhận mật khẩu" />
            </div>
            <button type="submit">Thay đổi</button>
          </div>
        </div>
      </div>
    );
  };

  const handleChangePassword = () => {
    setIsChangePassword(!isChangePassword);
  };

  return (
    <Col className="profile__detail__course__admin profile__admin__page">
      <Row className="profile__admin__page__main">
        <Col sm={3} className="profile__admin__main__brief">
          {!isChangePassword ? (
            <ProfileBrief onToogleChangePassword={handleChangePassword} />
          ) : (
            <ProfileChangePassword />
          )}
        </Col>
        <Col sm={9} className="profile__admin__main__task">
          <form action="" className="profile__admin__main__task__form">
            <div className="profile__admin__form__main">
              <div className="profile__admin__form__item">
                <div className="profile__admin__form__item__label">
                  <span>First Name</span>
                </div>
                <input type="text" placeholder="Nhập họ..." />
              </div>
              <div className="profile__admin__form__item">
                <div className="profile__admin__form__item__label">
                  <span>First Name</span>
                </div>
                <input type="text" placeholder="Nhập họ..." />
              </div>
              <div className="profile__admin__form__item">
                <div className="profile__admin__form__item__label">
                  <span>First Name</span>
                </div>
                <input type="text" placeholder="Nhập họ..." />
              </div>
              <div className="profile__admin__form__item">
                <div className="profile__admin__form__item__label">
                  <span>First Name</span>
                </div>
                <input type="text" placeholder="Nhập họ..." />
              </div>
              <div className="profile__admin__form__item">
                <div className="profile__admin__form__item__label">
                  <span>First Name</span>
                </div>
                <input type="text" placeholder="Nhập họ..." />
              </div>
              <div className="profile__admin__form__item">
                <div className="profile__admin__form__item__label">
                  <span>First Name</span>
                </div>
                <input type="text" placeholder="Nhập họ..." />
              </div>
            </div>
            <div className="profile__admin__form__main__submit">
              <button type="submit">Cập nhật thông tin </button>
            </div>
          </form>
        </Col>
      </Row>
    </Col>
  );
}
