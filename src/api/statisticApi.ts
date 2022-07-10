import { CircleData } from '../Admin/pages/Home/CircleChart';
import { ResponseData } from '../models/response';
import { IColumnData } from '../models/statistic';
import axiosClient from './axiosClient';
export const statisticApi = {
  getRevenueByDays(
    month: number = new Date().getMonth() + 1,
    year: number = new Date().getFullYear()
  ): Promise<ResponseData<IColumnData[]>> {
    const url = `/revenue/day/${month}-${year}`;
    return axiosClient.get(url);
  },
  getRevenueByWeek(
    month: number = new Date().getMonth() + 1,
    year: number = new Date().getFullYear()
  ): Promise<ResponseData<IColumnData[]>> {
    const url = `/revenue/week/${month}-${year}`;
    return axiosClient.get(url);
  },
  getRevenueByMonth(
    year: number = new Date().getFullYear()
  ): Promise<ResponseData<IColumnData[]>> {
    const url = `/revenue/month/${year}`;
    return axiosClient.get(url);
  },
  getRevenueBySubjectDays(
    month: number = new Date().getMonth() + 1,
    year: number = new Date().getFullYear()
  ): Promise<ResponseData<CircleData[]>> {
    const url = `/revenue/subject/${month}-${year}`;
    return axiosClient.get(url);
  },
};
