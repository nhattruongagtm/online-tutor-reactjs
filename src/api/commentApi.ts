import { Comment } from '../pages/DetailCourse/CommentItem';
import { Reply } from '../pages/DetailCourse/ReplyItem';
import { ResponseData } from './authApi';
import axiosClient from './axiosClient';
import { Params, Resp } from './tutorApi';

export const commentApi = {
  getReplyByCommentID(id: number,params: Params): Promise<ResponseData<Resp<Reply>>> {
    const url = "/replies/"+id;
    return axiosClient.get(url,{params});
  },
  replyComment(params: Reply): Promise<ResponseData<Reply>> {
    const url ="/reply";
    return axiosClient.post(url,params);
  },
  getCommentsByPost(
    id: number,
    params: Params   
  ): Promise<ResponseData<Resp<Comment>>> {
    const url = '/comments/' + id;
    return axiosClient.get(url, { params });
  },
  commentPost(params: Comment): Promise<ResponseData<Comment>> {
    const url ="/comment";
    return axiosClient.post(url,params);
  }
};   
  