import React, { useEffect, useState } from 'react';
import { Button, Popover, Table } from 'antd';
import { UserAuth } from '../../../reducers/loginSlice';
import { userApi } from '../../../api/userApi';
import { Params } from '../../../api/tutorApi';
import { MoreOutlined } from '@ant-design/icons';
interface StudentTabProps {
  params: Params;
}

export const StudentTab = ({ params }: StudentTabProps) => {
  const [studentList, setStudentList] = useState<UserAuth[]>([]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (_: string, record: UserAuth) => studentList.indexOf(record) + 1,
    },
    {
      title: '',
      dataIndex: '',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
          children: [
            {
              text: 'Yellow',
              value: 'Yellow',
            },
            {
              text: 'Pink',
              value: 'Pink',
            },
          ],
        },
        {
          text: 'Category 2',
          value: 'Category 2',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value: any, record: any) => record.name.includes(value),
      width: '30%',
    },
    {
      title: 'Name',
      dataIndex: 'displayName',
      sorter: (a: any, b: any) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value: any, record: any) => record.address.startsWith(value),
      filterSearch: true,
      width: '40%',
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
          content={
            <>
              <Button danger style={{ marginBottom: '8px' }}>
                Khóa tài khoản
              </Button>
              <br />
              <Button danger>Khóa bình luận</Button>
            </>
          }
          trigger="click"
        >
          <MoreOutlined size={1} />
        </Popover>
      ),
    },
  ];

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  useEffect(() => {
    const params: Params = {
      page: 1,
      limit: 10,
      search: '',
    };
    userApi.getAllStudent(params).then((res) => {
      const { data } = res;
      const { list, currentPage, totalItems, totalPages } = data;

      setStudentList(list);
    });
  }, []);

  return (
    <>
      <Table
        columns={columns as any[]}
        dataSource={studentList}
        onChange={onChange}
        className="tutor__tab__admin"
        pagination={{ defaultPageSize: 6 }}
      />
    </>
  );
};
