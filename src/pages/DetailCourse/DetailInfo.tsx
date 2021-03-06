import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { courseApi } from '../../api/CourseApi';
import { ClassItem } from '../../components/WaitingClassList/WaitingClassList';
import useUser from '../../hooks/useUser';
import { RootState } from '../../store';
import { addCart } from '../../reducers/cartSlice';
import { Button, Modal } from 'antd';
import { converLearningDate } from '../../utils/date';
import { Input } from 'antd';
import OfferForm from './OfferForm';
const { TextArea } = Input;
interface DetailInfoProps {
  course: ClassItem;
  isRegister: boolean;
}

export const DetailInfo = ({ course, isRegister }: DetailInfoProps) => {
  const dispatch = useDispatch();
  const [user] = useUser();
  const cartList = useSelector((state: RootState) => state.cart.list);

  const handleSaveCourse = () => {
    const index = cartList.findIndex((item) => item.id === course.id);
    if (index === -1) {
      user &&
        courseApi
          .saveCourse(user.id, course.id)
          .then((res) => {
            dispatch(addCart(course));
            toast.success('Thêm khóa học thành công!');
          })
          .catch((e) => {
            console.log('add a course fail!');
          });
    } else {
      toast.warning('Khoá học này đã tồn tại!');
    }
  };

  return (
    <>
      <div className="detail__course__main">
        <div className="detail__course__main__intro">
          <div className="course__intro__img">
            <img src={course.photo} alt="" />
          </div>
          <div className="course__intro__info">
            <div className="course__intro__info__title">{course.title}</div>
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
          {!isRegister && (
            <div className="course__intro__btn">
              {user && user.type === 1 && (
                // <button className="course__intro__btn--receive">
                //   Nhận lớp
                // </button>
                <OfferForm user={user} courseId={course.id} />
              )}
              <button
                className="course__intro__btn--save"
                onClick={handleSaveCourse}
              >
                Lưu
              </button>
            </div>
          )}
        </div>
        <div className="detail__course__main__detail">
          <div className="course__detail__item">
            <div className="course__detail__item__icon">
              <i className="fas fa-chart-pie"></i>
            </div>
            <div className="course__detail__item__info">
              <p>Trạng thái</p>
              <p>{course.status === 0 ? 'Đang tìm gia sư' : 'Đã hoàn thành'}</p>
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
              <p>
                Tuần {course.schedule && course.schedule.length} buổi (90p/buổi)
              </p>
            </div>
          </div>
          <div className="course__detail__item">
            <div className="course__detail__item__icon">
              <i className="fas fa-calendar"></i>
            </div>
            <div className="course__detail__item__info">
              <p>Ngày học dự kiến</p>
              <p>{new Date(course.learningDate).toLocaleDateString()}</p>
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
          <p>{course.content}</p>
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
            {course.schedule &&
              course.schedule.map((item, index) => (
                <div className="course__general__schedule__item" key={index}>
                  <div className="schedule__item__date">Thứ {item.day}</div>
                  <div className="schedule__item__time">
                    {converLearningDate(item.time)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
