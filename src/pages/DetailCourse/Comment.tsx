import React, { useState } from 'react';
import { createContext } from 'react';
import { CommentForm } from './CommentForm';
import { Comment as CommentChild, CommentItem } from './CommentItem';
import './comments.scss';
interface CommentProps {

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

const setCommentList = (comment: CommentChild) : void => {
  console.log(comment);
}


export const CommentContext = createContext({commentList,setCommentList});

export const Comment = (props: CommentProps) => {
  const comments = [
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
    {
      id: 2,
      courseID: 12,
      userID: 2,
      like: 0,
      createdDate: new Date(),
      content: 'Mất bao lâu để tôi hoàn thành hết khóa học này?',
      avatar: 'https://avatarfiles.alphacoders.com/180/180144.jpg',
      name: 'Black Panther',
    },
  ];
  const [commentList, setCommentList] = useState<CommentChild[]>(comments);
  
  const setComments = (comment: CommentChild) => {
      setCommentList([comment,...commentList]);    
  };

  return (
    <CommentContext.Provider value={{commentList,setCommentList : setComments}}>
      <div className="comment__main">
        <div className="comment__main__tab">
          <span>bình luận</span>
          <span>đánh giá</span>
        </div>
        <div className="comment__main__content">
          <CommentForm />
          {commentList.map((cmt,index)=>(
            <CommentItem cmt={cmt} key={index}/>
          ))
          }
        </div>
      </div>
    </CommentContext.Provider>
  );
};
