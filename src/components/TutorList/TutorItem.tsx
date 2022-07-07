import React from 'react';
import { useHistory } from 'react-router';
import { RegisterSubject, TutorItem as Item } from '../Home/TutorItem';
import { TUTOR_PATH } from '../../constants/path';
import useAddress from '../../hooks/useAddress';
interface TutorItemProps {
  tutor: Item;
}

export const TutorItem = ({ tutor }: TutorItemProps) => {
  const history = useHistory();
  const [district, city] = useAddress();

  const renderSubjects = () => {
    let list: RegisterSubject[] = [];
    tutor.subjects.forEach((item) => {
      if (list.findIndex((it) => it.subjectName === item.subjectName) <= -1) {
        list.push(item);
      }
    });
    return <>{list.map((item) => item.subjectName).join(', ')}</>;
  };
  const renderAreas = () => {
    let list: any[] = [];
    tutor.areas.forEach((item) => {
      if (list.findIndex((it) => it === item.cityID) <= -1) {
        list.push(
          city.find((ite) => ite.code === item.cityID + '')?.name_with_type
        );
      }
    });
    return <>{list.map((item) => item).join(', ')}</>;
  };
  return (
    <div className="tutor__item">
      <div className="tutor__avatar">
        <img
          src={
            tutor.avatar ||
            `https://avatars.dicebear.com/api/avataaars/${tutor.id}
              }.jpg`
          }
          alt=""
        />
      </div>
      <div className="education">{tutor.education}</div>
      {/* <div className="education">{tutor.education}</div> */}
      <div className="name">{tutor.name}</div>
      <div className="experience">{tutor.experience}</div>
      <div className="subjects">
        <div className="subjects__title">Môn:</div>
        <div className="subjects__list">
          <p>{renderSubjects()}</p>
        </div>
      </div>
      <div className="address">
        <div className="address__title">Địa điểm: </div>
        <div className="address__list">
          {/* <p>{renderAreas()}</p> */}
          <p>
            {tutor.areas.map((i) => (
              <span key={i.id}>
                <span>
                  {
                    district.find((item) => item.slug === i.districtID)
                      ?.name_with_type
                  }
                </span>
                <span>
                  {' '}
                  -{' '}
                  {
                    city.find((item) => Number(item.code) === i.cityID)
                      ?.name_with_type
                  }
                </span>
              </span>
            ))}
          </p>
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
        onClick={() => history.push(`${TUTOR_PATH}?id=${tutor.id}`)}
      >
        Xem chi tiết
      </button>
    </div>
  );
};
