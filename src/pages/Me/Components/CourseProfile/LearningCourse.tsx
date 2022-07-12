import React, { useEffect, useRef, useState } from 'react';
import ProfileRegister, { createData } from '../ProfileRegister';
import './learningCourse.scss';

import { Table, Tag, Space, Button } from 'antd';
import Filter from '../../../../components/Common/Filter';
import { ClassItem } from '../../../../components/WaitingClassList/WaitingClassList';
import { userApi } from '../../../../api/userApi';
import useUser from '../../../../hooks/useUser';
import { converLearningDate } from '../../../../utils/date';
import { Classroom } from '../../../../models/classroom';
interface LearningCourseProps {}

export const LearningCourse = (props: LearningCourseProps) => {
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [user] = useUser();
  const clazzes = useRef<Classroom[]>([])
  useEffect(() => {
    user &&
      userApi
        .getMyClasses(user.id)
        .then((res) => {
          const { data } = res;
          console.log(data);
          clazzes.current = data.classes
          setClasses(data.classes);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [user]);
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
      dataIndex: 'classes',
      key: 'classes',
      render: (_: any, record: Classroom) => (
        <>
          {record.schedules.map((item: any) => (
            <p key={item.ids}>
              Thứ {item.day}, {converLearningDate(item.time)}
            </p>
          ))}
        </>
      ),
    },
    {
      title: '',
      key: 'go',
      render: (_: any, record: Classroom) => <Button>Vào lớp học</Button>,
    },
  ];

  const handleGetSearchValue = (text: string) => {
    const newPosts = [...clazzes.current];
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
