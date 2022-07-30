import React, { useEffect, useState } from 'react';
import { Button, Popover, Table } from 'antd';
import { UserAuth } from '../../../reducers/loginSlice';
import { userApi } from '../../../api/userApi';
import { Params } from '../../../api/tutorApi';
import { MoreOutlined } from '@ant-design/icons';
import useAddress from '../../../hooks/useAddress';
import { useDispatch } from 'react-redux';
import { displayUserDetail } from '../../../reducers/tutorSlice';
interface StudentTabProps {
  params: Params;
}

export const StudentTab = ({ params }: StudentTabProps) => {
  const [studentList, setStudentList] = useState<UserAuth[]>([]);
  const [district, city] = useAddress();
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      render: (_: string, record: UserAuth) => studentList.indexOf(record) + 1,
    },

    {
      title: 'Họ tên',
      dataIndex: 'displayName',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'city',
      render: (text: string, record: UserAuth) => (
        <>{city.find((item) => item.code === record.city)?.name_with_type}</>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: '',
      dataIndex: 'detail',
      render: (_: string, record: UserAuth) => (
        <Button onClick={() => dispatch(displayUserDetail(record))}>
          Chi tiết
        </Button>
      ),
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
    userApi
      .getAllStudent(params)
      .then((res) => {
        const { data } = res;
        const { list, currentPage, totalItems, totalPages } = data;
        setStudentList(list);
      })
      .catch((e) => {
        console.log(e);
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
