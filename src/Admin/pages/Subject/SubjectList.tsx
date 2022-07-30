import { EditOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { subjectApi } from '../../../api/subjectApi';
import { Subject } from '../../../models/subject';
import { edit } from '../../../reducers/subjectSlice';
type Props = {};

const SubjectList = (props: Props) => {
  const [data, setData] = useState<Subject[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSubjectList = async () => {
      try {
        const resp = await subjectApi.getAllSubject({ page: 1, limit: 1000 });
        const { data } = resp;
        setData(data.list);
      } catch (error) {}
    };
    loadSubjectList();
  }, []);
  const handleUpdate = (subject: Subject) => {
    dispatch(edit(subject));
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text: any, record: Subject) => <a>{data.indexOf(record) + 1}</a>,
    },
    {
      title: 'Tên môn học',
      dataIndex: 'name',
      key: 'name',
    },
    // {  
    //   title: 'Mô tả',
    //   dataIndex: 'description',
    //   key: 'description',
    // },
    {
      title: '',
      dataIndex: 'update',
      key: 'update',
      render: (_: string, record: Subject) => (
        <Button
          shape="circle"
          size="small"
          onClick={() => handleUpdate(record)}
        >
          <EditOutlined />
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ defaultPageSize: 4 }}
    />
  );
};

export default SubjectList;
