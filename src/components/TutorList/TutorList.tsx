import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useHistory, useLocation } from 'react-router';
import axiosClient from '../../api/axiosClient';
import { Params, tutorApi } from '../../api/tutorApi';
import { TUTOR_LIST_PATH } from '../../constants/path';
import { TutorItem as Item } from '../Home/TutorItem';
import qs from 'query-string';
import '../TutorList/style.scss';
import { TutorItem } from './TutorItem';

export interface SelectedItem {
  selected: number;
}

const limit = 8;

export default function TutorList() {
  const [isToogleFilter, setIsToogleFilter] = useState<boolean>(false);
  const history = useHistory();
  // const location = useLocation().search;
  // const q = qs.parse(location);

  // const routePath = {
  //   _limit: Number(q._limit),
  //   _page: Number(q._page),
  // };

  const [tutorList, setTutorList] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(100);
  const [pageCount, setPageCount] = useState<number>(
    Math.ceil(totalPage / limit)
  );
  // const [params,setParams] = useState<Params>(routePath);

  const handlePageClick = (data: SelectedItem) => {
    const currentPage = data.selected + 1;

    setCurrentPage(currentPage);

    // const q = qs.stringify(params);

    // console.log(q)

    // history.push(`${TUTOR_LIST_PATH}?${q}`);
  };

  useEffect(() => {
    const params = { limit: limit, page: currentPage };
    const getPostsFromApi = () => {
      const resp = tutorApi.getAllTutor(params);
      setTutorList(resp.list);
    };
    // const getPost = async () => {
    //   const list = await getPostsFromApi();
    //   setTutorList(list);
    // };
    // getPost();
    getPostsFromApi();
  }, [currentPage]);

  console.log(tutorList[tutorList.length - 1]);
  
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
            className="class__features__tutor__input"
          />
          <select name="city" id="" className="class__features__item">
            <option value="">Tất cả tỉnh/thành</option>
          </select>
          <select name="district" id="" className="class__features__item">
            <option value="">Tất cả quận/huyện</option>
          </select>
          <select name="subject" id="" className="class__features__item">
            <option value="">Chọn môn học</option>
          </select>
          <select name="class" id="" className="class__features__item">
            <option value="">Chọn lớp học</option>
          </select>
          <button>Tìm gia sư</button>
        </div>
      </div>
      <div className="waiting__class__main">
        <div className="class__list__tutor">
          {tutorList.map((tutor, index) => (
            <TutorItem tutor={tutor} key={index} />
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
        {/* <div className="class__pagination">
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
        </div> */}   
      </div>
    </div>
  );
}
