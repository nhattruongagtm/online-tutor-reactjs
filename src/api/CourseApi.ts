import { resolve } from "dns";
import { ClassItem } from "../components/WaitingClassList/WaitingClassList";
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
  getCourseByID(id: string) : Promise<ClassItem>{
    const url = `/khoa-hoc/${id}`;
    // return axiosClient.get(url).catch((e) => console.log(e));
    return new Promise((resolve,reject)=>{
      const data = {
        id: 234,
        name: 'CẦN TÌM GIA SƯ DẠY TIẾNG ANH GIAO TIẾP CHO NGƯỜI ĐI LÀM',
        createdBy: 'Quản trị viên',
        createdDate: '00:54, 26/11/2021',
        views: 1633,
        photo:
          'https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png',
        status: 0,
        topic: 'Giao tiếp căn bản',
        subject: 'Tiếng anh',
        address: 'phường Linh Trung, Thành phố Thủ Đức',
        gender: 0,
        tuition: 1800000,
        fee: 600000,
        formality: 0,
        times: 2,
        learningDate: new Date(),
        offer: 1,
        detail: 'Cần gia sư là Giáo viên chuyên dạy Toán tiếng anh hệ Toán tiếng Anh hệ Cambridge cho bé lớp 4 và lớp 6, yêu cầu có kinh nghiệm và kỹ năng dạy chuyên nghiệp. Dạy',
        schedule: [
          { day: 6, time: 13 },
          { day: 7, time: 9 },
        ],
      }

      if(data){
        resolve(data);
      }
      else{
        reject("error");
      }
    })
  },  
};

