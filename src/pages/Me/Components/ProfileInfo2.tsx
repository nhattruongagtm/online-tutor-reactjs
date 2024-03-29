import Dialog from '@mui/material/Dialog';
import { Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAddress from '../../../hooks/useAddress';
import useUser from '../../../hooks/useUser';
import { UserAuth } from '../../../reducers/loginSlice';
import { RootState } from '../../../store';
import AdditionalInfo from './AdditionalInfo';
import { ProfileForm } from './ProfileForm';
import './profileInfo2.scss';
const { TextArea } = Input;

export default function ProfileInfo2() {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>();
  const [open, setOpen] = React.useState(false);
  const [user] = useUser();
  const [introduce, setIntroduce] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.profile.userInfo);
  const [districts, cities] = useAddress();

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
            {userInfo && (  
              <img
                src={  
                  userInfo?.avatar
                    ? userInfo.avatar
                    : `https://avatars.dicebear.com/api/avataaars/${userInfo.id}
            }.jpg`
                }
                alt=""
              />
            )}
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Họ tên: </div>
            <input
              type="text"
              placeholder="Nhập họ tên..."
              value={userInfo?.displayName}
              disabled={!isEdit}
            />
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Email: </div>
            <input
              type="email"
              placeholder="Nhập email..."
              value={userInfo?.email}
              disabled={!isEdit}
            />
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Sô điện thoại: </div>
            <input
              type="number"
              placeholder="Nhập số điện thoại..."
              value={userInfo?.phone}
              disabled={!isEdit}
            />
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Tỉnh/thành phố: </div>
            <select disabled={!isEdit}>
              <option value="la">
                {
                  cities.find((item) => item.code === userInfo?.city+"")
                    ?.name_with_type     
                }
              </option>   
            </select>
          </div>
          <div className="profile__base__body__name">
            <div className="profile__item__label">Quận/huyện: </div>
            <select disabled={!isEdit}>
              <option value="la">
                {
                  districts.find((item) => item.slug === userInfo?.district)
                    ?.name_with_type
                }
              </option>
            </select>
          </div>  
          <div className="profile__base__body__name">
            <div className="profile__item__label">Giới tính: </div>
            <select disabled={!isEdit}>
              <option value={0}>{userInfo?.gender === 0 ? 'Nam' : 'Nữ'}</option>
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
              <ProfileForm onCloseForm={handleClose} info={userInfo as UserAuth} />
            </Dialog>
          </div>
        </div>
      </div>
      <div className="profile__more">
        <div className="profile__more__register">
          <div className="profile__base__title profile__register">
            <p>Thông tin bài đăng</p>
          </div>
          <div className="profile__more__register__body">
            {/* <ProfileRegister rows={rows} height={240} /> */}
            <div className="profile__more__item">
              <div className="more__item__header">
                <div className="icon">
                  <i className="fa-solid fa-book-open-cover"></i>
                </div>
              </div>
              <div className="more__item__number">
                <span>Số bài đăng</span>
                <span>10</span>
              </div>
            </div>
            <div className="profile__more__item">
              <div className="more__item__header">
                <div className="icon"></div>
              </div>
              <div className="more__item__number">
                <span>Đang diễn ra</span>
                <span>1</span>
              </div>
            </div>
            <div className="profile__more__item">
              <div className="more__item__header">
                <div className="icon"></div>
              </div>
              <div className="more__item__number">
                <span>Đã hoàn thành</span>
                <span>2</span>
              </div>
            </div>
            <div className="profile__more__item">
              <div className="more__item__header">
                <div className="icon"></div>
              </div>
              <div className="more__item__number">
                <span>Số lượt bình luận</span>
                <span>10</span>
              </div>
            </div>
            <div className="profile__more__item">
              <div className="more__item__header">
                <div className="icon"></div>
              </div>
              <div className="more__item__number">
                <span>Phản hồi bình luận</span>
                <span>1</span>
              </div>
            </div>
            <div className="profile__more__item">
              <div className="more__item__header">
                <div className="icon"></div>
              </div>
              <div className="more__item__number">
                <span>Khóa học bị hủy</span>
                <span>2</span>
              </div>
            </div>
          </div>
        </div>
        <AdditionalInfo />
      </div>
    </div>
  );
}
