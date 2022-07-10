import React, { useEffect, useState } from 'react';
import ProfileRegister, { createData } from '../ProfileRegister';
import './learningCourse.scss';

import { Table, Tag, Space, Button, Modal } from 'antd';
import Filter from '../../../../components/Common/Filter';
import { converLearningDate } from '../../../../utils/date';
import { ClassItem } from '../../../../components/WaitingClassList/WaitingClassList';
import { classroomApi } from '../../../../api/classroom';
import useUser from '../../../../hooks/useUser';
import { toast } from 'react-toastify';
interface FinishedCourse {}

interface CancelRegisterProps {
  id: number;
}

export const FinishedCourse = (props: FinishedCourse) => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [user] = useUser();
  useEffect(() => {
    const loadList = async () => {
      if (user) {
        const list = await classroomApi.getAllWaitingClass(user.id);
        setClasses(list.data);
      }
    };
    loadList();
  }, [user]);

  const CancelRegister = ({ id }: CancelRegisterProps) => {
    const [visible, setVisible] = useState(false);
    const [modalText, setModalText] = useState(
      'Bạn chắc chắn muốn hủy đăng ký khóa học này chứ?'
    );

    const showModal = () => {
      setVisible(true);
    };

    const handleOk = async () => {
      if (user) {
        setModalText('The modal will be closed after two seconds');
        const res = await classroomApi.cancelRegister(user.id, id);
        if (res.data) {
          toast.success('Hủy đăng ký thành công!');
        } else {
          toast.error('Không thể hủy đăng ký!');
        }
        setVisible(false);
      }
    };

    const handleCancel = () => {
      console.log('Clicked cancel button');
      setVisible(false);
    };
    return (
      <>
        <Button onClick={showModal}>Hủy đăng ký</Button>
        <Modal
          title="Xác nhận hủy đăng ký khóa học"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{modalText}</p>
        </Modal>
        
      </>
    );
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text: any, item: ClassItem) => (
        <a>{classes.indexOf(item) + 1}</a>
      ),
    },
    {
      title: 'Tên lớp',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Môn học',
      dataIndex: 'subjectName',
      key: 'subjectNam',
    },
    {
      title: 'Thời gian học',
      dataIndex: 'learningDate',
      key: 'learningDate',
      render: (_: any, record: ClassItem) => (
        <>{new Date(record.post.learningDate).toLocaleDateString()}</>
      ),
    },
    {
      title: '',
      key: 'out',
      render: (_: any, record: ClassItem) => <CancelRegister id={record.id} />,
    },
  ];
  return (
    <div className="learning__courses">
      <div className="learning__courses__list">
        <Filter />
        <Table columns={columns} dataSource={classes} />
      </div>
    </div>
  );
};
