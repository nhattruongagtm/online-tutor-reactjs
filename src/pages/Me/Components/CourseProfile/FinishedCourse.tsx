import React, { useEffect, useRef, useState } from 'react';
import ProfileRegister, { createData } from '../ProfileRegister';
import './learningCourse.scss';

import { Table, Tag, Space, Button, Modal } from 'antd';
import Filter from '../../../../components/Common/Filter';
import { converLearningDate } from '../../../../utils/date';
import { ClassItem } from '../../../../components/WaitingClassList/WaitingClassList';
import { classroomApi } from '../../../../api/classroom';
import useUser from '../../../../hooks/useUser';
import { toast } from 'react-toastify';
import { Classroom } from '../../../../models/classroom';
interface FinishedCourse {}

interface CancelRegisterProps {
  id: number;
}

export const FinishedCourse = (props: FinishedCourse) => {
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [user] = useUser();
  const clazzes = useRef<Classroom[]>([]);
  console.log(clazzes.current)
  useEffect(() => {
    const loadList = async () => {
      if (user) {
        const list = await classroomApi.getAllWaitingClass(user.id);
        clazzes.current = list.data;
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
      render: (text: any, item: Classroom) => (
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
      key: 'subjectName',
    },
    {
      title: 'Thời gian học',
      dataIndex: 'learningDate',
      key: 'learningDate',
      render: (_: any, record: Classroom) => (
        <>{new Date(record.learningDate).toLocaleDateString()}</>
      ),
    },   
    {
      title: '',
      key: 'out',
      render: (_: any, record: Classroom) => <CancelRegister id={record.id} />,
    },
  ];

  const handleGetSearchValue = (text: string) => {
    const newPosts = [...clazzes.current];  
    console.log(text)
    if (text.trim() !== '') {  
      const clone = newPosts.filter((item) => item.name.indexOf(text) > -1);
      setClasses(clone);
    } else {
      setClasses(newPosts);
    }
  };
  return (
    <div className="learning__courses">
      <div className="learning__courses__list">
        <Filter onGetSearch={handleGetSearchValue} />
        <Table columns={columns} dataSource={classes} />
      </div>
    </div>  
  );
};
