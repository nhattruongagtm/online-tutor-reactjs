import React, { useEffect, useState } from 'react';
import { Button, Popover, Space, Table } from 'antd';
import { blogApi } from '../../../api/blogApi';
import { Params, Resp } from '../../../api/tutorApi';
import { Blog } from '../../../models/blog';
import Parser from 'html-react-parser';
import { useHistory } from 'react-router';
import { ADMIN__BLOG__CREATE } from '../../routes/path';
import { edit, loadBlogListAD } from '../../../reducers/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../../../store';
import { SelectedItem } from '../../../components/TutorList/TutorList';
import ReactPaginate from 'react-paginate';
type Props = {};

const BlogList = (props: Props) => {
  const limit = 2;
  const dispatch = useDispatch();
  const navigate = useHistory();
  const blogs = useSelector((state: RootState) => state.blog.admin);
  const { currentPage, filters, list, totalItems, totalPages } = blogs;

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
      render: (_: string, record: Blog) => (
        <>{blogs.list.indexOf(record) + 1}</>
      ),
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text: string, record: Blog) => (
        <>
          <img
            src={record.thumbnail}
            alt=""
            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
          />
        </>
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
      render: (_: string, record: Blog) => (
        <>{new Date(record.createdDate as number).toLocaleString()}</>
      ),
    },
    {
      title: 'Lượt thích',
      key: 'likes',
      dataIndex: 'likes',
    },
    {
      title: 'Lượt xem',
      key: 'views',
      dataIndex: 'views',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: string, record: Blog) => (
        <Space size="small">
          <Button
            size="small"
            onClick={() => {
              navigate.push(ADMIN__BLOG__CREATE);
              dispatch(edit(record));
            }}
          >
            Cập nhật
          </Button>

          <Popover
            placement="topRight"
            title={'Bạn có muốn xóa blog này?'}
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
              Xóa
            </Button>
          </Popover>
        </Space>
      ),
    },
  ];

  const handlePageClick = (value: SelectedItem) => {
    const currentPage = value.selected + 1;
    dispatch(loadBlogListAD({ ...blogs, currentPage }));
  };

  useEffect(() => {
    const loadBlogList = async () => {
      const filter: Params = {
        ...filters,
        page: currentPage,
        limit: limit,
      };
      const resp = await blogApi.getAllBlogs(filter);
      const { data } = resp;
      dispatch(loadBlogListAD(data));
    };
    loadBlogList();
  }, [filters, currentPage]);

  return (
    <div className="blog__main">
      <Table columns={columns} dataSource={list} pagination={false} />

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

export default BlogList;
