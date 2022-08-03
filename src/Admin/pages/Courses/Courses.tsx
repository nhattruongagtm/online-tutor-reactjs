import { Space } from 'antd';
import React from 'react';
import { Col } from 'react-bootstrap';
import { Params } from '../../../api/tutorApi';
import CourseList from '../Home/CourseList';
import SubjectForm from '../Subject/SubjectForm';
import SubjectList from '../Subject/SubjectList';
import { Header } from '../User/Header';
import { RootState } from '../../../store';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { SelectedItem } from '../../../components/TutorList/TutorList';
import { changeCoursePage } from '../../../reducers/courseSlice';

interface CoursesProps {}

export const Courses = (props: CoursesProps) => {
  const handleGetParams = (params: Params) => {};
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.course);
  const { currentPage, filters, list, totalItems, totalPages } = store;
  const handlePageClick = (value: SelectedItem) => {
    const currentPage = value.selected + 1;
    dispatch(changeCoursePage(currentPage));
  };
  return (
    <>
      <Col sm={8} className="dashboard__users">
        <Header onGetParams={handleGetParams} />
        <div className="dashboard__users__main">
          <div className="dashboard__us ers__main__list dashboard__subject">
            <CourseList />
          </div>
          <div className="dashboard__users__main__pagination">
            <ReactPaginate
              nextLabel=">>"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={1}
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
            />
          </div>
        </div>
      </Col>
      <Col className="dashboard__users__profil e dashboard__subject">
        <Space direction="vertical" style={{ width: '100%' }}>
          <SubjectList />
          <hr />
          <SubjectForm />
        </Space>
      </Col>
    </>
  );
};
