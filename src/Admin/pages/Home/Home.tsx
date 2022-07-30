import React, { useEffect, useState } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';
import { ChartCircle } from './ChartCircle';
import { ChartColumn } from './ChartColumn';
import { statisticApi } from '../../../api/statisticApi';
import { courseApi } from '../../../api/CourseApi';
import { ClassItem } from '../../../components/WaitingClassList/WaitingClassList';
import CourseList from './CourseList';
import { Course } from '../../../models/course';
import Loading from '../../../components/Common/Loading';

interface HomeProps {}   

export interface FluctuateProps {
  type: string;
  percent: number;
  amount: number;
}
export const Home = (props: HomeProps) => {
  const [data, setData] = useState<FluctuateProps[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const loadStatistic = async () => {
      const resp = await statisticApi.getFluctutateStatistic(
        new Date().getMonth() + 1
      );
      const { data } = resp;
      setData(data);
    };
    loadStatistic();
    const loadCourseList = async () => {
      const resp = await courseApi.getClassList();
      const { data } = resp;
      setCourses(data.list);
    };
    loadCourseList();
  }, []);
  const Fluctuate = ({ type, percent, amount }: FluctuateProps) => {
    return (
      <Col sm={4} className="dashboard__parameters__main__item">
        <div className="parameters__item__icons">
          <div className="parameters__item__icons__main">
            {type.startsWith('L') ? (
              <i className="fas fa-eye"></i>
            ) : type.startsWith('K') ? (
              <i className="fa-solid fa-book"></i>
            ) : (
              <i className="fa-solid fa-users"></i>
            )}
          </div>
          <i className="fas fa-ellipsis-v"></i>
        </div>
        <div className="parameters__item__main">
          <div className="parameters__item__main__number">
            <span>
              {percent < 0 && '-'} {amount} {percent > 0 && '+'}
            </span>
            <span>{type}</span>
          </div>
          <div className="parameters__item__main__chart">
            <span>{percent * 100}%</span>
          </div>
        </div>
      </Col>
    );
  };
  return (
    <>
      <Col sm={8} className="dashboard__parameters">
        <Stack
          className="dashboard__parameters__main"
          direction="horizontal"
          gap={2}
        >
          {data.length > 0 ? (
            data.map((item) => (
              <Fluctuate
                type={item.type}
                amount={item.amount}
                percent={item.percent}
              />
            ))
          ) : (
            <Loading />
          )}
        </Stack>
        <div className="dashboard__courses">
          <p className="dashboard__courses__title">
            <span>Danh sách khóa học</span>
            <span>Xem Thêm</span>
          </p>
          <div className="courseList">
            <CourseList />
          </div>
        </div>
      </Col>
      <Col className="dashboard__charts">
        <Row className="dashboard__charts__main">
          <Col className="dashboard__charts__item">
            <ChartColumn />
          </Col>
          <Col className="dashboard__charts__item">
            <ChartCircle />
          </Col>
        </Row>
      </Col>
    </>
  );
};
