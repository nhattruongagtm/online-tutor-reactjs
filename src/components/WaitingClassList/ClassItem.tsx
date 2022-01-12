import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { COURSE_PATH } from '../../constants/path';
import { ClassItem as Course } from './WaitingClassList';

export interface ClassItemProps {
  classItem: Course;
}

export const ClassItem = ({ classItem }: ClassItemProps) => {
  const history = useHistory();

  return (
    <div
      className="class__item"
      onClick={() => {
        history.push(`${COURSE_PATH}?id=${classItem.id}`);
      }}
    >
      <div className="class__item__uinfo">
        <div className="uinfo__img">
          <img src={classItem.photo} alt="" />
        </div>
        <p className="uinfo__name">{classItem.createdBy}</p>
      </div>
      <div className="class__item__content">
        <div className="content__title">{classItem.name}</div>
        <div className="content__description">{classItem.detail}</div>
        <div className="content__schedule">
          <span className="content__schedule__title">Lịch học:</span>
          {classItem.schedule.map((item, index) => (
            <>
              <span className="content__schedule__item">
                T{item.day} ({item.time})
              </span>
            </>
          ))}
        </div>
        <div className="content__price">
          <div className="content__price__month">
            {classItem.tuition}đ <span>/tháng</span>
          </div>
          <div className="content__price__fee">
            {classItem.fee}đ <span>/phí nhận lớp</span>
          </div>
        </div>
        <div className="content__offers">
          Đã có {classItem.offer}/3 đề nghị dạy
        </div>
        <div className="content__subjects">
          <div className="content__subjects__item content__subjects__item--subject">
            {classItem.subject}
          </div>
          <div className="content__subjects__item content__subjects__item--detail">
            {classItem.topic}
          </div>
          <div className="content__subjects__item content__subjects__item--address">
            {classItem.address}
          </div>
        </div>
      </div>
    </div>
  );
};
