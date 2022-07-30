import React, { useEffect, useState } from 'react';
import '../News/style.scss';
import NewItem from './NewItem';
import { Blog } from '../../models/blog';
import { blogApi } from '../../api/blogApi';
import { Resp } from '../../api/tutorApi';

export default function News() {
  const limit = 2;
  const [blogs, setBlogs] = useState<Resp<Blog>>({
    currentPage: 1,
    list: [],
    totalItems: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const loadBlogList = async () => {
      const resp = await blogApi.getAllBlogs({ page: 1, limit: limit });
      const { data } = resp;
      setBlogs(data);
    };
    loadBlogList();
  }, []);
  return (
    <div className="news">
      <h3 className="news__header">
        <div className="news__title">Tin tức mới nhất</div>
        <div className="news__time">{new Date().toISOString()}</div>
      </h3>
      <div className="news__list">
        {blogs.list.map((item) => (
          <NewItem key={item.id} item={item}/>
        ))}
      </div>
    </div>
  );
}
