import { Comment } from '../pages/DetailCourse/CommentItem';

export const commentApi = {
  getReplyByCommentID(id: number): Promise<Comment[]> {
    return new Promise((resolve, reject) => {
      const replyList: Comment[] = [
        {
          id: id,
          userID: 1,
          courseID: 32,
          avatar:
            'https://gamek.mediacdn.vn/133514250583805952/2020/12/3/tom-cruise-as-iron-man-16069884478962098850192.jpg',
          content: 'không em ơi!',
          createdDate: new Date(),
          like: 5,
          name: 'Bùi Anh Tuấn',
          
        },
        {
          id: id,
          userID: 1,
          courseID: 32,
          avatar:
            'https://gamek.mediacdn.vn/133514250583805952/2020/12/3/tom-cruise-as-iron-man-16069884478962098850192.jpg',
          content: 'Em không follow mà em đòi xin in4 của anh, anh không cho đâu!!😅😅',
          createdDate: new Date(),
          like: 5,
          name: 'Bùi Anh Tuấn',
        
        },
      ];
      if (replyList) {
        resolve(replyList);
      } else {
        reject('error');
      }
    });
  },
};
