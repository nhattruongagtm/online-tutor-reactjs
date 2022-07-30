import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { COURSE_PATH } from '../../constants/path';
import './style.scss';
import * as qs from 'query-string';
import { TutorItem } from '../../components/Home/TutorItem';
import { tutorApi } from '../../api/tutorApi';
import Loading from '../../components/Common/Loading';
import useAddress from '../../hooks/useAddress';
import TutorInfo from './TutorInfo';


export default function Tutor() {
  const history = useHistory();
  const location = useLocation().search;
  const [tutor, setTutor] = useState<TutorItem>();

  const params = qs.parse(location);

  const id = params.id as string;

  useEffect(() => {
    tutorApi.getTutorByID(Number(id)).then((res) => {
      if (res) {
        setTutor(res.data);
      }
    });
  }, []);

  return (
    <div className="tutor__detail__main">
      {!tutor ? (
        <Loading />
      ) : (
        <>
          <TutorInfo tutor={tutor} />
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
          <div className="tutor__info__courses">
            
          </div>
        </>
      )}
    </div>
  );
}
