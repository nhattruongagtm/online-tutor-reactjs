import { resolve } from 'dns';
import { ClassItem } from '../components/WaitingClassList/WaitingClassList';
import { ResponseData } from '../models/response';
import axiosClient from './axiosClient';
import { Params, Resp } from './tutorApi';

export const courseApi = {
  getSubjectList() {
    const url = '';
    return axiosClient.get(url).catch((e) => console.log(e));
  },
  getClassList() {
    const url = '';
    return axiosClient.get(url).catch((e) => console.log(e));
  },
  getCourseByID(id: number): Promise<ResponseData<ClassItem>> {
    const url = `/post/${id}`;
    return axiosClient.get(url);
  
  },
  // saveCourse(userID: number, courseID: number): Promise<ClassItem> {
  //   const url = '';

  //   // return axiosClient.post(url,{userID,courseID});
  //   return this.getCourseByID(234);
  // },
  getAllSavedCourse(
    userID: number,
    params: Params | null
  ): Promise<ClassItem[]> {
    const url = `courses/${userID}`;

    // return axiosClient.get(url);

    return new Promise((resolve, reject) => {
      const list: ClassItem[] = [
        // {
        //   id: 2364,
        //   name: 'CẦN TÌM GIA SƯ DẠY TIẾNG ANH GIAO TIẾP CHO NGƯỜI ĐI LÀM',
        //   createdBy: 'Quản trị viên',
        //   createdDate: '00:54, 26/11/2021',
        //   views: 1633,
        //   photo:
        //     'https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png',
        //   status: 0,
        //   topic: 'Giao tiếp căn bản',
        //   subject: 'Tiếng anh',
        //   address: 'phường Linh Trung, Thành phố Thủ Đức',
        //   gender: 0,
        //   tuition: 1800000,
        //   fee: 600000,
        //   formality: 0,
        //   times: 2,
        //   learningDate: new Date(),
        //   offer: 1,
        //   detail: 'Cần gia sư là Giáo viên chuyên dạy Toán tiếng anh hệ Toán tiếng Anh hệ Cambridge cho bé lớp 4 và lớp 6, yêu cầu có kinh nghiệm và kỹ năng dạy chuyên nghiệp. Dạy',
        //   schedule: [
        //     { day: 6, time: 13 },
        //     { day: 7, time: 9 },
        //   ],
        // },
        // {
        //   id: 234,
        //   title: 'CẦN TÌM GIA SƯ DẠY TOÁN',
        //   createdBy: 'Nguyễn Văn A',
        //   createdDate: '00:54, 26/11/2021',
        //   views: 4897,
        //   photo:
        //     'https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png',
        //   status: 0,
        //   topic: 'Toán nâng cao',
        //   subject: 'Toán',
        //   address: 'phường Linh Đông, Thành phố Thủ Đức',
        //   gender: 0,
        //   tuition: 1800000,
        //   fee: 600000,
        //   formality: 0,
        //   times: 2,
        //   learningDate: new Date(),
        //   offer: 1,
        //   detail:
        //     'Cần gia sư là Giáo viên chuyên dạy Toán tiếng anh hệ Toán tiếng Anh hệ Cambridge cho bé lớp 4 và lớp 6, yêu cầu có kinh nghiệm và kỹ năng dạy chuyên nghiệp. Dạy',
        //   schedule: [
        //     { day: 6, time: 13 },
        //     { day: 7, time: 9 },
        //   ],
        // },
        // {
        //   id: 156,
        //   title: 'CẦN TÌM GIA SƯ DẠY TOÁN',
        //   createdBy: 'Nguyễn Văn A',
        //   createdDate: '00:54, 26/11/2021',
        //   views: 4897,
        //   photo:
        //     'https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png',
        //   status: 0,
        //   topic: 'Toán nâng cao',
        //   subject: 'Toán',
        //   address: 'phường Linh Đông, Thành phố Thủ Đức',
        //   gender: 0,
        //   tuition: 1800000,
        //   fee: 600000,
        //   formality: 0,
        //   times: 2,
        //   learningDate: new Date(),
        //   offer: 1,
        //   detail:
        //     'Cần gia sư là Giáo viên chuyên dạy Toán tiếng anh hệ Toán tiếng Anh hệ Cambridge cho bé lớp 4 và lớp 6, yêu cầu có kinh nghiệm và kỹ năng dạy chuyên nghiệp. Dạy',
        //   schedule: [
        //     { day: 6, time: 13 },
        //     { day: 7, time: 9 },
        //   ],
        // },
      ];
      if (list) {
        if (params) {
          const rs = params.page === 1 ? list : list.slice(0, 1);
          resolve(rs);
        } else {
          resolve(list);
        }
      } else {
        reject('error to load saved courses');
      }
    });
  },
  getFinishedCoursesByCourseID(id: number): Promise<ClassItem[]> {
    return new Promise((resolve, reject) => {
      // const list = [
      //   // {
      //   //   id: 2364,
      //   //   name: 'CẦN TÌM GIA SƯ DẠY TIẾNG ANH GIAO TIẾP CHO NGƯỜI ĐI LÀM',
      //   //   createdBy: 'Quản trị viên',
      //   //   createdDate: '00:54, 26/11/2021',
      //   //   views: 1633,
      //   //   photo:
      //   //     'https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png',
      //   //   status: 0,
      //   //   topic: 'Giao tiếp căn bản',
      //   //   subject: 'Tiếng anh',
      //   //   address: 'phường Linh Trung, Thành phố Thủ Đức',
      //   //   gender: 0,
      //   //   tuition: 1800000,
      //   //   fee: 600000,
      //   //   formality: 0,
      //   //   times: 2,
      //   //   learningDate: new Date(),
      //   //   offer: 1,
      //   //   detail: 'Cần gia sư là Giáo viên chuyên dạy Toán tiếng anh hệ Toán tiếng Anh hệ Cambridge cho bé lớp 4 và lớp 6, yêu cầu có kinh nghiệm và kỹ năng dạy chuyên nghiệp. Dạy',
      //   //   schedule: [
      //   //     { day: 6, time: 13 },
      //   //     { day: 7, time: 9 },
      //   //   ],
      //   // },
      //   {
      //     id: 234,
      //     title: 'CẦN TÌM GIA SƯ DẠY TOÁN',
      //     createdBy: 'Quản trị viên',
      //     createdDate: '00:54, 26/11/2021',
      //     views: 4897,
      //     photo:
      //       'https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png',
      //     status: 0,
      //     topic: 'Toán nâng cao',
      //     subject: 'Toán',
      //     address: 'phường Linh Đông, Thành phố Thủ Đức',
      //     gender: 0,
      //     tuition: 2500000,
      //     fee: 750000,
      //     formality: 0,
      //     times: 2,
      //     learningDate: new Date(),
      //     offer: 1,
      //     detail:
      //       'Cần gia sư là Giáo viên chuyên dạy Toán tiếng anh hệ Toán tiếng Anh hệ Cambridge cho bé lớp 4 và lớp 6, yêu cầu có kinh nghiệm và kỹ năng dạy chuyên nghiệp. Dạy',
      //     schedule: [
      //       { day: 6, time: 13 },
      //       { day: 7, time: 9 },
      //     ],
      //   },
      //   {
      //     id: 1466,
      //     title: 'CẦN TÌM GIA SƯ DẠY TOÁN',
      //     createdBy: 'Nguyễn Văn A',
      //     createdDate: '00:54, 26/11/2021',
      //     views: 4897,
      //     photo:
      //       'https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png',
      //     status: 0,
      //     topic: 'Toán nâng cao',
      //     subject: 'Toán',
      //     address: 'phường Linh Đông, Thành phố Thủ Đức',
      //     gender: 0,
      //     tuition: 1800000,
      //     fee: 600000,
      //     formality: 0,
      //     times: 2,
      //     learningDate: new Date(),
      //     offer: 1,
      //     detail:
      //       'Cần gia sư là Giáo viên chuyên dạy Toán tiếng anh hệ Toán tiếng Anh hệ Cambridge cho bé lớp 4 và lớp 6, yêu cầu có kinh nghiệm và kỹ năng dạy chuyên nghiệp. Dạy',
      //     schedule: [
      //       { day: 6, time: 13 },
      //       { day: 7, time: 9 },
      //     ],
      //   },
      // ];

      const list:ClassItem[] = []

      if (list && id === 234) {
        resolve(list);
      } else {
        reject('no courses');
      }  
    });
  },
  getWaitingClass(params: Params): Promise<ResponseData<Resp<ClassItem>>> {
    // const dataFromApi: ClassItem[] = [
    //   {
    //     id: 123,
    //     name: 'CẦN TÌM GIA SƯ DẠY TIẾNG ANH GIAO TIẾP CHO NGƯỜI ĐI LÀM',
    //     createdBy: 'Quản trị viên',
    //     createdDate: '00:54, 26/11/2021',
    //     views: 1633,
    //     photo:
    //       'https://img.vn/uploads/version/img24-png-20190726133727cbvncjKzsQ.png',
    //     status: 0,
    //     topic: 'Giao tiếp căn bản',
    //     subject: 'Tiếng anh',
    //     address: 'phường Linh Trung, Thành phố Thủ Đức',
    //     gender: 0,
    //     tuition: 1800000,
    //     fee: 600000,
    //     formality: 0,
    //     times: 2,
    //     learningDate: new Date(),
    //     offer: 1,
    //     detail:
    //       'Cần gia sư là Giáo viên chuyên dạy Toán tiếng anh hệ Toán tiếng Anh hệ Cambridge cho bé lớp 4 và lớp 6, yêu cầu có kinh nghiệm và kỹ năng dạy chuyên nghiệp. Dạy',
    //     schedule: [
    //       { day: 6, time: 13 },
    //       { day: 7, time: 9 },
    //     ],
    //   },

    // ];
    // const resp = {
    //   totalRows: dataFromApi.length,
    //   data:dataFromApi
    // };
    const url = `/post`;
    // ?page=1&limit=10&location=-1&subjectID=-1&formal=-1&search=to

    return axiosClient.get(url, { params });
  },
};
