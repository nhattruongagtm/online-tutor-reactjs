import { ResponseData } from '../models/response';
import { Classroom, Register } from '../models/classroom';
import axiosClient from './axiosClient';
import { ClassItem } from '../components/WaitingClassList/WaitingClassList';
export const classroomApi = {
  createClass(id: number,params: Register): Promise<ResponseData<Classroom>> {
    const url = '/class/'+id;
    return axiosClient.post(url, params);
  },
  getAllWaitingClass(id: number): Promise<ResponseData<Classroom[]>> {
    const url = '/classes/waiting/' + id;
    return axiosClient.get(url);
  },
  cancelRegister(uid: number, pid: number): Promise<ResponseData<boolean>> {
    const url = `/classes/cancel/user/${uid}/class/${pid}`;
    return axiosClient.post(url);
  },
};
