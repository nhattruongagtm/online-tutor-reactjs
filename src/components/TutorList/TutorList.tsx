import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import { current } from '@reduxjs/toolkit';
import React, { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Params, tutorApi } from '../../api/tutorApi';
import {
  loadTutorList,
  TutorSlice,
  updatePage,
} from '../../reducers/tutorSlice';
import { RootState } from '../../store';
import Loading from '../Common/Loading';
import '../TutorList/style.scss';
import { TutorItem } from './TutorItem';
import useAddress, { City } from '../../hooks/useAddress';
import { subjectApi } from '../../api/subjectApi';
import { Subject } from '../../models/subject';
import { Grade } from '../../models/grade';

export interface SelectedItem {
  selected: number;
}

export default function TutorList() {
  const [isToogleFilter, setIsToogleFilter] = useState<boolean>(false);
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.tutors);
  const { limit, list, page, totalItems, totalPages } = store;
  const [loading, setLoading] = useState<boolean>(false);
  const [district, city] = useAddress();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);

  // const cities = useRef<City[]>([]);
  // cities.current = city;

  const handlePageClick = (data: SelectedItem) => {
    const currentPage = data.selected + 1;
    dispatch(updatePage(currentPage));
    setFilters({ ...filters, page: currentPage });
  };

  const [filters, setFilters] = useState<Params>({
    page,
    limit,
  });

  useEffect(() => {
    const getAllSubject = async () => {
      try {
        const res = await subjectApi.getAllSubject({ page: 1, limit: 500 });
        const resp = await subjectApi.getAllGrade();
        setSubjects(res.data.list);
        setGrades(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllSubject();
  }, []);

  useEffect(() => {
    const getAllTutor = async () => {
      try {
        setLoading(true);
        const resp = await tutorApi.getAllTutor(filters);
        const { data } = resp;
        const { currentPage, list, totalItems, totalPages } = data;
        const pageData: TutorSlice = {
          page: currentPage,
          limit,
          list,
          totalItems,
          totalPages,
          userDetail: null,   
        };
        console.log(list);
        dispatch(loadTutorList(pageData));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getAllTutor();
  }, [page, filters]);

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
      [name]: value,
    });
  };

  return (
    <div className="waiting__class">
      <ScrollToTop />
      <div className="waiting__class__bar">
        <div className="class__header">
          <div className="class__header__title">Danh sách gia sư</div>
          <div
            className="class__header__btnAdd"
            onClick={() => setIsToogleFilter(!isToogleFilter)}
          >
            Tìm gia sư
          </div>
        </div>
        <div
          className={
            isToogleFilter
              ? 'class__features__tutor class__features__toogle'
              : 'class__features'
          }
        >
          <input
            type="text"
            placeholder="Tên gia sư"
            name="search"
            onChange={handleOnChange}
            value={filters.search}
            className="class__features__tutor__input"
          />
          <select
            name="city"
            id=""
            className="class__features__item"
            onChange={handleOnChange}
          >
            <option value="">Tất cả tỉnh/thành</option>
            {city.map((item) => (
              <option key={item.code} value={item.code}>
                {item.name_with_type}
              </option>
            ))}
          </select>
          <select
            name="district"
            id=""
            className="class__features__item"
            onChange={handleOnChange}
          >
            <option value="">Tất cả quận/huyện</option>
            {filters.city &&
              district
                .filter((item) => item.parent_code === filters.city + '')
                .map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name_with_type}
                  </option>
                ))}
          </select>
          <select
            name="subject"
            id=""
            className="class__features__item"
            onChange={handleOnChange}
          >
            <option value="">Chọn môn học</option>
            {subjects.map((item) => (
              <option value={item.id} key={item.id}>
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
            <option value="">Chọn lớp học</option>
            {grades.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {/* <button>Tìm gia sư</button> */}
        </div>
      </div>
      {!loading ? (
        <div className="waiting__class__main">
          <div className="class__list__tutor">
            {list.map((tutor, index) => (
              <TutorItem tutor={tutor} key={index} />
            ))}
          </div>
          {list.length > 0 && totalPages > 1 && (
            <ReactPaginate
              nextLabel={<CaretRightOutlined />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel={<CaretLeftOutlined />}
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
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
