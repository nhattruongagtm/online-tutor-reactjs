import React, { useState } from 'react';
import { ChangePassword } from './ChangPassword';
import EditProfileInfo from './EditProfileInfo';
import './profileInfo2.scss';
import ProfileRegister from './ProfileRegister';

export default function ProfileInfo2() {
  const [isEdit, setIsEdit] = useState<boolean>();

  const handleEditProfile = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div className="profile">
      <div className="profile__base">
        <div className="profile__base__title">
          <p>Thông tin cơ bản</p>
        </div>
        <div className="profile__base__body">
          <div className="profile__base__body__avatar">
            <img
              src="https://i.pinimg.com/originals/5f/12/21/5f12212ed4d94b0dafe0f18a8e55832b.jpg"
              alt=""
            />
            <i className="fas fa-pen"></i>
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Họ tên: </div>
            <input
              type="text"
              placeholder="Nhập họ tên..."
              value="Huỳnh Nhật Trường"
              disabled={!isEdit}
            />
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Email: </div>
            <input
              type="email"
              placeholder="Nhập email..."
              value="nhattruongagtm@gmail.com"
              disabled={!isEdit}
            />
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Sô điện thoại: </div>
            <input
              type="number"
              placeholder="Nhập số điện thoại..."
              value="0384458718"
              disabled={!isEdit}
            />
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Tỉnh/thành phố: </div>
            <select disabled={!isEdit}>
              <option value="hcm">TP.HCM</option>
              <option value="la">Long An</option>
            </select>
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Quận/huyện: </div>
            <select disabled={!isEdit}>
              <option value="hcm">Quận 1</option>
              <option value="la">Tp Thủ Đức</option>
            </select>
          </div>
          <div className="profile__base__footer">
            <button onClick={handleEditProfile}>
              {isEdit ? 'Lưu thông tin' : 'Cập nhật'}
            </button>
          </div>
        </div>
      </div>
      <div className="profile__more">
        <div className="profile__more__register">
          <div className="profile__base__title profile__register">
            <p>Danh sách bày đăng</p>
          </div>
          <div className="profile__more__register__body">
            <ProfileRegister />
          </div>
        </div>
        <div className="profile__more__change">
          <div className="profile__base__title profile__register">
            <p>Thông tin thêm</p>
          </div>
          <div className="profile__more__change__body">
            <div className="profile__change">
              <div className="profile__introduce">
                <div className="profile__introduce__title">Giới thiệu</div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat inventore doloremque repellendus impedit autem
                  laudantium omnis eius. Dolorum illo obcaecati architecto
                  aliquid similique aliquam, nam iste ad omnis facilis itaque!
                </p>
              </div>
              <div className="profile__detail">
                <div className="profile__introduce__title">Thông tin thêm</div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur neque provident nam aliquam eveniet culpa quas
                  deserunt, iste.
                </p>
              </div>
              <ChangePassword/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
