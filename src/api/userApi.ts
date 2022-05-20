import { ResponseData } from '../models/response';
import { User } from '../models/user';
import axiosClient from './axiosClient'
export const userApi = {
    getUserByID: (id: number) : Promise<ResponseData<User>> =>{
        const url = `/user/${id}`;
        return axiosClient.get(url);
    }
}