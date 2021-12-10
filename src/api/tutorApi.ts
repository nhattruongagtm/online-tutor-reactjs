import axiosClient from "./axiosClient";
interface Params{
    name_like: string;
    address: string;
    subject: string;
    class: string;
    formality: string;
    _page: number;
    _limit: number;
    _sort: string;
    _order: string;

}
export const tutorApi = {
  getAllWaitingCourse(params: Params) {
    const url = "/courses";

    return axiosClient.get(url, { params }).catch((e) => console.log(e));
  },
};

