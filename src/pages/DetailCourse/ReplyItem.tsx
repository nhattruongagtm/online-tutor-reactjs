import React, { useEffect, useRef, useState } from 'react';
import { convertDate } from '../../utils/date';
import { Comment } from './CommentItem';
import { PHOTO_URL } from '../../constants/auth';
import { UserAuth } from '../../reducers/loginSlice';
import { userApi } from '../../api/userApi';
export interface Reply {
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
  ownID: number;
}

interface ReplyItemProps {
  cmt: Reply;
  isDisplay: () => void;
  onGetOwn: (user: UserAuth) => void;
}

export const ReplayItem = ({ cmt, isDisplay, onGetOwn }: ReplyItemProps) => {
  const dateRef = useRef<Date>(new Date());
  const [own, setOwn] = useState<UserAuth>();
  useEffect(() => {
    userApi
      .getUserByID(cmt.userID)
      .then((res) => {
        onGetOwn(res.data);
        setOwn(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      {own && (
        <div className="comment__item comment__reply__item">
          <div className="comment__body">
            <div className="comment__item__avatar">
              <img src={own && own.avatar ? own.avatar : `https://avatars.dicebear.com/api/avataaars/${own.id}
              }.jpg`} alt="" />
            </div>
            <div className="comment__item__main">
              <div className="content__item__name">
                <p>{own?.displayName}</p>
              </div>
              <div className="content__item__comment">
                {/* <span>Spider man </span> */}
                <p>{cmt.content}</p>
              </div>
            </div>
          </div>
          <div className="comment__footer">
            {/* <span>Thích</span> */}
            <span
              onClick={() => {
                isDisplay();
                onGetOwn(own);
              }}
            >
              Trả lời
            </span>
            <span>
              {convertDate(dateRef.current, new Date(cmt.createdDate))}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
