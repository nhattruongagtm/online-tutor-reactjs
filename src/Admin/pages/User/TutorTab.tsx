import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { UserAuth } from '../../../reducers/loginSlice';
import { Params } from '../../../api/tutorApi';
import { userApi } from '../../../api/userApi';
import { Button } from 'antd';
import { Popover } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
interface TutorTabProps {}

export const TutorTab = (props: TutorTabProps) => {
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
      title: 'STT',
      dataIndex: 'stt',
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
    const params: Params = {
      page: 1,
      limit: 10,
      search: '',
    };
    userApi.getAllTutor(params).then((res) => {
      const { data } = res;
      const { list, currentPage, totalItems, totalPages } = data;

      setTutorList(list);
    });
  }, []);

  return (
    <>
      <Table
        columns={columns as any[]}
        dataSource={tutorList}
        onChange={onChange}
        className="tutor__tab__admin"
        pagination={false}
      />
    </>
  );
};
