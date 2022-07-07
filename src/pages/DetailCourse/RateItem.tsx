import React, { useRef } from 'react';
import useUser from '../../hooks/useUser';
import { Rate } from '../../reducers/rateSlice';
import { convertDate } from '../../utils/date';

interface RateItemProps {
  rate: Rate;
}

export const RateItem = ({ rate }: RateItemProps) => {
  const [user] = useUser();
  const dateRef = useRef<Date>(new Date());
  console.log('rendering...');
  return (
    <div className="comment__item">
      <div className="comment__body">
        <div className="comment__item__avatar">
          <img
            src={
              rate.photoUrl ||
              `https://avatars.dicebear.com/api/avataaars/${user?.id}
              }.jpg`
            }
            alt=""
          />
        </div>
        <div className="comment__item__main">
          <div className="content__item__name">
            <p>{rate.displayName}</p>
          </div>
          <div className="content__item__comment">
            <p>{rate.comment}</p>
          </div>
          {Array.from(new Array(5)).map((item, index) => {
            if (index < rate.star) {
              return <i className="fas fa-star star" key={index}></i>;
            } else {
              return <i className="fas fa-star star--border" key={index}></i>;
            }
          })}
        </div>
      </div>
      <div className="comment__footer">
        <span>{rate.createDate}</span>
        {/* <span>{convertDate(dateRef.current,rate.createdDate)}</span> */}
      </div>
    </div>
  );
};
