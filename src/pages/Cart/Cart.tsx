import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { courseApi } from '../../api/CourseApi';
import { ClassItem } from '../../components/WaitingClassList/WaitingClassList';
import { ACCESS_TOKEN } from '../../constants/auth';
import { CartItem } from './CartItem';
import './style.scss';
import { SelectedItem } from '../../components/TutorList/TutorList';
import ReactPaginate from 'react-paginate';

const limit = 8;

export default function Cart() {
  const history = useHistory();
  const [isToogleFilter, setIsToogleFilter] = useState<boolean>(false);
  const [savedCourse, setSavedCourse] = useState<ClassItem[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(100);
  const [pageCount, setPageCount] = useState<number>(
    Math.ceil(totalPage / limit)
  );
  // get saved courses (cart)
  useEffect(() => {
    const params = { page: currentPage, limit: limit };
    if (localStorage.getItem(ACCESS_TOKEN)) {
      console.log('oke');
      courseApi.getAllSavedCourse(1, params).then((res) => {
        if (res) {
          setSavedCourse(res);
        }
        console.log('res', res);
      });
    } else {
      console.log('no');
    }
  }, [currentPage]);

  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [currentPage]);
    return null;
  };

  const handlePageClick = (data: SelectedItem) => {
    const currentPage = data.selected + 1;
    setCurrentPage(currentPage);
  };

  return (
    <div className="cart">
      <ScrollToTop />
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
        ) : (
          <h1>loading...</h1>
        )}
      </div>
    </div>
  );
}
