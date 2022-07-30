import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { courseApi } from '../../../api/CourseApi';
import { Course } from '../../../models/course';
import { Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { loadCourseList } from '../../../reducers/courseSlice';
interface LearningCourseProps {}

const CourseList = (props: LearningCourseProps) => {
  const dispatch = useDispatch();
  const store = useSelector((state: RootState) => state.course);
  const { currentPage, filters, list, totalItems, totalPages } = store;
  useEffect(() => {
    const loadCoursesList = async () => {
      const resp = await courseApi.getClassList();
      // console.log(resp.data.list)
      dispatch(loadCourseList({ ...resp.data }));
    };
    loadCoursesList();
  }, [filters]);
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      render: (text: any, record: Course) => (
        <a>{list.indexOf(record) + 1}</a>
      ),
    },
    {
      title: 'Tên môn học',
      dataIndex: 'subjectName',
      key: 'subjectName',
    },
    {
      title: 'Gia sư',
      dataIndex: 'account.displayName',
      key: 'account.displayName',
      render: (_: string, record: Course) => (
        <>{record.tutor?.account?.displayName}</>
      ),
    },
    {
      title: 'Học phí (vnđ/buổi)',
      dataIndex: 'post.tuition',
      key: 'post.tuition',
      render: (_: string, record: any) => (
        <>{record.post.tuition}</>
        // <></>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_: string, record: Course) => (
        <Tag color={record.status === 1 ? 'gold' : 'green'}>
          {record.status === 1 ? 'Đang học' : 'Đã hoàn thành'}
        </Tag>
      ),
    },
  ];
  
  return (
    <div className="learning__courses">
      <div className="learning__courses__list">
        <Table columns={columns} dataSource={list} pagination={false} />
      </div>
    </div>
  );
};
export default CourseList;
