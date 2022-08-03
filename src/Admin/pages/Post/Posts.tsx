import React from 'react';
import '../Blog/blog.scss';
import BlogHeader from '../Blog/BlogHeader';
import PostList from './PostList';
interface Props {}

const Posts = (props: Props) => {
  return (
    <div className="blog">
      <BlogHeader />
      <PostList />   
    </div>
  );
};

export default Posts;
