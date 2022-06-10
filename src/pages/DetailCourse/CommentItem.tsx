import React, { useEffect, useRef, useState } from 'react';
import { createContext } from 'react';
import { commentApi } from '../../api/commentApi';
import { convertDate } from '../../utils/date';
import { CommentForm } from './CommentForm';
import { ReplayItem, Reply } from './ReplyItem';
import { ReplyForm } from './ReplyForm';
import { Params } from '../../api/tutorApi';
import { PHOTO_URL } from '../../constants/auth';
import { UserAuth } from '../../reducers/loginSlice';
import { userApi } from '../../api/userApi';

export interface Comment {
  id: number;
  courseID: number;
  userID: number;
  like: number;
  createdDate: Date;
  content: string;
  avatar: string;
  name: string;
}
interface CommentItemProps {
  cmt: Comment;
}
const replysList: Reply[] = [];

const setReplyList = (comment: Reply): void => {
  console.log(comment);
};

export const ReplyCommentContext = createContext({ replysList, setReplyList });

export const CommentItem = ({ cmt }: CommentItemProps) => {
  const [isDisplayMore, setIsDisplayMore] = useState<boolean>(false);
  const [replyList, setReplysList] = useState<Reply[]>([]);
  const [isReply, setIsReply] = useState<boolean>(false);
  const dateRef = useRef<Date>(new Date());
  const [own, setOwn] = useState<UserAuth>();
  useEffect(() => {
    // get reply comments
    const params: Params = {
      page: 1,
      limit: 5,
    };
    commentApi
      .getReplyByCommentID(cmt.id, params)
      .then((res) => {
        setReplysList(res.data.list);
      })
      .catch((e) => console.log(e));
    userApi
      .getUserByID(cmt.userID)
      .then((res) => {
        setOwn(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleChangeUser = (user: UserAuth) => {
    setOwn(user);
  };

  const setReplyList = (comment: Reply) => {
    commentApi
      .replyComment(comment)
      .then((res) => {
        setReplysList([comment, ...replyList]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onGetDisplayForm = () => {
    setIsReply(true);
  };
  return (
    <ReplyCommentContext.Provider value={{ replysList, setReplyList }}>
      <div className="comment__item">
        <div className="comment__body">
          <div className="comment__item__avatar">
            <img src={cmt.avatar ? cmt.avatar : PHOTO_URL} alt="" />
          </div>
          <div className="comment__item__main">
            <div className="content__item__name">
              <p>{cmt.name}</p>
            </div>
            <div className="content__item__comment">
              <p>{cmt.content}</p>
            </div>
          </div>
          <i className="fas fa-ellipsis-h"></i>
        </div>
        <div className="comment__footer">
          {/* <span>Thích</span> */}
          <span onClick={() => setIsReply(!isReply)}>Trả lời</span>
          <span>{convertDate(dateRef.current, new Date(cmt.createdDate))}</span>
        </div>
        {isReply && (
          <div className="comment__reply__form">
            <ReplyForm cmt={cmt} own={own} />
          </div>
        )}
        {replyList.length > 0 && (
          <div
            className="comment__addition"
            onClick={() => setIsDisplayMore(!isDisplayMore)}
          >
            {isDisplayMore
              ? 'Ẩn câu trả lời'
              : `Xem ${replyList.length} câu trả lời`}{' '}
            {isDisplayMore ? (
              <i className="fas fa-chevron-up"></i>
            ) : (
              <i className="fas fa-chevron-down"></i>
            )}
          </div>
        )}
        {isDisplayMore && (
          <div className="comment__reply">
            {replyList &&
              replyList.map((cm, index) => (
                <ReplayItem
                  cmt={cm}
                  key={index}
                  isDisplay={onGetDisplayForm}
                  onGetOwn={handleChangeUser}
                />
              ))}
          </div>
        )}
      </div>
    </ReplyCommentContext.Provider>
  );
};
