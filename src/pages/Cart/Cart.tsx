import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { courseApi } from '../../api/CourseApi';
import { ClassItem } from '../../components/WaitingClassList/WaitingClassList';
import { ACCESS_TOKEN } from '../../constants/auth';
import { CartItem } from './CartItem';
import './style.scss';
export default function Cart() {
  const history = useHistory();
  const [isToogleFilter, setIsToogleFilter] = useState<boolean>(false);
  const [savedCourse, setSavedCourse] = useState<ClassItem[]>();
  // get saved courses (cart)
  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      console.log('oke');
      courseApi.getAllSavedCourse(1).then((res) => {
        if (res) {
          setSavedCourse(res);
        }
        console.log('res', res);
      });
    } else {
      console.log('no');
    }
  }, []);
  return (
    <div className="cart">
      <div className="waiting__class">
        <div className="waiting__class__bar">
          <div className="class__header">
            <div className="class__header__title">
              Danh sách khóa học đã lưu
            </div>
            <div
              className="class__header__btnAdd"
              onClick={() => setIsToogleFilter(!isToogleFilter)}
            >
              Tìm khóa học
            </div>
          </div>
          <div
            className={
              isToogleFilter
                ? 'class__features class__features__toogle'
                : 'class__features'
            }
          >
            <input type="text" placeholder="Tên khóa học" />
            <select name="address" id="" className="class__features__item">
              <option value="">Chọn địa điểm</option>
            </select>
            <select name="subject" id="" className="class__features__item">
              <option value="">Chọn môn học</option>
            </select>
            <select name="class" id="" className="class__features__item">
              <option value="">Chọn lớp</option>
            </select>
            <select name="format" id="" className="class__features__item">
              <option value="">Hình thức dạy</option>
            </select>
            <button>Tìm khóa học</button>
          </div>
        </div>
        {savedCourse ? (
          <div className="waiting__class__main">
            <div className="class__list">
              {savedCourse.map((item) => (
                <CartItem classItem={item} key={item.id} />
              ))}
            </div>
            <div className="class__pagination">
              <div className="class__pagination__item class__pagination__item--nav">
                <i className="fas fa-chevron-left"></i>
              </div>
              <div className="class__pagination__item">1</div>
              <div className="class__pagination__item">2</div>
              <div className="class__pagination__item class__pagination__item--checked">
                3
              </div>
              <div className="class__pagination__item">...</div>
              <div className="class__pagination__item">10</div>
              <div className="class__pagination__item class__pagination__item--nav">
                <i className="fas fa-chevron-right"></i>
              </div>
            </div>
          </div>
        ) : (
          <h1>loading...</h1>
        )}
      </div>
    </div>
  );
}
