import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { courseApi } from '../../api/CourseApi';
import { ClassItem } from '../../components/WaitingClassList/WaitingClassList';
import { ACCESS_TOKEN } from '../../constants/auth';
import { CartItem } from './CartItem';
import './style.scss';
import { SelectedItem } from '../../components/TutorList/TutorList';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Resp, Params } from '../../api/tutorApi';
import { updatePageData } from '../../reducers/cartSlice';
import useUser from '../../hooks/useUser';
import Loading from '../../components/Common/Loading';
export default function Cart() {
  const [user] = useUser();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isToogleFilter, setIsToogleFilter] = useState<boolean>(false);

  const cart = useSelector((state: RootState) => state.cart);
  const { currentPage, list, totalItems, totalPages } = cart;

  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [currentPage]);
    return null;
  };

  const handlePageClick = (data: SelectedItem) => {
    const pageData: Resp<ClassItem> = {
      ...cart,
      currentPage: data.selected + 1,
    };

    dispatch(updatePageData(pageData));
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
        {list ? (
          <div className="waiting__class__main">
            <div className="class__list">
              {list.map((item) => (
                <CartItem classItem={item} key={item.id} />
              ))}
            </div>
            {list.length > 0 && (
              <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPages}
                previousLabel="<"
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
    </div>
  );
}
