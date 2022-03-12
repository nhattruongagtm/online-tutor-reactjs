import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import '../Home/recommend.scss';
import { tutorApi } from '../../api/tutorApi';
import { TutorItem as Item } from './TutorItem';
import { TutorItem } from '../TutorList/TutorItem';
export const galaxy = '#e3fff9';
const RecommendedMain = styled.div`
  margin-top: 10px !important;
  /* height: 450px; */
  margin-bottom: 100px;
  align-items: center !important;
  /* gap: 20px!important; */
  /* background-color: blue; */

  /* background-color: blueviolet; */
`;

const RecommendTilte = styled.div`
  margin-top: 100px;
  font-size: 32px;
  text-align: center;
  font-weight: 700;
`;

export default function RecommendedList() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    // slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: 'linear',
  };
  const recommendList: Item[] = [
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
      id: 1,
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
      id: 1,
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
      id: 1,
    },
  ];
  return (
    <div id="recommend" className="recommend">
      <RecommendTilte>Gợi ý gia sư cho bạn</RecommendTilte>
      <RecommendedMain>
        <div className="waiting__class__main">
          <div className="class__list__tutor">
            {/* <Slider {...settings} className="carousel_recommend"> */}
            {recommendList.map((tutor, index) => (
              <TutorItem tutor={tutor} key={index} />
            ))}
          </div>
        </div>
        {/* </Slider> */}
      </RecommendedMain>
    </div>
  );
}
