import { Comment } from '../pages/DetailCourse/CommentItem';
import { Reply } from '../pages/DetailCourse/ReplyItem';
import { Rate } from '../reducers/rateSlice';
import { ResponseData } from './authApi';
import axiosClient from './axiosClient';
import { Params, Resp } from './tutorApi';

export const commentApi = {
  getReplyByCommentID(
    id: number,
    params: Params
  ): Promise<ResponseData<Resp<Reply>>> {
    const url = '/replies/' + id;
    return axiosClient.get(url, { params });
  },
  replyComment(params: Reply): Promise<ResponseData<Reply>> {
    const url = '/reply';
    return axiosClient.post(url, params);
  },
  getCommentsByPost(
    id: number,
    params: Params
  ): Promise<ResponseData<Resp<Comment>>> {
    const url = '/comments/' + id;
    return axiosClient.get(url, { params });
  },
  commentPost(params: Comment): Promise<ResponseData<Comment>> {
    const url = '/comment';
    return axiosClient.post(url, params);
  },
  getAllRate(id: number, params: Params): Promise<ResponseData<Resp<Rate>>> {
    const url = '/rates/' + id;
    return axiosClient.get(url, { params });
  },
  rateForCourse(params: Rate): Promise<ResponseData<Rate>> {
    const url = '/rate';
    return axiosClient.post(url, params);
  },
  checkRatePermission(uid: number,pid: number): Promise<ResponseData<boolean>>{
    const url = `/rate/user/${uid}/class/${pid}`
    return axiosClient.get(url);
  }
};
