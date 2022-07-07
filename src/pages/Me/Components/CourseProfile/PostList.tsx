import React, { useEffect, useState } from 'react';
import ProfileRegister, { createData } from '../ProfileRegister';
import './learningCourse.scss';
import './postList.scss';

import { Table, Tag, Space, Button, Modal } from 'antd';
import Filter from '../../../../components/Common/Filter';
import { ClassItem } from '../../../../components/WaitingClassList/WaitingClassList';
import useUser from '../../../../hooks/useUser';
import { Params } from '../../../../api/tutorApi';
import { postApi } from '../../../../api/postApi';
import { useHistory } from 'react-router';
import { COURSE_PATH } from '../../../../constants/path';
import PostDetailItem from './PostDetailItem';
interface LearningCourseProps {}

export const PostList = (props: LearningCourseProps) => {
  const [posts, setPosts] = useState<ClassItem[]>([]);
  const [user] = useUser();
  const history = useHistory();

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text: any, record: ClassItem) => (
        <a>{posts.indexOf(record) + 1}</a>
      ),
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Học phí (vnđ/buổi)',
      dataIndex: 'tuition',
      key: 'tuition',
    },

    {
      title: '',
      key: 'action',
      render: (_: any, record: ClassItem) => (
        <Button onClick={() => history.push(`${COURSE_PATH}?id=${record.id}`)}>
          Chi tiết
        </Button>
      ),
    },
    {
      title: 'Đề nghị',
      key: 'offer',
      dataIndex: 'offer',
      render: (text: string, record: ClassItem) => (
        <>
          {record.offer > 0 ? (
            <PostDetailItem record={record} />
          ) : (
            <>{record.offer}/3</>
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    let isCancel = false;
    const params: Params = {
      page: 1,
      limit: 5,
      search: '',
    };
    user &&
      postApi
        .getPostByUserId(user.id, params)
        .then((res) => {
          const { data, message, status } = res;
          const { currentPage, list, totalItems, totalPages } = data;

          !isCancel && setPosts(list);
        })
        .catch((e) => {
          console.log(e);
        });

    return () => {
      isCancel = true;
    };
  }, [user]);
  return (
    <div className="learning__courses">
      <div className="learning__courses__list">
        <Filter />
        <Table columns={columns} dataSource={posts} />
      </div>
    </div>
  );
};
