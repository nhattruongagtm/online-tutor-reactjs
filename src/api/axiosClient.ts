import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TOKEN } from '../constants/auth';
import { LoginResp } from '../models/user';

const token = localStorage.getItem(TOKEN)
  ? (JSON.parse(localStorage.getItem(TOKEN) as string) as LoginResp)
  : { access_token: '' };

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token.access_token,
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response): AxiosResponse {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
