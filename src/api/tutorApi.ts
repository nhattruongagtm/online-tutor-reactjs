import { resolve } from 'dns';
import { TutorItem } from '../components/Home/TutorItem';
import axiosClient from './axiosClient';
export interface Params {
  name_like?: string;
  address?: string;
  subject?: string;
  class?: string;
  formality?: string;
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: string;
}
export interface Resp<T>{
  totalRows: number;
  data: T[],
}
export const tutorApi = {
  getAllWaitingCourse(params: Params) {
    const url = '/courses';

    return axiosClient.get(url, { params }).catch((e) => console.log(e));
  },
  getTutorByID(id: number): Promise<TutorItem> {
    const url = `gia-su/${id}`;
    // return axiosClient.get(url).catch(e=>console.log(e));
    return new Promise((resovle, reject) => {
      const data = {
        avatar:
          'https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg',
        name: 'Nguyễn An Nhiên',
        education: 'Sinh viên',
        experience: 'Sinh viên Đại học kinh tế Tp. HCM',
        subject: ['Toán học', 'Vật lí'],
        address: 'Quận 10, Tp. HCM',
        rate: 4,
        description: '',
        createdDate: new Date(),
        id: 1,
      };
      if (data) {
        resovle(data);
      } else {
        reject('error');
      }
    });
  },
  getAllTutor(params: Params): Resp<TutorItem> {
      const tutorList: TutorItem[] = [
        {
          avatar:
            'https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg',
          name: 'Nguyễn Đô Ra Ê Môn',
          education: 'Sinh viên',
          experience:
            'Sinh viên Học viện Hàng không Việt Nam Chuyên ngành Kỹ thuật hàng không',
          subject: ['Toán học', 'Tiếng Anh', 'Vật lí'],
          address: 'Quận 9, Tp. Thủ Đức, Tp. HCM',
          rate: 4,
          description: '',
          createdDate: new Date(),
          id: 1,
        },
        {
          avatar:
            'https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg',
          name: 'Nguyễn Đô La',
          education: 'Sinh viên',
          experience: 'Sinh viên Học viện tài chính HN',
          subject: [
            'Toán học',
            'Vật lí',
            'Toán học',
            'Vật lí',
            'Toán học',
            'Vật lí',
          ],
          address: 'Phường A, Quận Cầu Giấy, Tp. Hà Nội',
          rate: 4,
          description: '',
          createdDate: new Date(),
          id: 6,
        },
        {
          avatar:
            'https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg',
          name: 'Nguyễn Tiến Đồng',
          education: 'Sinh viên',
          experience: 'Sinh viên Đại học kinh tế Tp. HCM',
          subject: ['Toán học', 'Vật lí'],
          address: 'Quận 3, Tp. HCM',
          rate: 4,
          description: '',
          createdDate: new Date(),
          id: 3,
        },
        {
          avatar:
            'https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg',
          name: 'Nguyễn An Nhiên',
          education: 'Sinh viên',
          experience: 'Sinh viên Đại học kinh tế Tp. HCM',
          subject: ['Toán học', 'Vật lí'],
          address: 'Quận 10, Tp. HCM',
          rate: 4,
          description: '',
          createdDate: new Date(),
          id: 4,
        },
        {
          avatar:
            'https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg',
          name: 'Nguyễn An Nhiên',
          education: 'Sinh viên',
          experience: 'Sinh viên Đại học kinh tế Tp. HCM',
          subject: ['Toán học', 'Vật lí'],
          address: 'Quận 10, Tp. HCM',
          rate: 4,
          description: '',
          createdDate: new Date(),
          id: 5,
        },
        {
          avatar:
            'https://thuthuatnhanh.com/wp-content/uploads/2020/09/anh-avatar-doremon-chat-ngau-nhat.jpg',
          name: 'Nguyễn An Nhiên',
          education: 'Sinh viên',
          experience: 'Sinh viên Đại học kinh tế Tp. HCM',
          subject: ['Toán học', 'Vật lí'],
          address: 'Quận 10, Tp. HCM',
          rate: 4,
          description: '',
          createdDate: new Date(),
          id: 6,
        },
      ];

      const resp = {
        totalRows: tutorList.length,
        data: params._page === 1 ? tutorList.splice(Math.floor(tutorList.length/2),tutorList.length-Math.floor(tutorList.length/2)) : tutorList,
      };

      return resp;
  },
};
