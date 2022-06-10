import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentApi } from '../../api/commentApi';
import { Params } from '../../api/tutorApi';
import { CommentForm } from './CommentForm';
import { Comment as CommentChild, CommentItem } from './CommentItem';
import './comments.scss';
import { PageItem } from '../../reducers/detailCourseSlice';
import { updatePage } from '../../reducers/detailCourseSlice';
import { RootState } from '../../store';
interface CommentProps {
  id: number;
}

const commentList: CommentChild[] = [
  {
    id: 1,
    courseID: 12,
    userID: 1,
    like: 0,
    createdDate: new Date(),
    content: 'Khóa học này có được giảng bởi gia sư nước ngoài không?',
    avatar: 'https://avatarfiles.alphacoders.com/180/180144.jpg',
    name: 'Spider man',
  },
];

const setCommentList = (comment: CommentChild): void => {
  console.log(comment);
};

export const CommentContext = createContext({ commentList, setCommentList });

export const Comment = ({ id }: CommentProps) => {
  // const [commentList, setCommentList] = useState<CommentChild[]>([]);
  const dispatch = useDispatch();
  const commentList = useSelector((state: RootState) =>
    state.detailCourse.pageInfo
  );
  useEffect(() => {
    const params: Params = {
      page: 1,
      limit: 5,
    };
    commentApi
      .getCommentsByPost(id, params)
      .then((res) => {
        const { data } = res;
        const { currentPage, list, totalItems, totalPages } = data;
        const initialPage: PageItem = {
          id,
          currentPage,
          list,
          totalItems,
          totalPages,
        };
        dispatch(updatePage(initialPage));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const setComments = (comment: CommentChild) => {
    commentApi
      .commentPost(comment)
      .then((res) => {
        // setCommentList([comment, ...commentList]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (

    <>
      <CommentForm />
      {commentList && commentList.list.map((cmt, index) => (
        <CommentItem cmt={cmt} key={index} />
      ))}
    </>  
  );
};    
