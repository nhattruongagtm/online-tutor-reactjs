import React from 'react';
import './blog.scss';
import BlogHeader from './BlogHeader';
import BlogList from './BlogList';
import { Space } from 'antd';

type Props = {};

const Blog = (props: Props) => {
  return (
    <div className="blog">
      <BlogHeader />
      <BlogList />
    </div>
  );
};

export default Blog;
