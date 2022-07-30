import { Dialog } from '@mui/material';
import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { tutorApi } from '../../api/tutorApi';
import { TutorItem } from '../../components/Home/TutorItem';
import useUser from '../../hooks/useUser';
import TutorInfo from '../Tutor/TutorInfo';
import { RootState } from '../../store';
import { ProfileForm } from './Components/ProfileForm';
import { useSelector } from 'react-redux';
import { ChangePassword } from './Components/ChangePassword';
type Props = {};

const TutorProfile = (props: Props) => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [tutor, setTutor] = useState<TutorItem>();
  const user = useSelector((state: RootState) => state.loginUser.user);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    let isCancel = false;
    if (user) {
      tutorApi.getTutorByID(Number(user.id)).then((res) => {
        if (res) {
          !isCancel && setTutor(res.data);
        }
      });
    }
    return () => {
      isCancel = true;
    };
  }, [user]);

  const handleSetUpdate = () => {
    setIsUpdate(!isUpdate);
  };
  const handleOpenInfo = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  console.log('uuuu', user);

  return (
    <div>
      <div className="tutor__me__header">
        <>
          <>
            <Button onClick={handleOpenInfo}>Thông tin cơ bản</Button>
            <Dialog
              open={isModalVisible}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className="profile__change__info"
            >
              {user && <ProfileForm onCloseForm={handleClose} info={user} />}
            </Dialog>
          </>
          <ChangePassword />
        </>
        <Button onClick={handleSetUpdate}>Chỉnh sửa</Button>
      </div>
      <TutorInfo tutor={tutor} isUpdate={isUpdate} />
    </div>
  );
};

export default TutorProfile;
