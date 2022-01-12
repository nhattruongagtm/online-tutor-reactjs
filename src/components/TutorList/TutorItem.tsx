import React from 'react';
import { useHistory } from 'react-router';
import { TutorItem as Item } from '../Home/TutorItem';
import {TUTOR_PATH} from '../../constants/path'
interface TutorItemProps {
  tutor: Item;
}

export const TutorItem = ({ tutor }: TutorItemProps) => {
  const history = useHistory();  
  return (
    <div className="tutor__item">
      <div className="tutor__avatar">
        <img src={tutor.avatar} alt="" />
      </div>
      <div className="education">{tutor.education}</div>
      <div className="name">{tutor.name}</div>
      <div className="experience">{tutor.experience}</div>
      <div className="subjects">
        <div className="subjects__title">Môn:</div>
        <div className="subjects__list">
          <p>{tutor.subject.toString()}</p>
        </div>
      </div>
      <div className="address">
        <div className="address__title">Địa điểm: </div>
        <div className="address__list">
          <p>{tutor.address}</p>
        </div>
      </div>
      <div className="rate">
        <div className="rate__title">Đánh giá: </div>
        <div className="rate__list">
          {Array.from(new Array(5)).map((item, index) => {
            if (index < tutor.rate) {
              return <i className="fas fa-star star " key={index}></i>;
            } else {
              return <i className="fas fa-star star--border" key={index}></i>;
            }
          })}
        </div>
      </div>
      <button
        className="tutor__detail"
        onClick={()=>history.push(`${TUTOR_PATH}?id=${tutor.id}`)}
      >
        Xem chi tiết
      </button>
    </div>
  );
};
