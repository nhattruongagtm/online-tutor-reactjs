import React, { useState } from 'react';
import { convertDate } from '../../utils/date';
import {Comment} from './CommentItem';
export interface Reply{
  id: number;
  commentID: number;
  courseID: number;
  userID: number;
  like: number;
  createdDate: Date;
  content: string;
  reply?: Comment;
  avatar: string;
  name: string;
  tagName: string;
}

interface ReplyItemProps {
    cmt: Comment;
}

export const ReplayItem = ({cmt}: ReplyItemProps) => {
  return (
    <div className="comment__item comment__reply__item">
      <div className="comment__body">
        <div className="comment__item__avatar">
          <img
            src={cmt.avatar}
            alt=""
          />
        </div>
        <div className="comment__item__main">
          <div className="content__item__name">
            <p>{cmt.name}</p>
          </div>
          <div className="content__item__comment">
           {/* <span>Spider man </span> */}
            <p>{cmt.content}</p>
          </div>
        </div>
      </div>
      <div className="comment__footer">
        <span>Thích</span>
        <span>Trả lời</span>
        <span>{convertDate(cmt.createdDate)}</span>
      </div>
    </div>
  );
};
