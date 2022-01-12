import React from 'react';
import { convertDate } from '../../utils/date';

export interface Rate {
  id: number;
  courseID: number;
  userID: number;
  createdDate: Date;
  content: string;
  avatar: string;
  name: string;
  star: number;
}
interface RateItemProps {
  rate: Rate;
}

export const RateItem = ({ rate }: RateItemProps) => {
  return (
    <div className="comment__item">
      <div className="comment__body">
        <div className="comment__item__avatar">
          <img src={rate.avatar} alt="" />
        </div>
        <div className="comment__item__main">
          <div className="content__item__name">
            <p>{rate.name}</p>
          </div>
          <div className="content__item__comment">
            <p>{rate.content}</p>
          </div>
          {Array.from(new Array(5)).map((item, index) => {
            if (index < rate.star) {
              return (<i className="fas fa-star star" key={index}></i>);
            } else {
              return (<i className="fas fa-star star--border" key={index}></i>);
            }
          })}
        </div>
      </div>
      <div className="comment__footer">
        <span>{convertDate(rate.createdDate)}</span>
      </div>
    </div>
  );
};
