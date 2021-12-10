import axiosClient from "./axiosClient";

export const courseApi = {
  getSubjectList() {
    const url = "";
    return axiosClient.get(url).catch((e) => console.log(e));
  },
  getClassList() {
    const url = "";
    return axiosClient.get(url).catch((e) => console.log(e));
  },
};

