import React, { useState } from "react";
import EditProfileInfo from "./EditProfileInfo";
import "./profileInfo.scss";
export default function ProfileInfo() {
  const [isDisplayEditForm, setIsDisplayEditForm] = useState<boolean>(false);
  const handleScroll = (pos: Element | null) =>{
      const isTrue = !isDisplayEditForm;

      if (isTrue) {
        if (pos) {
          const position = Number(
            pos.getBoundingClientRect().top +
              pos.getBoundingClientRect().height - 100  
             
          );
          window.scrollTo(0, Number(position));
        }
        else{
            window.scrollTo(0,0);
        }
      }
      else{  
          window.scrollTo(0,0);
      }

  }
  const handleEditInfo = () => {
    setIsDisplayEditForm(!isDisplayEditForm);
    const pos = document.querySelector("#edit__form");

    handleScroll(pos);
  };
  const handleHidden = () =>{
      setIsDisplayEditForm(false);

      handleScroll(null);


  }
  return (
    <div className="profile">
      <div className="profile__title">
        <span>Thông tin cá nhân</span>
      </div>
      <div className="profile__main">
        <div className="profile__main__user">
          <div className="profile__main__user__avatar">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv42ScWdVy851FjxIqQng5OwcyE-gMP6E6sg&usqp=CAU"
              alt=""
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__info__item">
            <div className="profile__info__item__content--name">
              Huỳnh Nhật Trường
            </div>
          </div>
          <div className="profile__info__item">
            <div className="profile__info__item__label">
              <i className="fas fa-phone-alt"></i>Số điện thoại
            </div>
            <div className="profile__info__item__content">0123-456-789</div>
          </div>
          <div className="profile__info__item">
            <div className="profile__info__item__label">
              <i className="fas fa-at"></i>Email
            </div>
            <div className="profile__info__item__content">
              nhattruongagtm@gmail.com
            </div>
          </div>
          <div className="profile__info__item">
            <div className="profile__info__item__label">
              <i className="fas fa-venus-mars"></i>Giới tính
            </div>
            <div className="profile__info__item__content">Nam</div>
          </div>
          <div className="profile__info__item">
            <div className="profile__info__item__label">
              <i className="fas fa-birthday-cake"></i>Ngày sinh
            </div>
            <div className="profile__info__item__content">07/05/2000</div>
          </div>
          <div className="profile__info__item">
            <div className="profile__info__item__label">
              {" "}
              <i className="fas fa-map-marked-alt"></i>Địa chỉ
            </div>
            <div className="profile__info__item__content">
              Hiệp Hòa, Đức Hòa, Long An
            </div>
          </div>
        </div>
      </div>
      <div className="profile__btn__edit">
        <button onClick={handleEditInfo}>Thay đổi thông tin</button>
      </div>
      <EditProfileInfo isDisplay={isDisplayEditForm} onHidden={handleHidden}/>
    </div>
  );
}
