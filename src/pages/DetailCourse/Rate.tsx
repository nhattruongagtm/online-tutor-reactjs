import React from 'react';
import { Rate as IRate, RateItem } from './RateItem';
import './rate.scss'
interface RateProps {}
const rateList: IRate[] = [  
  {
    id: 1,
    courseID: 12,
    userID: 1,
    star: 3,
    createdDate: new Date(2021, 2, 25),
    content: 'Khóa học ổn!',
    avatar: 'https://avatarfiles.alphacoders.com/180/180144.jpg',
    name: 'Sủi ma',
  },
  {
    id: 3,
    courseID: 12,
    userID: 1,
    star: 4,
    createdDate: new Date(2021, 9, 25),
    content: 'Giáo viên nhiệt tình!',
    avatar: 'https://kenh14cdn.com/203336854389633024/2021/9/20/5190646820650698202562227858934053028757504n-1632154856430648241898.jpg',
    name: 'Nừng nưa',
  },
  {
    id: 3,
    courseID: 12,
    userID: 1,
    star: 4,
    createdDate: new Date(2021, 2, 2),
    content: 'hơn xịn!',   
    avatar: 'https://kenh14cdn.com/203336854389633024/2021/9/20/5190646820650698202562227858934053028757504n-1632154856430648241898.jpg',
    name: 'Nừng nưa',
  },
];
export const Rate = (props: RateProps) => {
  return (
    <div>
      {rateList &&
        rateList.map((rate, index) => <RateItem rate={rate} key={index} />)}

        <div className="see__more">
            Xem thêm
        </div>
    </div>
  );
};
