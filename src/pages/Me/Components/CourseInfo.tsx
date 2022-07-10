import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FinishedCourse } from './CourseProfile/FinishedCourse';
import { LearningCourse } from './CourseProfile/LearningCourse';
import './courseInfo.scss';
import { PostList } from './CourseProfile/PostList';
const LEARNING__TAB = 'learning__tab';
const POST__TAB = 'post__tab';
const FINISHED__TAB = 'finshed__tab';
export default function CourseInfo() {
  const [courseTab, setCourseTab] = useState<string>(POST__TAB);
  return (
    <Row className="courses__main">
      <div className="course__tab">
        <span   
          onClick={() => setCourseTab(POST__TAB)}
          className={courseTab === POST__TAB ? 'course__tab--active' : ''}
        >
          Danh sách bài đăng
        </span>
        <span
          onClick={() => setCourseTab(LEARNING__TAB)}
          className={courseTab === LEARNING__TAB ? 'course__tab--active' : ''}
        >
          Khóa học đang diễn ra
        </span>
        <span
          onClick={() => setCourseTab(FINISHED__TAB)}
          className={courseTab === FINISHED__TAB ? 'course__tab--active' : ''}
        >
          Khóa học sắp diễn ra
        </span>
      </div>
      <Col xs={12} className="courses__info__tab">
        {courseTab === LEARNING__TAB ? <LearningCourse /> : courseTab === FINISHED__TAB  ? <FinishedCourse /> : <PostList/>}
      </Col>   
    </Row>
  );
}
