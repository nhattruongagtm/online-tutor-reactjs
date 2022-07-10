import { ResponseData } from '../models/response';
import { AdditionalInfo, User } from '../models/user';
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
  getMyClasses(userID: number): Promise<ResponseData<Account>> {
    const url = '/student/' + userID;
    return axiosClient.get(url);
  },
  getAllStudent(params: Params): Promise<ResponseData<Resp<UserAuth>>> {
    const url = '/account/students';
    return axiosClient.get(url, { params });
  },
  getAllTutor(params: Params): Promise<ResponseData<Resp<UserAuth>>> {
    const url = '/account/tutors';
    return axiosClient.get(url, { params });
  },
  createAdditionalInfo(
    params: AdditionalInfo
  ): Promise<ResponseData<AdditionalInfo>> {
    const url = '/info';
    return axiosClient.post(url, params);
  },
  updateAdditionalInfo(
    id: number,
    params: AdditionalInfo
  ): Promise<ResponseData<AdditionalInfo>> {
    const url = '/info/' + id;
    return axiosClient.put(url, params);
  },
  getAdditionalInfo(id: number): Promise<ResponseData<AdditionalInfo>> {
    const url = '/info/' + id;
    return axiosClient.post(url);
  },
};
