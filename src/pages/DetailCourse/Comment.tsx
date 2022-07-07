import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentApi } from '../../api/commentApi';
import { Params } from '../../api/tutorApi';
import { CommentForm } from './CommentForm';
import { Comment as CommentChild, CommentItem } from './CommentItem';
import './comments.scss';
import { loadReply, PageItem } from '../../reducers/detailCourseSlice';
import { updatePage } from '../../reducers/detailCourseSlice';
import { RootState } from '../../store';
import { Button } from 'antd';
interface CommentProps {
  id: number;
}

export const Comment = ({ id }: CommentProps) => {
  const dispatch = useDispatch();
  const commentList = useSelector(
    (state: RootState) => state.detailCourse.pageInfo
  );

  useEffect(() => {
    const params: Params = {
      page: 1,
      limit: 5,
    };

    const loadList = async () => {
      const cmts = await commentApi.getCommentsByPost(id, params);
      const { data } = cmts;
      const { currentPage, list, totalItems, totalPages } = data;
      const initialPage: PageItem = {
        id,
        currentPage,
        list,
        totalItems,
        totalPages,
      };
      for (let i = 0; i < list.length; i++) {
        const l = await commentApi.getReplyByCommentID(list[i].id, params);
        const { data } = l;
        const { currentPage, list: replyList, totalItems, totalPages } = data;
        list[i].relies = [...replyList];
      }
      dispatch(updatePage(initialPage));
    };

    loadList();
  }, []);

  const handleMore = async () => {
    const { currentPage: current, totalPages } = commentList;
    if (current < totalPages) {
      const params: Params = {
        page: current + 1,
        limit: 5,
      };
      console.log(params.page);
      const cmts = await commentApi.getCommentsByPost(Number(id), params);
      const { data } = cmts;
      const { currentPage, list, totalItems, totalPages } = data;

      dispatch(
        updatePage({
          ...commentList,
          currentPage,
          totalItems,
          totalPages,
          list: [...list, ...commentList.list],
        })
      );
    }
  };

  return (
    <>
      <CommentForm />
      {commentList &&
        commentList.list.map((cmt, index) => (
          <CommentItem cmt={cmt} key={index} />
        ))}
      {commentList.currentPage < commentList.totalPages && (
        <div className="load__more">
          <Button onClick={handleMore}>Xem thêm</Button>
        </div>
      )}
    </>
  );
};
