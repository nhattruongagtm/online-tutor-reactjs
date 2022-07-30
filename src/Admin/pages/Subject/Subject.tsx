import React from 'react';
import BlogHeader from '../Blog/BlogHeader';
import '../Blog/blog.scss';
import SubjectList from './SubjectList';
import './style.scss';
import { Space, Input } from 'antd';
import SubjectForm from './SubjectForm';

const { Search } = Input;
type Props = {};

const Subject = (props: Props) => {
  const handleSearch = (value: string) => {
    console.log(value);
  };
  return (
    <div className="blog">
      <Space className="blog__header">
        <Search
          placeholder="Tìm kiếm bài viết..."
          className="input-search"
          onSearch={handleSearch}
          style={{
            width: 200,
          }}
        />
      </Space>
      <Space direction="horizontal" className="subject__main">
        <div className="create__subject">
          <SubjectForm />
        </div>
        <SubjectList />
      </Space>
    </div>
  );
};

export default Subject;
