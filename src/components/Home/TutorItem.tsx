import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { TUTOR_PATH } from '../../constants/path';
export const galaxy = '#e3fff9';
const RecommendedItem = styled.div`
  width: calc(310px) !important;
  height: 420px;

  border-radius: 10px;
  /* border: 1px solid black; */
  display: flex !important;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  padding: 15px;
  background-color: ${galaxy};
  border: 3px solid ${galaxy};
  transition: 0.2s linear;
  /* margin: 0 10px; */

  :hover {
    border: 3px solid #00ffbf;
  }

  .tutor__detail {
    outline: none;
    border: 2px solid #006fa7;
    background-color: white;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: 0.2s linear;

    :hover {
      background-color: #006fa7;
      color: white;
    }
  }

  .education {
    margin-top: 5px;
    font-size: 15px;
  }
  .experience {
    text-align: center;
    font-size: 15px;
    margin-top: 5px;
  }
  .name {
    font-weight: bold;
    font-size: 20px;
  }
  .subjects,
  .address,
  .rate {
    width: 100%;
    display: flex;
    font-size: 14.5px;

    div:last-child {
      margin-left: 5px;
      flex-wrap: nowrap;
      /* overflow: hidden; */
      /* background-color: #acc2c2; */
    }
  }
  .subjects {
    margin-top: 20px;
    &__list {
      color: #006fa7;
    }
  }
  .address,
  .subjects {
    width: 100%;
    display: flex;
    &__title {
      width: fit-content;
    }
    &__list {
      color: #8176d8;
      width: 76%;
      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre-wrap;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
      }
    }
  }
  .rate {
    margin-bottom: 20px;

    &__list {
      font-size: 16px;
      .star {
        color: #fdce3e;
      }
      .star--border {
        color: #e0e3ed;
      }
    }
  }
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
interface TutorItemProps {
  tutor: TutorItem;
}
export interface TutorItem {
  id: number;
  avatar: string;
  name: string;
  education: string;
  experience: string;
  subject: string[];
  address: string;
  createdDate: Date,
  rate: number;
  description: string;
}
export const TutorItem = ({ tutor }: TutorItemProps) => {
  const history = useHistory();
  return (
    <div>
      <RecommendedItem>
        <Avatar>
          <img src={tutor.avatar} alt="" />
        </Avatar>
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
                return <i className="fas fa-star star "></i>;
              } else {
                return <i className="fas fa-star star--border"></i>;
              }
            })}
          </div>
        </div>
        <button className="tutor__detail">Xem chi tiết</button>
      </RecommendedItem>
    </div>
  );
};
