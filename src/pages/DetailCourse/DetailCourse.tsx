import { SnackbarOrigin } from '@mui/material/Snackbar';
import { Button } from 'antd';
import * as qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { courseApi } from '../../api/CourseApi';
import Loading from '../../components/Common/Loading';
import { ClassItem } from '../../components/WaitingClassList/ClassItem';
import { ClassItem as IClassItem } from '../../components/WaitingClassList/WaitingClassList';
import '../DetailCourse/style.scss';
import { Comment } from './Comment';
import { DetailInfo } from './DetailInfo';
import { Rate } from './Rate';
import { RootState } from '../../store';
import { commentApi } from '../../api/commentApi';
import { Params } from '../../api/tutorApi';
import { updatePage } from '../../reducers/detailCourseSlice';
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
  const dispatch = useDispatch();

  const params = qs.parse(path);

  const id = params.id as string;

  const commentStore = useSelector(
    (state: RootState) => state.detailCourse.pageInfo
  );
  useEffect(() => {
    let isCancel = false;
    // call api to get detail data
    if (!isCancel) {
      courseApi
        .getCourseByID(Number(id))
        .then((res) => {
          if (res) {
            console.log(res.data);
            setCourse(res.data);
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
        <>{isFail ? <h1>Kh??ng t???n t???i kh??a h???c!</h1> : <Loading />}</>
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
                b??nh lu???n
              </span>
              <span
                onClick={() => tab === COMMENT_TAB && setTab(RATE_TAB)}
                className={tab === RATE_TAB ? 'comment__main__tab--active' : ''}
              >
                ????nh gi??
              </span>
            </div>
            <div className="comment__main__content">
              {tab === COMMENT_TAB ? <Comment id={Number(id)} /> : <Rate course={course}/>}
             
            </div>
          </div>
          <div className="detail__course__concern">
            <div className="detail__course__concern__title">
              L???p h???c li??n quan
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
            <div className="detail__course__concern__btn">xem th??m</div>
          </div>
          <div className="detail__course__concern detail__tutor__concern">
            <div className="detail__course__concern__title">Gia s?? ph?? h???p</div>
            <div className="class__list__tutors">
              <div className="tutor__item">
                <div className="tutor__avatar">
                  <img
                    src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                    alt=""
                  />
                </div>
                <div className="education">Sinh vi??n</div>
                <div className="name">Nguy???n ???? Ra ?? M??n</div>
                <div className="experience">
                  Sinh vi??n H???c vi???n H??ng kh??ng Vi???t Nam Chuy??n ng??nh K??? thu???t
                  h??ng kh??ng
                </div>
                <div className="subjects">
                  <div className="subjects__title">M??n:</div>
                  <div className="subjects__list">
                    To??n H???c, Ti???ng Anh, V???t L??
                  </div>
                </div>
                <div className="address">
                  <div className="address__title">?????a ??i???m: </div>
                  <div className="address__list">
                    Qu???n 9, Tp. Th??? ?????c, Tp. HCM
                  </div>
                </div>
                <div className="rate">
                  <div className="rate__title">????nh gi??: </div>
                  <div className="rate__list">
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star--border"></i>
                  </div>
                </div>
                <button className="tutor__detail">Xem chi ti???t</button>
              </div>
              <div className="tutor__item">
                <div className="tutor__avatar">
                  <img
                    src="https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg"
                    alt=""
                  />
                </div>
                <div className="education">Sinh vi??n</div>
                <div className="name">Nguy???n ???? Ra ?? M??n</div>
                <div className="experience">
                  Sinh vi??n H???c vi???n H??ng kh??ng Vi???t Nam Chuy??n ng??nh K??? thu???t
                  h??ng kh??ng
                </div>
                <div className="subjects">
                  <div className="subjects__title">M??n:</div>
                  <div className="subjects__list">
                    To??n H???c, Ti???ng Anh, V???t L??
                  </div>
                </div>
                <div className="address">
                  <div className="address__title">?????a ??i???m: </div>
                  <div className="address__list">
                    Qu???n 9, Tp. Th??? ?????c, Tp. HCM
                  </div>
                </div>
                <div className="rate">
                  <div className="rate__title">????nh gi??: </div>
                  <div className="rate__list">
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star"></i>
                    <i className="fas fa-star star--border"></i>
                  </div>
                </div>
                <button className="tutor__detail">Xem chi ti???t</button>
              </div>
            </div>
            <div className="detail__course__concern__btn">xem th??m</div>
          </div>
        </div>
      )}
    </div>
  );
}
