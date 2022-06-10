import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router';
import { commentApi } from '../../api/commentApi';
import useUser from '../../hooks/useUser';
import { CommentContext } from './Comment';
import { Comment } from './CommentItem';
import qs from 'query-string';
import { useDispatch } from 'react-redux';
import { addComment, updatePage } from '../../reducers/detailCourseSlice';
interface CommentFormProps {}

export const CommentForm = (props: CommentFormProps) => {
  const [user] = useUser();
  const dispatch = useDispatch();
  const [comment, setComment] = useState<string>('');
  const [isDisplayButton, setIsDisplayButton] = useState<boolean>(false);

  const path = useLocation().search;

  const params = qs.parse(path);

  const id = params.id as string;

  const handleCancelComment = () => {
    setIsDisplayButton(false);
    setComment('');
  };
  const handleSendComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.length > 0 && user && id) {
      const commentItem: Comment = {
        id: Math.floor(Math.random() * 100),
        userID: user.id,
        name: user.displayName,
        courseID: Number(id),
        content: comment,
        createdDate: new Date(),
        avatar: user.avatar + '',
        like: 0,
      };

      commentApi
        .commentPost(commentItem)
        .then((res) => {
          dispatch(addComment(commentItem));
          // setCommentList([comment, ...commentList]);
          setComment('');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <form className="comment__form__main" onSubmit={handleSendComment}>
      <div className="comment__item__avatar">
        <img src={user ? user.avatar : ''} alt="" />
      </div>
      <div className="comment__form">
        <div className="comment__form__boundary">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onFocus={() => setIsDisplayButton(true)}
            placeholder="Nhập bình luận hay thắc mắc của bạn..."
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
