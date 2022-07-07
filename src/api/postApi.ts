import { Post } from "../components/FindTutorList/FindTutorList";
import { ClassItem } from "../components/WaitingClassList/WaitingClassList";
import { ResponseData } from "../models/response";
import axiosClient from "./axiosClient";
import { Params, Resp } from "./tutorApi";

export const postApi = {
    createPost(params: Post): Promise<ResponseData<Post>>{
        const url = '/post'
        return axiosClient.post(url,params)
    },
    getPostByUserId(id: number,params: Params): Promise<ResponseData<Resp<ClassItem>>>{
        const url = "/posts/"+id;
        return axiosClient.get(url,{params});
    },
    getOffers(id: number): Promise<ResponseData<any>>{
        const url = "/offers/"+  id;
        return axiosClient.get(url);
    }
}