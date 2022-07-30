import { LockOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { userApi } from '../../../api/userApi';
import { toast } from 'react-toastify';
interface Props {
  id: number;
  isBlocked: boolean;
}

const Lock = ({ id, isBlocked }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (!isBlocked) {
      try {
        const resp = await userApi.blockUser(id);
        if (resp.data) {
          toast.success('Tài khoản này đã bị khóa!');
        } else {
          toast.error('Lỗi!');
        }
      } catch (e) {
        toast.error('Lỗi!');
      } finally {
        setIsModalVisible(false);
      }
    } else {
      try {
        const resp = await userApi.unBlockUser(id);
        if (resp.data) {
          toast.success('Tài khoản này đã được mở lại!');
        } else {
          toast.error('Lỗi!');
        }
      } catch (e) {
        toast.error('Lỗi!');
      } finally {
        setIsModalVisible(false);
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button shape="round" size="small" onClick={showModal}>
        <LockOutlined />
      </Button>
      <Modal
        title={`${isBlocked ? 'Mở khóa' : 'Khóa'} tài khoản`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          <WarningOutlined /> <span> </span>
          Tài khoản này sẽ {isBlocked ? 'không' : ''} bị khóa? Bạn có chắc muốn{' '}
          {isBlocked ? 'mở' : ''} khóa không?{' '}
        </p>
      </Modal>
    </div>
  );
};

export default Lock;
