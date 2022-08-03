import { Button, Popover, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { blogApi } from '../../../api/blogApi';
import { courseApi } from '../../../api/CourseApi';
import { Params } from '../../../api/tutorApi';
import { SelectedItem } from '../../../components/TutorList/TutorList';
import { ClassItem } from '../../../components/WaitingClassList/WaitingClassList';
import { Blog } from '../../../models/blog';
import { loadWaitingList, updatePage } from '../../../reducers/waitingClass';
import { RootState } from '../../../store';
type Props = {};

const PostList = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const posts = useSelector((state: RootState) => state.waitingClass);
  const {list, currentPage, totalItems, totalPages } = posts;
  const [filters, setFilters] = useState<Params>({
    page: currentPage,
    limit:7,
  });
  const handleDeleteBlog = async (id: number) => {
    try {
      const resp = await blogApi.deleteBlog(id);
      const { data } = resp;
      if (data) {
        toast.success('Xóa blog thành công!');
      } else {
        toast.error('Xóa blog thất bại!');
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi!');
    }
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (_: string, record: ClassItem) => (
        <>{posts.list.indexOf(record) + 1}</>
      ),
    },

    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      // render: (_: string, record: Blog) => <>{Parser(record.content)}</>,
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (_: string, record: ClassItem) => (
        <>{new Date(record.createdDate as number).toLocaleString()}</>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: string, record: Blog) => (
        <Space size="small">
          <Popover
            placement="topRight"
            title={'Bạn có muốn ẩn bài đăng này?'}
            content={
              <Space direction="horizontal">
                <Button onClick={() => handleDeleteBlog(record.id || 0)}>
                  Có
                </Button>
                <Button danger>Không</Button>
              </Space>
            }
            trigger="click"
          >
            <Button size="small" danger>
              Ẩn
            </Button>
          </Popover>
        </Space>
      ),
    },
  ];

  const handlePageClick = (value: SelectedItem) => {
    const currentPage = value.selected + 1;
    dispatch(updatePage(currentPage));
  };

  useEffect(() => {
    const loadPostList = async () => {
      const filter: Params = {
        ...filters,
        page: currentPage,   
      };
      const resp = await courseApi.getWaitingClass(filter);
      const { data } = resp;

      console.log('list', list);
      dispatch(loadWaitingList(data));
    };
    loadPostList();
  }, [filters, currentPage]);

  return (
    <div className="blog__main">
      <Table columns={columns as any[]} dataSource={list} pagination={false} />

      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default PostList;
