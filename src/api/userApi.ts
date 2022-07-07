import { ResponseData } from '../models/response';
import { User } from '../models/user';
import { UserAuth } from '../reducers/loginSlice';
import axiosClient from './axiosClient';
import { ClassItem } from '../components/WaitingClassList/WaitingClassList';
import { Account } from '../models/account';
import axios from 'axios';
import { Params, Resp } from './tutorApi';
export const userApi = {
  getUserByID(id: number): Promise<ResponseData<UserAuth>> {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },
  updateProfile(id: number, params: UserAuth): Promise<ResponseData<UserAuth>> {
    const url = '/account/' + id;
    return axiosClient.put(url, params);
  },
  getMyClasses(userID: number):Promise<ResponseData<Account>>{
    const url = "/student/"+userID
    return axiosClient.get(url);
  },  
  getAllStudent(params: Params): Promise<ResponseData<Resp<UserAuth>>>{
    const url = "/account/students"  
    return axiosClient.get(url,{params})
  },
  getAllTutor(params: Params): Promise<ResponseData<Resp<UserAuth>>>{
    const url = "/account/tutors"  
    return axiosClient.get(url,{params})
  }
};
