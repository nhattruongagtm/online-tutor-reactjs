import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { UserAuth } from '../../../reducers/loginSlice';
import { Params } from '../../../api/tutorApi';
import { userApi } from '../../../api/userApi';
import { Button } from 'antd';
import { Popover } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
interface TutorTabProps {
  params: Params;
}

export const TutorTab = ({ params }: TutorTabProps) => {
  const [tutorList, setTutorList] = useState<UserAuth[]>([]);

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (_: string, record: UserAuth) => tutorList.indexOf(record) + 1,
    },

    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Thời gian học',
      dataIndex: 'learningDate',
      key: 'learningDate',
      render: (_: any, record: any) => (
        <>{new Date(record.createdDate).toLocaleDateString()}</>
      ),  
    },
    {
      title: 'Vai trò',
      dataIndex: 'education',
    },

    {
      title: 'Học phí',
      dataIndex: 'tuition',
      render: (_: string, record: any) => <>{record.tuition}</>,
    },
    {
      title: '',
      dataIndex: 'detail',
      render: (_: string, record: UserAuth) => <Button>Chi tiết</Button>,
    },
    {
      title: '',
      dataIndex: 'more',
      render: (_: string, record: UserAuth) => (
        <Popover
          placement="right"
          title={'text'}
          content={'content'}
          trigger="click"
        >
          <MoreOutlined size={1} />
        </Popover>
      ),
    },
  ];

  useEffect(() => {
    const par: Params = {
      ...params,
      page: 1,
      limit: 10,
    };
    userApi.getAllTutor(par).then((res) => {
      const { data } = res;
      const { list, currentPage, totalItems, totalPages } = data;

      setTutorList(list);
    });
  }, [params]);

  return (
    <>
      <Table
        columns={columns as any[]}
        dataSource={tutorList}
        onChange={onChange}
        className="tutor__tab__admin"
        pagination={{defaultPageSize: 2}}
      />
    </>
  );
};
