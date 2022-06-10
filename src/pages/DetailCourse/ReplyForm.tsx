import React, { useContext, useState } from 'react';
import { commentApi } from '../../api/commentApi';
import useUser from '../../hooks/useUser';
import { CommentContext } from './Comment';
import { Comment, ReplyCommentContext } from './CommentItem';
import { Reply } from './ReplyItem';
import { UserAuth } from '../../reducers/loginSlice';
import { PHOTO_URL } from '../../constants/auth';
interface ReplyFormProps {
  cmt: Comment;
  own: UserAuth | undefined;
}

export const ReplyForm = ({ cmt, own }: ReplyFormProps) => {
  const commentUtils = useContext(ReplyCommentContext);
  const [user] = useUser();
  const [comment, setComment] = useState<string>('');
  const [isDisplayButton, setIsDisplayButton] = useState<boolean>(false);

  const handleCancelComment = () => {
    setIsDisplayButton(false);
    setComment('');
  };

  const handleSendComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.length > 0 && user) {
      const commentItem: Reply = {
        id: Math.floor(Math.random() * 100),
        commentID: cmt.id,
        userID: user.id,
        name: user.displayName,
        courseID: cmt.courseID,
        content: comment,
        createdDate: new Date(),
        avatar: user.avatar + '',
        like: 0,
        ownID: 1,
      };

      commentUtils.setReplyList(commentItem);
      setComment('');
    }
  };
  return (
    <form className="comment__form__main" onSubmit={handleSendComment}>
      <div className="comment__item__avatar">
        <img src={own && own.avatar ? own.avatar : PHOTO_URL} alt="" />
      </div>
      <div className="comment__form">
        <div className="comment__form__boundary">
          {/* <p className="tag__name">{own?.displayName}</p> */}
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onFocus={() => setIsDisplayButton(true)}
            placeholder={`Trả lời bình luận của ${own?.displayName}...`}
          />
        </div>
        {isDisplayButton && (
          <div className="comment__form__btns">
            <button onClick={handleCancelComment}>Hủy</button>
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
