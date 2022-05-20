import Dialog from '@mui/material/Dialog';
import React, { useEffect, useState } from 'react';
import { ChangePassword } from './ChangePassword';
import { ProfileForm } from './ProfileForm';
import './profileInfo2.scss';
import ProfileRegister, { createData } from './ProfileRegister';
import { User } from '../../../models/user';
import useUser from '../../../hooks/useUser';
import { userApi } from '../../../api/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { loadUserInfo, UserProfile } from '../../../reducers/profileSlice';
const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function ProfileInfo2() {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>();
  const [open, setOpen] = React.useState(false);
  const [user] = useUser();
  const userInfo = useSelector((state: RootState) => state.profile.userInfo);

  useEffect(() => {
    user &&
      userApi
        .getUserByID(user.id)
        .then((res) => {
          console.log(res.data)   
          dispatch(loadUserInfo(res.data as UserProfile));
        })
        .catch((e) => {
          console.log(e);
        });
  }, [user]);  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditProfile = () => {
    // setIsEdit(!isEdit);
    handleClickOpen();
  };
  return (
    <div className="profile">
      <div className="profile__base">
        <div className="profile__base__title">
          <p>Thông tin cơ bản</p>
        </div>
        <div className="profile__base__body">
          <div className="profile__base__body__avatar">
            <img
              src="https://i.pinimg.com/originals/5f/12/21/5f12212ed4d94b0dafe0f18a8e55832b.jpg"
              alt=""
            />
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Họ tên: </div>
            <input
              type="text"
              placeholder="Nhập họ tên..."
              value={userInfo.displayName}
              disabled={!isEdit}
            />
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Email: </div>
            <input
              type="email"
              placeholder="Nhập email..."
              value={userInfo.email}
              disabled={!isEdit}
            />
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Sô điện thoại: </div>
            <input
              type="number"
              placeholder="Nhập số điện thoại..."
              value={userInfo.phone}
              disabled={!isEdit}
            />
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Tỉnh/thành phố: </div>
            <select disabled={!isEdit}>
              <option value="la">Long An</option>
            </select>
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Quận/huyện: </div>
            <select disabled={!isEdit}>
              <option value="hcm">Quận 1</option>
              <option value="la">Tp Thủ Đức</option>
            </select>
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Giới tính: </div>
            <select disabled={!isEdit}>
              <option value={0}>{userInfo.gender === 0 ? 'Nam' : 'Nữ'}</option>
            </select>
          </div>
          <div className="profile__base__footer">
            <button onClick={handleEditProfile}>
              {isEdit ? 'Lưu thông tin' : 'Cập nhật'}
            </button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="profile__change__info"
            >
              <ProfileForm onCloseForm={handleClose} info={userInfo}/>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="profile__more">
        <div className="profile__more__register">
          <div className="profile__base__title profile__register">
            <p>Danh sách bày đăng</p>
          </div>
          <div className="profile__more__register__body">
            <ProfileRegister rows={rows} height={240} />
          </div>
        </div>
        <div className="profile__more__change">
          <div className="profile__base__title profile__register">
            <p>Thông tin thêm</p>
          </div>
          <div className="profile__more__change__body">
            <div className="profile__change">
              <div className="profile__introduce">
                <div className="profile__introduce__title">Giới thiệu</div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat inventore doloremque repellendus impedit autem
                  laudantium omnis eius. Dolorum illo obcaecati architecto
                  aliquid similique aliquam, nam iste ad omnis facilis itaque!
                </p>
              </div>
              <div className="profile__detail">
                <div className="profile__introduce__title">Thông tin thêm</div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aspernatur neque provident nam aliquam eveniet culpa quas
                  deserunt, iste.
                </p>
              </div>
              <ChangePassword />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
