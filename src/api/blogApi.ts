import { Blog } from '../models/blog';
import { ResponseData } from '../models/response';
import axiosClient from './axiosClient';
import { Params, Resp } from './tutorApi';
export const blogApi = {
  createBlog(params: Blog): Promise<ResponseData<Blog>> {
    const url = '/blog';
    return axiosClient.post(url, params);
  },
  getAllBlogs(params: Params): Promise<ResponseData<Resp<Blog>>> {
    const url = '/blogs';
    return axiosClient.get(url, { params });
  },
  updateBlog(id: number, params: Blog): Promise<ResponseData<Blog>> {
    const url = '/blog/' + id;
    return axiosClient.put(url, params);
  },
  deleteBlog(id: number): Promise<ResponseData<Blog>> {
    const url = '/blog/' + id;
    return axiosClient.delete(url);
  },
  getDetailBlog(id: number): Promise<ResponseData<Blog>> {
    const url = '/blog/' + id;
    return axiosClient.get(url);
  },
};
