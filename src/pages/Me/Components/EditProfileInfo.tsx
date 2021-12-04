import React from "react";
import "./editProfileInfo.scss";
interface IsDisplay {
  isDisplay: boolean;
  onHidden: () => void;
}
export default function EditProfileInfo({ isDisplay, onHidden }: IsDisplay) {
  return (
    <div
      className={
        isDisplay
          ? "edit__profile__info"
          : "edit__profile__info edit__profile__info--hidden"
      }
      id="edit__form"
    >
      <div className="edit__profile__info__title">
        <span>Thông tin cá nhân</span>
      </div>
      <div className="edit__profile__form">
        <div className="edit__profile__info__main">
          <div className="edit__profile__info__main__item">
            <div className="edit__profile__item__avatar">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv42ScWdVy851FjxIqQng5OwcyE-gMP6E6sg&usqp=CAU"
                alt=""
              />
            </div>
          </div>
          <div className="edit__profile__info__main__item">
            <div className="edit__profile__item__label">
              <span>Họ tên:</span>
            </div>
            <div className="edit__profile__item__input">
              <input
                type="text"
                placeholder="Nhập họ và tên"
                value="Huỳnh Nhật Trường"
              />
            </div>
          </div>
          <div className="edit__profile__info__main__item">
            <div className="edit__profile__item__label">
              <span>Email:</span>
            </div>
            <div className="edit__profile__item__input">
              <input
                type="text"
                placeholder="Nhập email"
                value="nhattruongagtm@gmail.com"
              />
            </div>
          </div>
          <div className="edit__profile__info__main__item">
            <div className="edit__profile__item__label">
              <span>Số điện thoại:</span>
            </div>
            <div className="edit__profile__item__input">
              <input
                type="text"
                placeholder="0123-456-789"
                value="09611857254"
              />
            </div>
          </div>
        </div>

        <div className="edit__profile__info__main">
          <div className="edit__profile__info__main__item">
            <div className="edit__profile__item__avatar">
              {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv42ScWdVy851FjxIqQng5OwcyE-gMP6E6sg&usqp=CAU" alt="" /> */}
            </div>
          </div>
          <div className="edit__profile__info__main__item">
            <div className="edit__profile__item__label">
              <span>Giới tính</span>
            </div>
            <div className="edit__profile__item__input">
              <input
                type="text"
                placeholder="Nhập họ và tên"
                value="Huỳnh Nhật Trường"
              />
            </div>
          </div>
          <div className="edit__profile__info__main__item">
            <div className="edit__profile__item__label">
              <span>Tỉnh/thành:</span>
            </div>
            <div className="edit__profile__item__input">
              <input
                type="text"
                placeholder="Nhập email"
                value="nhattruongagtm@gmail.com"
              />
            </div>
          </div>
          <div className="edit__profile__info__main__item">
            <div className="edit__profile__item__label">
              <span>Quận/huyện</span>
            </div>
            <div className="edit__profile__item__input">
              <input
                type="text"
                placeholder="0123-456-789"
                value="09611857254"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="edit__profile__btns">
        <button className="edit__profile--cancel" onClick={()=> onHidden()}>Hủy</button>
        <button className="edit__profile--agree">Thay đổi</button>
      </div>
    </div>
  );
}
