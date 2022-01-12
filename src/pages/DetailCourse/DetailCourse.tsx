import * as qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { courseApi } from '../../api/CourseApi';
import { ClassItem as IClassItem } from '../../components/WaitingClassList/WaitingClassList';
import '../DetailCourse/style.scss';
import { Comment } from './Comment';
import { Rate } from './Rate';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { ClassItem } from '../../components/WaitingClassList/ClassItem';

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
  const [isFail,setIsFail] = useState<boolean>(false);
  const [relativeCourse,setRelativeCourse] = useState<IClassItem[]>();

  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const path = useLocation().search;

  const params = qs.parse(path);

  const id = params.id as string;

  useEffect(() => {
    // call api to get detail data
    courseApi.getCourseByID(Number(id)).then((res) => {
      if (res) {
        setCourse(res);
      }
    }).catch(e=>{

      if(e){
          setTimeout(()=>{
              setIsFail(true);
          },10000);
      }
    });
    courseApi.getFinishedCoursesByCourseID(234).then(res=>{
      if(res){
        setRelativeCourse(res);
      }
    }).catch(e=>{
      console.log(e);
    })
  }, []);  

  const handleSaveCourse = () => {
    courseApi
      .saveCourse(1, 1)
      .then((res) => {
        console.log('add a course success!');
        setTimeout(()=>{
          // setState({ open: true,vertical: 'bottom', horizontal: 'right' });
        },1000)
      })
      .catch((e) => {
        console.log('add a course fail!');
      });
  };

  return (
    <div className="container__detail__course">
      {(!course) ? (  
        <>
        {isFail ? (
          <h1>Không tồn tại khóa học!</h1>
        ): (
          <h1>Loading...</h1>     
        )}
        </>
      ) : (
        <div className="detail__course">
          <div className="detail__course__main">
            <div className="detail__course__main__intro">
              <div className="course__intro__img">
                <img src={course.photo} alt="" />
              </div>
              <div className="course__intro__info">
                <div className="course__intro__info__title">{course.name}</div>
                <div className="course__intro__info__main">
                  <span className="info__main__id">MS: {course.id}</span>
                  <span className="info__main__auth">
                    <i className="fas fa-user"></i> {course.createdBy}
                  </span>
                  <span className="info__main__time">
                    <i className="fas fa-clock"></i> {course.createdDate}
                  </span>
                  <span className="info__main__views">
                    <i className="fas fa-eye"></i> {course.views}
                  </span>
                </div>
                <div className="content__subjects">
                  <div className="content__subjects__item content__subjects__item--subject">
                    {course.subject}
                  </div>
                  <div className="content__subjects__item content__subjects__item--detail">
                    {course.topic}
                  </div>
                  <div className="content__subjects__item content__subjects__item--address">
                    {course.address}
                  </div>
                </div>
              </div>
              <div className="course__intro__btn">
                <button className="course__intro__btn--receive">
                  Nhận lớp
                </button>
                <button
                  className="course__intro__btn--save"
                  onClick={handleSaveCourse}
                >
                  Lưu
                </button>
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={open}
                  autoHideDuration={3000}
                  
                  key={vertical + horizontal}
                   
                >
                   <Alert severity="success">Thêm khóa học thành công!</Alert>
                </Snackbar>
              </div>
            </div>
            <div className="detail__course__main__detail">
              <div className="course__detail__item">
                <div className="course__detail__item__icon">
                  <i className="fas fa-chart-pie"></i>
                </div>
                <div className="course__detail__item__info">
                  <p>Trạng thái</p>
                  <p>
                    {course.status === 0 ? 'Đang tìm gia sư' : 'Đã hoàn thành'}
                  </p>
                </div>
              </div>
              <div className="course__detail__item">
                <div className="course__detail__item__icon">
                  <i className="fas fa-venus-mars"></i>
                </div>
                <div className="course__detail__item__info">
                  <p>Giới tính gia sư</p>
                  <p>
                    {course.gender === 0
                      ? 'Nam'
                      : course.gender === 1
                      ? 'Nữ'
                      : 'Tất cả'}
                  </p>
                </div>
              </div>
              <div className="course__detail__item">
                <div className="course__detail__item__icon">
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <div className="course__detail__item__info">
                  <p>Học phí mỗi buổi</p>
                  <p>{course.tuition}đ</p>
                </div>
              </div>
              <div className="course__detail__item">
                <div className="course__detail__item__icon">
                  <i className="fas fa-comments-dollar"></i>
                </div>
                <div className="course__detail__item__info">
                  <p>Phí nhận lớp</p>
                  <p>{course.fee}đ</p>
                </div>
              </div>
              <div className="course__detail__item">
                <div className="course__detail__item__icon">
                  <i className="fas fa-globe-asia"></i>
                </div>
                <div className="course__detail__item__info">
                  <p>Hình thức dạy</p>
                  <p>
                    {course.formality === 0
                      ? 'Tại nhà'
                      : course.formality === 1
                      ? 'Trực tuyến'
                      : 'Tại trung tâm'}
                  </p>
                </div>
              </div>
              <div className="course__detail__item">
                <div className="course__detail__item__icon">
                  <i className="fas fa-hourglass"></i>
                </div>
                <div className="course__detail__item__info">
                  <p>Thời lượng</p>
                  <p>Tuần {course.schedule.length} buổi (90p/buổi)</p>
                </div>
              </div>
              <div className="course__detail__item">
                <div className="course__detail__item__icon">
                  <i className="fas fa-calendar"></i>
                </div>
                <div className="course__detail__item__info">
                  <p>Ngày học dự kiến</p>
                  <p>{course.learningDate.toLocaleDateString()}</p>
                </div>
              </div>
              <div className="course__detail__item">
                <div className="course__detail__item__icon">
                  <i className="fab fa-buffer"></i>
                </div>
                <div className="course__detail__item__info">
                  <p>Đã có</p>
                  <p>{course.offer}/3 đề nghị dạy</p>
                </div>
              </div>
            </div>
          </div>
          <div className="detail__course__general">
            <div className="course__general__content">
              <div className="course__general__content__title">
                Chi tiết nội dung khóa học
              </div>
              <p>{course.detail}</p>
            </div>
            <div className="course__general__schedule">
              <div className="course__general__content__title">
                Chi tiết nội dung khóa học
              </div>
              <div className="course__schedule__boundary">
                <div className="course__general__schedule__item course__general__schedule--label">
                  <div className="schedule__item__date">Thứ ngày</div>
                  <div className="schedule__item__time">giờ bắt đầu</div>
                </div>
                {course.schedule.map((item, index) => (
                  <div className="course__general__schedule__item" key={index}>
                    <div className="schedule__item__date">Thứ {item.day}</div>
                    <div className="schedule__item__time">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
                  {relativeCourse && relativeCourse.map((course)=>(
                    <ClassItem classItem={course}/>
                    
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
