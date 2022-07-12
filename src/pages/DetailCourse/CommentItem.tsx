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
import { useDispatch, useSelector } from 'react-redux';
import { loadReply } from '../../reducers/detailCourseSlice';
import { RootState } from '../../store';

export interface Comment {
  id: number;
  courseID: number;
  userID: number;
  like: number;
  createdDate: Date;
  content: string;
  avatar: string;
  name: string;
  relies?: Reply[];
}
interface CommentItemProps {
  cmt: Comment;
}
export const CommentItem = ({ cmt }: CommentItemProps) => {
  const [isDisplayMore, setIsDisplayMore] = useState<boolean>(true);
  const [isReply, setIsReply] = useState<boolean>(false);
  const dateRef = useRef<Date>(new Date());
  const [own, setOwn] = useState<UserAuth>();
  const replyList = useSelector(
    (state: RootState) => state.detailCourse.pageInfo.list
  ).find((item) => item.id === cmt.id)?.relies;

  console.log(replyList);
  const dispatch = useDispatch();
  useEffect(() => {
    // get reply comments
    const params: Params = {
      page: 1,
      limit: 5,
    };
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

  const onGetDisplayForm = () => {
    setIsReply(true);
  };
  return (
    <div className="comment__item">
      <div className="comment__body">
        <div className="comment__item__avatar">
          <img
            src={
              cmt.avatar
                ? cmt.avatar
                : `https://avatars.dicebear.com/api/avataaars/${cmt.userID}
              }.jpg`
            }
            alt=""
          />
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
          <ReplyForm cmt={cmt} own={own} onClose={() => setIsReply(false)} />
        </div>
      )}
      {replyList && replyList.length > 0 && (
        <div
          className="comment__addition"
          onClick={() => setIsDisplayMore(!isDisplayMore)}
        >
          {!isDisplayMore
            ? 'Ẩn câu trả lời'
            : `Xem ${replyList.length} câu trả lời`}{' '}
          {!isDisplayMore ? (
            <i className="fas fa-chevron-up"></i>
          ) : (
            <i className="fas fa-chevron-down"></i>
          )}
        </div>
      )}
      <div className={`comment__reply ${isDisplayMore ? 'display' : ''}`}>
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
    </div>
  );
};
