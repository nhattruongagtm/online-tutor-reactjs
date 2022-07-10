import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { courseApi } from '../../api/CourseApi';
import { subjectApi } from '../../api/subjectApi';
import { Params } from '../../api/tutorApi';
import { Grade } from '../../models/grade';
import { Subject } from '../../models/subject';
import {
  IWaitingClass,
  loadWaitingList,
  updatePage,
} from '../../reducers/waitingClass';
import { RootState } from '../../store';
import Loading from '../Common/Loading';
import { SelectedItem } from '../TutorList/TutorList';
import '../WaitingClassList/style.scss';
import { ClassItem } from './ClassItem';
export interface LearningDate {
  ids?: number;
  day: number;
  time: number;
}
export interface ClassItem {
  id: number;
  title: string;
  content: string;
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
  schedule: LearningDate[];
  post: {
    learningDate: number;
  };
}
export interface FilterWaiting {}
export default function WaitingClassList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.waitingClass);
  const { limit, list, page, totalItems, totalPages } = store;
  const [isToogleFilter, setIsToogleFilter] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<Params>({
    page,
    limit,
  });
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  useEffect(() => {
    const params: Params = {
      page: 1,
      limit: 100,
    };
    subjectApi
      .getAllSubject(params)
      .then((res) => {
        const { data } = res;
        data && setSubjects(data.list);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    subjectApi
      .getAllGrade()
      .then((res) => {
        console.log(res.data);
        setGrades(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    // get data from api
    let isCancel = false;

    setIsLoading(true);
    courseApi
      .getWaitingClass(filters)
      .then((res) => {
        const { data } = res;
        const { currentPage, list, totalItems, totalPages } = data;
        const pageData: IWaitingClass = {
          page,
          list,
          totalItems,
          totalPages,
          limit,
        };

        console.log(pageData.page, list);
        dispatch(loadWaitingList(pageData));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });

    if (!isCancel) {
      // setCourses(resp.data);
      // setTotalRows(resp.totalRows);
    }

    return () => {
      isCancel = true;
    };
  }, [page, filters]);
  const handlePageClick = (data: SelectedItem) => {
    const currentPage = data.selected + 1;
    dispatch(updatePage(currentPage));
    setFilters({ ...filters, page: currentPage });
  };
  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [page]);
    return null;
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;

    setFilters({
      ...filters,
      [name]: isNaN(Number(value)) ? value : Number(value),
    });
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
          <input
            type="text"
            placeholder="Tên khóa học"
            onChange={handleOnChange}
            value={filters.search}
            name="search"
          />
          <select name="location" id="" className="class__features__item">
            <option value="">Chọn địa điểm</option>
          </select>
          <select
            name="subjectID"
            id=""
            className="class__features__item"
            onChange={handleOnChange}
          >
            <option value="">Chọn môn học</option>
            {subjects.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            name="class"
            id=""
            className="class__features__item"
            onChange={handleOnChange}
          >
            <option value="">Chọn lớp</option>
            {grades.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            name="formality"
            id=""
            className="class__features__item"
            onChange={handleOnChange}
          >
            <option value="">Hình thức dạy</option>
            <option value="0">Online</option>
            <option value="1">Tại trung tâm</option>
            <option value="2">Tại nhà</option>
          </select>
          <select
            name="sort"
            id=""
            className="class__features__item"
            onChange={handleOnChange}
          >
            <option value="">sắp xếp theo</option>
            <option value="title">Tiêu đề</option>
            <option value="tuition">Học phí</option>
            <option value="createdDate">Ngày đăng</option>
          </select>
          <select
            name="orderBy"
            id=""
            className="class__features__item"
            onChange={handleOnChange}
          >
            <option value="">theo thứ tự</option>
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
          {/* <button>Tìm khóa học</button> */}
        </div>
      </div>
      {list.length > 0 && (
        <div className="waiting__class__main">
          <div className="class__list">
            {list &&
              list.map((course) => (
                <ClassItem classItem={course} key={course.id} />
              ))}
          </div>
          <ReactPaginate
            nextLabel=">>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
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
      )}
      {isLoading && <Loading />}
    </div>
  );
}
