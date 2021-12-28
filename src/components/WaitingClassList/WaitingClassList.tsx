import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { COURSE_PATH } from '../../constants/path';
import '../WaitingClassList/style.scss';
import { ClassItem } from './ClassItem';
interface LearningDate {
  day: number;
  time: number;
}
export interface ClassItem {
  id: number;
  name: string;
  createdBy: string;
  createdDate: string;
  views: number;
  photo: string;
  topic: string;
  subject: string;
  address: string;
  status: number;
  gender: number;
  tuition: number;
  fee: number;
  formality: number;
  times: number;
  learningDate: Date;
  offer: number;
  detail: string;
  schedule: LearningDate[];
}
export default function WaitingClassList() {
  const history = useHistory();
  const [isToogleFilter, setIsToogleFilter] = useState<boolean>(false);
  const [courses, setCourses] = useState<ClassItem[]>();
  useEffect(() => {
    // get data from api
    const dataFromApi: ClassItem[] = [
      {
        id: 123,
        name: 'CẦN TÌM GIA SƯ DẠY TIẾNG ANH GIAO TIẾP CHO NGƯỜI ĐI LÀM',
        createdBy: 'Quản trị viên',
        createdDate: '00:54, 26/11/2021',
        views: 1633,
        photo:
          'https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png',
        status: 0,
        topic: 'Giao tiếp căn bản',
        subject: 'Tiếng anh',
        address: 'phường Linh Trung, Thành phố Thủ Đức',
        gender: 0,
        tuition: 1800000,
        fee: 600000,
        formality: 0,
        times: 2,
        learningDate: new Date(),
        offer: 1,
        detail: 'Cần gia sư là Giáo viên chuyên dạy Toán tiếng anh hệ Toán tiếng Anh hệ Cambridge cho bé lớp 4 và lớp 6, yêu cầu có kinh nghiệm và kỹ năng dạy chuyên nghiệp. Dạy',
        schedule: [
          { day: 6, time: 13 },
          { day: 7, time: 9 },
        ],
      },
      {
        id: 234,
        name: 'CẦN TÌM GIA SƯ DẠY TIẾNG ANH GIAO TIẾP CHO NGƯỜI ĐI LÀM',
        createdBy: 'Quản trị viên',
        createdDate: '00:54, 26/11/2021',
        views: 1633,
        photo:
          'https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png',
        status: 0,
        topic: 'Giao tiếp căn bản',
        subject: 'Tiếng anh',
        address: 'phường Linh Trung, Thành phố Thủ Đức',
        gender: 0,
        tuition: 1800000,
        fee: 600000,
        formality: 0,
        times: 2,
        learningDate: new Date(),
        offer: 1,
        detail: 'Cần gia sư là Giáo viên chuyên dạy Toán tiếng anh hệ Toán tiếng Anh hệ Cambridge cho bé lớp 4 và lớp 6, yêu cầu có kinh nghiệm và kỹ năng dạy chuyên nghiệp. Dạy',
        schedule: [
          { day: 6, time: 13 },
          { day: 7, time: 9 },
        ],
      },
    ];

    setCourses(dataFromApi);

  }, []);
  return (
    <div className="waiting__class">
      <div className="waiting__class__bar">
        <div className="class__header">
          <div className="class__header__title">Lớp học tìm gia sư</div>
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
      <div className="waiting__class__main">
        <div className="class__list">
          {courses &&
            courses.map((course) => (
              <ClassItem classItem={course} key={course.id} />
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
    </div>
  );
}
