import { ResponseData } from '../models/response';
import { User } from '../models/user';
import { UserAuth } from '../reducers/loginSlice';
import axiosClient from './axiosClient';
export const userApi = {
  getUserByID(id: number): Promise<ResponseData<UserAuth>> {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },
};
  