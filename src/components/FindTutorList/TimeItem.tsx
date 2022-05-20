import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTimeList, updateTimeList } from '../../reducers/postSlice';
import { LearningTime } from './FindTutorList';

export interface TimeItemProps {
  timeProps: LearningTime;
}
export interface TimeInput {
  date: number;
  time: number;
}
export const TimeItem = ({ timeProps }: TimeItemProps) => {
  const dispatch = useDispatch();
  const { day, time, id } = timeProps;
  const [dateTime, setDateTime] = useState<LearningTime>({
    id: id,
    day: day,
    time: time,
  });
  const dates = [2, 3, 4, 5, 6, 7, 8];
  const times = [
    7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5,
    17, 17.5, 18, 18.5, 19, 19.5,
  ];
  const convertTime = (time: number) => {
    const hour = Math.floor(time);
    const isEven = time - Math.floor(time) === 0 ? true : false;

    let fullTime = '';
    hour <= 9 ? (fullTime += `0${hour}:`) : (fullTime += `${hour}:`);
    !isEven ? (fullTime += `30`) : (fullTime += `00`);

    return fullTime;
  };

  const handleDelete = (timeItem: LearningTime) => {
    dispatch(deleteTimeList(timeItem));
  };
  const handleUpdateDateTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    const newDateTime = {
      id,
      day: name === 'day' ? Number(value) : dateTime.day,
      time: name === 'time' ? Number(value) : dateTime.time,
    };
    dispatch(updateTimeList(newDateTime));
    setDateTime({
      ...dateTime,
      [name]: Number(value),
    });
  };

  return (
    <>
      <div className="tutors__input__item">
        <select name="day" id="" onChange={handleUpdateDateTime}>
          {dates.map((item) => {
            if (item === 8) {
              return (
                <option value={item} key={item} selected={day === item}>
                  Chủ nhật
                </option>
              );
            } else {
              return (
                <option value={item} selected={day === item}>
                  Thứ {item}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div className="tutors__input__item">
        <select name="time" id="" onChange={handleUpdateDateTime}>
          {times.map((item) => {
            return (
              <option value={item} key={item} selected={time === item}>
                {convertTime(item)}
              </option>
            );
          })}
        </select>
      </div>
      <div className="tutors__input__close tutors__input__item">
        <i className="fas fa-times" onClick={() => handleDelete(timeProps)}></i>
      </div>
    </>
  );
};
