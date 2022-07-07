import { Params, Resp } from './tutorApi';
import { ResponseData } from '../models/response';
import { Subject } from '../models/subject';
import axiosClient from './axiosClient';
import { Grade } from '../models/grade';
export const subjectApi = {
  getAllSubject(params: Params): Promise<ResponseData<Resp<Subject>>> {
    const url = '/subjects';
    return axiosClient.get(url, { params });
  },
  createSubject(params: Subject): Promise<ResponseData<Subject>> {
    const url = '/subject';
    return axiosClient.post(url, params);
  },
  updateSubject(id: number, params: Subject): Promise<ResponseData<Subject>> {
    const url = '/subject/' + id;
    return axiosClient.put(url, { params });
  },
  deleteSubject(id: number): Promise<ResponseData<number>> {
    const url = '/subject/' + id;
    return axiosClient.delete(url);
  },
  getAllGrade():Promise<ResponseData<Grade[]>>{
    const url = "/grade"
    return axiosClient.get(url);
  }
};
