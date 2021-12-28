import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { TUTOR_PATH } from '../../constants/path';
import { TutorItem as Item } from '../Home/TutorItem';

import '../TutorList/style.scss';
import { TutorItem } from './TutorItem';

export default function TutorList() {
  const [isToogleFilter, setIsToogleFilter] = useState<boolean>(false);
  const history = useHistory();

  const tutorList: Item[] = [
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
  ];
  return (
    <div className="waiting__class">
      <div className="waiting__class__bar">
        <div className="class__header">
          <div className="class__header__title">Danh sách gia sư</div>
          <div
            className="class__header__btnAdd"
            onClick={() => setIsToogleFilter(!isToogleFilter)}
          >
            Tìm gia sư
          </div>
        </div>
        <div
          className={
            isToogleFilter
              ? 'class__features__tutor class__features__toogle'
              : 'class__features'
          }
        >
          <input
            type="text"
            placeholder="Tên gia sư"
            className="class__features__tutor__input"
          />
          <select name="city" id="" className="class__features__item">
            <option value="">Tất cả tỉnh/thành</option>
          </select>
          <select name="district" id="" className="class__features__item">
            <option value="">Tất cả quận/huyện</option>
          </select>
          <select name="subject" id="" className="class__features__item">
            <option value="">Chọn môn học</option>
          </select>
          <select name="class" id="" className="class__features__item">
            <option value="">Chọn lớp học</option>
          </select>
          <button>Tìm gia sư</button>
        </div>
      </div>
      <div className="waiting__class__main">
        <div className="class__list__tutor">
          {tutorList.map((tutor, index) => (
            <TutorItem tutor={tutor} key={index}/>
             ))}
        </div>

        <div className="class__pagination">
          <div className="class__pagination__item class__pagination__item--nav">
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className="class__pagination__item">1</div>
          <div className="class__pagination__item">2</div>
          <div className="class__pagination__item class__pagination__item--checked">
            3
          </div>
          <div className="class__pagination__item">...</div>
          <div className="class__pagination__item">10</div>
          <div className="class__pagination__item class__pagination__item--nav">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
