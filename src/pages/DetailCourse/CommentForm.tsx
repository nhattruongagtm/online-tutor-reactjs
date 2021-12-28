import React, { useContext, useState } from 'react';
import { commentApi } from '../../api/commentApi';
import { CommentContext } from './Comment';
import { Comment } from './CommentItem';

interface CommentFormProps {}

export const CommentForm = (props: CommentFormProps) => {
    const commentUtils = useContext(CommentContext);
    
    const [comment,setComment] = useState<string>('');
    const [isDisplayButton,setIsDisplayButton] = useState<boolean>(false);

    const handleCancelComment = () =>{
        setIsDisplayButton(false);
        setComment('');
    }
    const handleSendComment = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
       if(comment.length > 0){
        const commentItem: Comment = {
            id: Math.floor(Math.random() * 100),
            userID: 1,
            name: 'Nguyễn An Bình',
            courseID: 23,
            content: comment,
            createdDate: new Date(),
            avatar: 'https://ecdn.game4v.com/g4v-content/uploads/2020/09/Black-Panther-1-game4v.jpg',
            like: 0,
        }

        commentUtils.setCommentList(commentItem);
        setComment('');
       }
        
    }
  return (
    <form className="comment__form__main" onSubmit={handleSendComment}>
      <div className="comment__item__avatar">
        <img
          src="https://ecdn.game4v.com/g4v-content/uploads/2020/09/Black-Panther-1-game4v.jpg"
          alt=""
        />
      </div>
      <div className="comment__form">
        <div className="comment__form__boundary">
          <input
            type="text"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            onFocus={()=>setIsDisplayButton(true)}
            placeholder="Nhập bình luận hay thắc mắc của bạn..."
          />
        </div>
        {isDisplayButton && (
            <div className="comment__form__btns">
            <button onClick={handleCancelComment}>
              Hủy
            </button>
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
