import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { COURSE_PATH } from '../../constants/path';
import './style.scss';
import * as qs from 'query-string';
import { TutorItem } from '../../components/Home/TutorItem';
import { tutorApi } from '../../api/tutorApi';
import Loading from '../../components/Common/Loading';
import useAddress from '../../hooks/useAddress';

interface RegisterSubject {
  id: number;
  name: string;
  grades: string[];
}
export default function Tutor() {
  const history = useHistory();
  const location = useLocation().search;
  const [tutor, setTutor] = useState<TutorItem>();
  const [district, city] = useAddress();
  const params = qs.parse(location);

  const id = params.id as string;

  useEffect(() => {
    tutorApi.getTutorByID(Number(id)).then((res) => {
      if (res) {
        setTutor(res.data);
      }
    });
  }, []);

  const renderRegister = () => {
    const subjects = tutor?.subjects;
    let list: RegisterSubject[] = [];
    if (subjects) {
      subjects.forEach((subject) => {
        const index = list.findIndex(
          (item) => item.name === subject.subjectName
        );
        if (index > -1) {
          list[index].grades.push(subject.gradeName);
        } else {
          list.push({
            id: subject.id,
            name: subject.subjectName,
            grades: [subject.gradeName],
          });
        }
      });
    }
    return (
      <>
        {list.map((item) => (
          <span key={item.id}>
            <strong>{item.name}:</strong>
            <span>{item.grades.join(', ')}</span>
          </span>
        ))}
      </>
    );
  };

  return (
    <div className="tutor__detail__main">
      {!tutor ? (
        <Loading />
      ) : (
        <div className="tutor__info">
          <div className="tutor__info__main">
            <div className="tutor__info__general">
              <div className="tutor__general__cv">
                <img
                  src={
                    tutor.avatar ||
                    `https://avatars.dicebear.com/api/avataaars/${tutor.id}
              }.jpg`
                  }
                  alt=""
                  className="tutor__img"
                />
                <div className="tutor__general__cv__main">
                  <div className="tutor__general__name">{tutor.name}</div>
                  <div className="tutor__general__identify">
                    <span>
                      <strong> MS:</strong> <span>1813026{tutor.id}</span>
                    </span>
                    <span>
                      <i className="fas fa-pen"></i>{' '}
                      <span>
                        {tutor.createdDate &&
                          new Date(tutor.createdDate)
                            .toLocaleTimeString()
                            .split('')
                            .slice(0, 5)}
                        ,
                      </span>{' '}
                      <span>
                        {new Date(tutor.createdDate).toLocaleDateString()}
                      </span>
                    </span>
                  </div>
                  <div className="tutor__general__education">
                    {tutor.education}
                  </div>
                  <div className="tutor__general__fee">200.000/buổi</div>
                </div>
              </div>
              <div className="tutor__info__follow">
                <div className="tutor__info__follow__course">
                  <div className="tutor__info__course__icon">
                    <i className="fab fa-leanpub"></i>
                  </div>
                  <div className="tutor__info__course__content">
                    <span>Số khóa học đã dạy</span>
                    <span>1</span>
                  </div>
                </div>
                <div className="tutor__info__follow__course">
                  <div className="tutor__info__course__icon">
                    <i className="fab fa-acquisitions-incorporated"></i>
                  </div>
                  <div className="tutor__info__course__content">
                    <span>Lượt đánh giá</span>
                    <span>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="far fa-star"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="tutor__info__detail">
              <div className="tutor__info__detail__item">
                <div className="tutor__info__item__title">
                  Mô tả chi tiết gia sư
                </div>
                <div className="tutor__info__item__content">
                  {tutor.description}
                </div>
              </div>
              <div className="tutor__info__location">
                <div className="tutor__info__detail__item">
                  <div className="tutor__info__item__title">
                    Các môn đã đăng ký
                  </div>
                  <div className="tutor__info__item__content">
                    {renderRegister()}
                  </div>
                </div>
                <div className="tutor__info__detail__item">
                  <div className="tutor__info__item__title">
                    Khu vực đăng ký
                  </div>
                  <div className="tutor__info__item__content">
                    {tutor.areas.map((i) => (
                      <span key={i.id}>
                        <strong>
                          {
                            district.find((item) => item.slug === i.districtID)
                              ?.name_with_type
                          }
                        </strong>
                        <span>
                          -{' '}
                          {
                            city.find((item) => Number(item.code) === i.cityID)
                              ?.name_with_type
                          }
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tutor__info__classes">
            <div className="tutor__info__classes__title">
              Danh sách lớp đã dạy
            </div>
            <div className="class__list">
              <div
                className="class__item"
                onClick={() => {
                  history.push(COURSE_PATH);
                }}
              >
                <div className="class__item__uinfo">
                  <div className="uinfo__img">
                    <img
                      src={
                        tutor.avatar ||
                        `https://avatars.dicebear.com/api/avataaars/${tutor.id}
                    }.jpg`
                      }
                      alt=""
                    />
                  </div>
                  <p className="uinfo__name">Quản trị viên</p>
                </div>
                <div className="class__item__content">
                  <div className="content__title">
                    Cần tìm gia sư dạy tiếng anh gia tiếp cho người đi làm
                  </div>
                  <div className="content__description">
                    Cần gia sư có kinh nghiệm nghe nói đọc viết, phát âm chuẩn
                    dạy kèm cho người đ
                  </div>
                  <div className="content__schedule">
                    <span className="content__schedule__title">Lịch học:</span>
                    <span className="content__schedule__item">T6 (9:30)</span>,
                    <span className="content__schedule__item">T7 (8:30)</span>
                  </div>
                  <div className="content__price">
                    <div className="content__price__month">
                      2.000.000đ <span>/tháng</span>
                    </div>
                    <div className="content__price__fee">
                      600.00đ <span>phí nhận lớp</span>
                    </div>
                  </div>
                  <div className="content__offers">Đã có 1/3 đề nghị dạy</div>
                  <div className="content__subjects">
                    <div className="content__subjects__item content__subjects__item--subject">
                      Tiếng anh
                    </div>
                    <div className="content__subjects__item content__subjects__item--detail">
                      Giao tiếp căn bản de hieu
                    </div>
                    <div className="content__subjects__item content__subjects__item--address">
                      Quận Phú Nhuận, TP.HCM
                    </div>
                  </div>
                </div>
              </div>
              <div className="class__item">
                <div className="class__item__uinfo">
                  <div className="uinfo__img">
                    <img
                      src="https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png"
                      alt=""
                    />
                  </div>
                  <p className="uinfo__name">Quản trị viên</p>
                </div>
                <div className="class__item__content">
                  <div className="content__title">
                    Cần tìm gia sư dạy tiếng anh gia tiếp cho người đi làm
                  </div>
                  <div className="content__description">
                    Cần gia sư có kinh nghiệm nghe nói đọc viết, phát âm chuẩn
                    dạy kèm cho người đã đi làm, đã có nền tảng căn bản, lâu
                    ngày không sử dụng nên quên tiếng anh.
                  </div>
                  <div className="content__schedule">
                    <span className="content__schedule__title">Lịch học: </span>
                    <span className="content__schedule__item">T6 (9:30)</span>,
                    <span className="content__schedule__item">T7 (8:30)</span>
                  </div>
                  <div className="content__price">
                    <div className="content__price__month">
                      2.000.000đ <span>/tháng</span>
                    </div>
                    <div className="content__price__fee">
                      600.00đ <span>phí nhận lớp</span>
                    </div>
                  </div>
                  <div className="content__offers">Đã có 1/3 đề nghị dạy</div>
                  <div className="content__subjects">
                    <div className="content__subjects__item content__subjects__item--subject">
                      Tiếng anh
                    </div>
                    <div className="content__subjects__item content__subjects__item--detail">
                      Giao tiếp căn bản
                    </div>
                    <div className="content__subjects__item content__subjects__item--address">
                      Quận Phú Nhuận, TP.HCM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tutor__info__courses"></div>
        </div>
      )}
    </div>
  );
}
