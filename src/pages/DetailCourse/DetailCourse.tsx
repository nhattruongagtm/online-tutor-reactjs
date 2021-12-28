import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import '../DetailCourse/style.scss';
import * as qs from 'query-string';
import { ClassItem } from '../../components/WaitingClassList/WaitingClassList';
import { courseApi } from '../../api/CourseApi';
import { countReset } from 'console';
import { Comment } from './Comment';

interface DetailInfo {
  icon: string;
  title: string;
  content: string;
}

export default function DetailCourse() {
  
  const [course, setCourse] = useState<ClassItem>();

  const path = useLocation().search;

  const params = qs.parse(path);

  const id = params.id as string;

  useEffect(() => {
    // call api to get detail data
    courseApi.getCourseByID(id).then((res) => {
      if (res) {
        setCourse(res);
      }
    });
  }, []);

  return (
    <div className="container__detail__course">
      {!course ? (
        <h1>Loading...</h1>
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
                <button className="course__intro__btn--save">Lưu</button>
              </div>
            </div>
            <div className="detail__course__main__detail">
                  <div className="course__detail__item">
                    <div className="course__detail__item__icon">
                      <i className='fas fa-chart-pie'></i>
                    </div>
                    <div className="course__detail__item__info">
                      <p>Trạng thái</p>
                      <p>{course.status === 0 ? 'Đang tìm gia sư' : 'Đã hoàn thành'}</p>
                    </div>
                  </div>
                  <div className="course__detail__item">
                    <div className="course__detail__item__icon">
                      <i className='fas fa-venus-mars'></i>
                    </div>
                    <div className="course__detail__item__info">
                      <p>Giới tính gia sư</p>
                      <p>{course.gender === 0 ? 'Nam' : course.gender === 1 ? 'Nữ' : 'Tất cả'}</p>
                    </div>
                  </div>
                  <div className="course__detail__item">
                    <div className="course__detail__item__icon">
                      <i className='fas fa-dollar-sign'></i>
                    </div>
                    <div className="course__detail__item__info">
                      <p>Học phí mỗi buổi</p>
                      <p>{course.tuition}đ</p>
                    </div>
                  </div>
                  <div className="course__detail__item">
                    <div className="course__detail__item__icon">
                      <i className='fas fa-comments-dollar'></i>
                    </div>
                    <div className="course__detail__item__info">
                      <p>Phí nhận lớp</p>
                      <p>{course.fee}đ</p>
                    </div>
                  </div>
                  <div className="course__detail__item">
                    <div className="course__detail__item__icon">
                      <i className='fas fa-globe-asia'></i>
                    </div>
                    <div className="course__detail__item__info">
                      <p>Hình thức dạy</p>
                      <p>{course.formality === 0 ? 'Tại nhà' : course.formality === 1 ? 'Trực tuyến' : 'Tại trung tâm'}</p>
                    </div>
                  </div>
                  <div className="course__detail__item">
                    <div className="course__detail__item__icon">
                      <i className='fas fa-hourglass'></i>
                    </div>
                    <div className="course__detail__item__info">
                      <p>Thời lượng</p>
                      <p>Tuần {course.schedule.length} buổi (90p/buổi)</p>
                    </div>
                  </div>
                  <div className="course__detail__item">
                    <div className="course__detail__item__icon">
                      <i className='fas fa-calendar'></i>
                    </div>
                    <div className="course__detail__item__info">
                      <p>Ngày học dự kiến</p>
                      <p>{course.learningDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="course__detail__item">
                    <div className="course__detail__item__icon">
                      <i className='fab fa-buffer'></i>
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
                  <Comment/>
          <div className="detail__course__concern">
            <div className="detail__course__concern__title">
              Lớp học liên quan
            </div>
            <div className="class__list">
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
