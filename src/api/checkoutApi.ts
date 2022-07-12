import {
    CheckoutReq, CheckoutResp, CheckoutSuccess,
    ResponseData
} from '../models/response';
import axiosClient from './axiosClient';
export const checkoutApi = {
  checkout(params: CheckoutReq): Promise<ResponseData<string>> {
    const url = '/pay';
    return axiosClient.post(url, params);
  },
  checkoutSuccess(params: CheckoutSuccess): Promise<ResponseData<string>> {
    const url = '/pay/success';
    return axiosClient.get(url, { params });
  },
  cancelCheckout(): Promise<ResponseData<string>> {
    const url = '/pay/cancel';
    return axiosClient.get(url);
  },
  getDetailCheckout(id: number): Promise<ResponseData<CheckoutResp>> {
    const url = '/checkout/'+id;
    return axiosClient.get(url);
  },
};
