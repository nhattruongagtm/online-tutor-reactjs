import { TutorItem } from '../components/Home/TutorItem';
import axiosClient from './axiosClient';
import { ResponseData } from '../models/response';
export interface Params {
  search?: string;
  location?: number;
  subjectID?: number;
  class?: string;
  formality?: number;
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  city?: number;
  district?: string;
}
export interface Resp<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  list: T[];
}
export const tutorApi = {
  getAllWaitingCourse(params: Params) {
    const url = '/courses';

    return axiosClient.get(url, { params }).catch((e) => console.log(e));
  },
  getTutorByID(id: number): Promise<ResponseData<TutorItem>> {
    const url = '/tutor/' + id;
    return axiosClient.get(url);
  },
  getAllTutor(params: Params): Promise<ResponseData<Resp<TutorItem>>> {
    const url = '/tutors';
    return axiosClient.get(url, { params });
  },
};
