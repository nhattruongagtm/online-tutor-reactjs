import { SnackbarOrigin } from '@mui/material/Snackbar';
import * as qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { courseApi } from '../../api/CourseApi';
import { ClassItem } from '../../components/WaitingClassList/ClassItem';
import { ClassItem as IClassItem } from '../../components/WaitingClassList/WaitingClassList';
import '../DetailCourse/style.scss';
import { Comment } from './Comment';
import { DetailInfo } from './DetailInfo';
import { Rate } from './Rate';

interface DetailInfo {
  icon: string;
  title: string;
  content: string;
}

const COMMENT_TAB = 'comment';
const RATE_TAB = 'rate';

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function DetailCourse() {
  const [tab, setTab] = useState<string>(COMMENT_TAB);
  const [course, setCourse] = useState<IClassItem>();
  const [isFail, setIsFail] = useState<boolean>(false);
  const [relativeCourse, setRelativeCourse] = useState<IClassItem[]>();
  const [changePage, setChangePage] = useState<boolean>(false);

  const path = useLocation().search;

  const params = qs.parse(path);

  const id = params.id as string;

  useEffect(() => {
    let isCancel = false;
    // call api to get detail data
    if (!isCancel) {
      courseApi
        .getCourseByID(Number(id))
        .then((res) => {
          if (res) {
            setCourse(res);
          }
        })
        .catch((e) => {
          if (e) {
            setTimeout(() => {
              setIsFail(true);
            }, 10000);
          }
        });
      courseApi
        .getFinishedCoursesByCourseID(234)
        .then((res) => {
          if (res) {
            setRelativeCourse(res);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
    return () => {
      isCancel = true;
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [changePage]);

  return (
    <div className="container__detail__course">
      {!course ? (
        <>{isFail ? <h1>Không tồn tại khóa học!</h1> : <h1>Loading...</h1>}</>
      ) : (
        <div className="detail__course">
          <DetailInfo course={course} isRegister={false} />
          <div className="comment__main">
            <div className="comment__main__tab">
              <span
                onClick={() => tab === RATE_TAB && setTab(COMMENT_TAB)}
                className={
                  tab === COMMENT_TAB ? 'comment__main__tab--active' : ''
                }
              >
                bình luận
              </span>
              <span
                onClick={() => tab === COMMENT_TAB && setTab(RATE_TAB)}
                className={tab === RATE_TAB ? 'comment__main__tab--active' : ''}
              >
                đánh giá
              </span>
            </div>
            <div className="comment__main__content">
              {tab === COMMENT_TAB ? <Comment /> : <Rate />}
            </div>
          </div>
          <div className="detail__course__concern">
            <div className="detail__course__concern__title">
              Lớp học liên quan
            </div>
            <div className="class__list">
              {relativeCourse &&
                relativeCourse.map((course) => (
                  <ClassItem
                    classItem={course}
                    onChangePage={() => setChangePage(!changePage)}
                  />
                ))}
              {/*  */}
            </div>
            <div className="detail__course__concern__btn">xem thêm</div>
          </div>
          <div className="detail__course__concern detail__tutor__concern">
            <div className="detail__course__concern__title">Gia sư phù hợp</div>
            <div className="class__list__tutors">
              <div className="tutor__item">
                <div className="tutor__avatar">
                  <img
                    src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                    alt=""
                  />
                </div>
                <div className="education">Sinh viên</div>
                <div className="name">Nguyễn Đô Ra Ê Môn</div>
                <div className="experience">
                  Sinh viên Học viện Hàng không Việt Nam Chuyên ngành Kỹ thuật
                  hàng không
                </div>
                <div className="subjects">
                  <div className="subjects__title">Môn:</div>
                  <div className="subjects__list">
                    Toán Học, Tiếng Anh, Vật Lý
                  </div>
                </div>
                <div className="address">
                  <div className="address__title">Địa điểm: </div>
                  <div className="address__list">
                    Quận 9, Tp. Thủ Đức, Tp. HCM
                  </div>
                </div>
                <div className="rate">
                  <div className="rate__title">Đánh giá: </div>
                  <div className="rate__list">
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star--border"></i>
                  </div>
                </div>
                <button className="tutor__detail">Xem chi tiết</button>
              </div>
              <div className="tutor__item">
                <div className="tutor__avatar">
                  <img
                    src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                    alt=""
                  />
                </div>
                <div className="education">Sinh viên</div>
                <div className="name">Nguyễn Đô Ra Ê Môn</div>
                <div className="experience">
                  Sinh viên Học viện Hàng không Việt Nam Chuyên ngành Kỹ thuật
                  hàng không
                </div>
                <div className="subjects">
                  <div className="subjects__title">Môn:</div>
                  <div className="subjects__list">
                    Toán Học, Tiếng Anh, Vật Lý
                  </div>
                </div>
                <div className="address">
                  <div className="address__title">Địa điểm: </div>
                  <div className="address__list">
                    Quận 9, Tp. Thủ Đức, Tp. HCM
                  </div>
                </div>
                <div className="rate">
                  <div className="rate__title">Đánh giá: </div>
                  <div className="rate__list">
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star--border"></i>
                  </div>
                </div>
                <button className="tutor__detail">Xem chi tiết</button>
              </div>
            </div>
            <div className="detail__course__concern__btn">xem thêm</div>
          </div>
        </div>
      )}
    </div>
  );
}
