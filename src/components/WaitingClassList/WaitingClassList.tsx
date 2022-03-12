import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router';
import { courseApi } from '../../api/CourseApi';
import { COURSE_PATH } from '../../constants/path';
import '../WaitingClassList/style.scss';
import { ClassItem } from './ClassItem';
import { SelectedItem } from '../TutorList/TutorList';
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
  const limit = 10;
  const history = useHistory();
  const [isToogleFilter, setIsToogleFilter] = useState<boolean>(false);
  const [courses, setCourses] = useState<ClassItem[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(100);
  const [pageCount, setPageCount] = useState<number>(
    Math.ceil(totalRows / limit)
  );
  useEffect(() => {
    // get data from api
    let isCancel = false;  
    const params = {
      _limit: limit,
      _page: currentPage,
    };
    const resp = courseApi.getWaitingClass(params);

    if (!isCancel) {
      setCourses(resp.data);
      setTotalRows(resp.totalRows);
    }

    return () => {isCancel = true;
    }
  }, [currentPage]);
  const handlePageClick = (data: SelectedItem) => {
    const currentPage = data.selected + 1;
    setCurrentPage(currentPage);
  };
  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [currentPage]);
    return null;
  };

  return (
    <div className="waiting__class">
      <ScrollToTop />
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
        <ReactPaginate
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="<<"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          // renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}
