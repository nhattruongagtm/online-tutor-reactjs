import React, { useEffect, useRef, useState } from 'react';
import { createContext } from 'react';
import { commentApi } from '../../api/commentApi';
import { convertDate } from '../../utils/date';
import { CommentForm } from './CommentForm';
import { ReplayItem } from './ReplyItem';
import { ReplyForm } from './ReplyForm';

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
const replysList: Comment[] = [
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

const setReplyList = (comment: Comment): void => {
  console.log(comment);
};

export const ReplyCommentContext = createContext({ replysList, setReplyList });

export const CommentItem = ({ cmt }: CommentItemProps) => {
  const [isDisplayMore, setIsDisplayMore] = useState<boolean>(false);
  const [replyList, setReplysList] = useState<Comment[]>(replysList);
  const [isReply, setIsReply] = useState<boolean>(false);
  const dateRef = useRef<Date>(new Date());

  useEffect(() => {
    // get reply comments
    commentApi
      .getReplyByCommentID(1)
      .then((res) => {
        setReplysList(res);
      })
      .catch((e) => console.log(e));
  }, []);

  const setReplyList = (comment: Comment) =>{
      setReplysList([comment,...replyList]);
  }

  return (
    <ReplyCommentContext.Provider value={{replysList,setReplyList}}>
      <div className="comment__item">
        <div className="comment__body">
          <div className="comment__item__avatar">
            <img src={cmt.avatar} alt="" />
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
          <span>Thích</span>
          <span onClick={() => setIsReply(!isReply)}>Trả lời</span>
          <span>{convertDate(dateRef.current,cmt.createdDate)}</span>
        </div>
        {isReply && (
          <div className="comment__reply__form">
            <ReplyForm cmt={cmt} />
          </div>
        )}
        <div
          className="comment__addition"
          onClick={() => setIsDisplayMore(!isDisplayMore)}
        >
          {isDisplayMore ? 'Ẩn câu trả lời' : `Xem ${1} câu trả lời`}{' '}
          {isDisplayMore ? (
            <i className="fas fa-chevron-up"></i>
          ) : (
            <i className="fas fa-chevron-down"></i>
          )}
        </div>
        {isDisplayMore && (
          <div className="comment__reply">
            {replyList &&
              replyList.map((cmt, index) => (
                <ReplayItem cmt={cmt} key={index} />
              ))}
          </div>
        )}
      </div>
    </ReplyCommentContext.Provider>
  );
};
