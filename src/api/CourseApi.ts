import { resolve } from 'dns';
import { ClassItem } from '../components/WaitingClassList/WaitingClassList';
import { Course } from '../models/course';
import { Offer } from '../models/offer';
import { ResponseData } from '../models/response';
import axiosClient from './axiosClient';
import { Params, Resp } from './tutorApi';

export const courseApi = {
  getSubjectList() {
    const url = '';
    return axiosClient.get(url).catch((e) => console.log(e));
  },
  getClassList():Promise<ResponseData<Resp<Course>>> {
    const url = '/classes';
    return axiosClient.get(url);
  },
  getCourseByID(id: number): Promise<ResponseData<ClassItem>> {
    const url = `/post/${id}`;
    return axiosClient.get(url);
  },
  saveCourse(userID: number, courseID: number): Promise<ClassItem> {
    const url = `/cart?postId=${courseID}&accId=${userID}`;

    return axiosClient.post(url);
  },
  getFinishedCoursesByCourseID(id: number | string): Promise<ClassItem[]> {
    return new Promise((resolve, reject) => {
  
      const list: ClassItem[] = [];

      if (list && id === 234) {
        resolve(list);
      } else {
        reject('no courses');
      }
    });
  },
  getWaitingClass(params: Params): Promise<ResponseData<Resp<ClassItem>>> {
    const url = `/post`;
    // ?page=1&limit=10&location=-1&subjectID=-1&formal=-1&search=to

    return axiosClient.get(url, { params });
  },
  getCartList(
    id: number,
    params: Params
  ): Promise<ResponseData<Resp<ClassItem>>> {
    const url = '/carts/' + id;
    return axiosClient.get(url, { params });
  },
  deleteCart(postId: number, accountID: number): Promise<ResponseData<number>> {
    const url = `/cart?postId=${postId}&accId=${accountID}`;
    return axiosClient.delete(url);
  },
  offerPost(userID: number, postID: number, text: string): Promise<ResponseData<Offer>> {
    const url = '/offer';
    const params = {
      post: {
        id: postID,
      },
      account: {
        id: userID,
      },
      content: text,
    };
    return axiosClient.post(url, params);
  },
 
};
