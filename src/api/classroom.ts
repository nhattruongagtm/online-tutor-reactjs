import { ResponseData } from '../models/response';
import { Register } from '../models/classroom';
import axiosClient from './axiosClient';
import { ClassItem } from '../components/WaitingClassList/WaitingClassList';
export const classroomApi = {
  createClass(params: Register): Promise<ResponseData<Register>> {
    const url = '/class';
    return axiosClient.post(url, params);
  },
  getAllWaitingClass(id: number): Promise<ResponseData<ClassItem[]>> {
    const url = '/classes/waiting/' + id;
    return axiosClient.get(url);
  },
  cancelRegister(uid: number, pid: number): Promise<ResponseData<boolean>> {
    const url = `/classes/cancel/user/${uid}/class/${pid}`;
    return axiosClient.post(url);
  },
};
