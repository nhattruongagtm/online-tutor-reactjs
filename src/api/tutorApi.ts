import { TutorItem } from '../components/Home/TutorItem';
import axiosClient from './axiosClient';
interface Params {
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
    const url = '/courses';

    return axiosClient.get(url, { params }).catch((e) => console.log(e));
  },
  getTutorByID(id: string): Promise<TutorItem> {
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
      if(data){
        resovle(data);
      }
      else{
        reject('error');
      }
    });
  },
};
