import React from 'react';
import './profile.scss';
interface ProfileProps {}

export const Profile = (props: ProfileProps) => {
  return (
    <div className="profile__user__admin">
      <img
        className="profile__user__admin__avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Angelina_Jolie_2_June_2014_%28cropped%29.jpg"
      />

      <p className="profile__user__admin__name">Angelia Joli</p>
      <div className="profile__user__admin__detail">
        <p className="profile__user__admin__email">
          <i className="fas fa-envelope"></i>
          <span>joli2agtmzc@gmail.com</span>
        </p>
        <p>
          <i className="fas fa-phone-alt"></i>
          <span>0385197878</span>
        </p>
        <p>
          <i className="fas fa-map-marker-alt"></i>
          <span>Hiệp Hòa, Đức Hòa, Long An</span>
        </p>

        <div className="profile__user__admin__vote">
          <div className="users__admin__vote__courses">
            <span>Số khóa học:</span>
            <p>2</p>
          </div>
          <div className="users__admin__vote__rate">
            <span>Đánh giá:</span>
            <p>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
            </p>
          </div>
        </div>
      </div>
      <div className="profile__user__admin__permission">
        <button>Xóa tài khoản</button>
        <button>Khóa tài khoản</button>
      </div>
    </div>
  );
};
