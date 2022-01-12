import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FinishedCourse } from './CourseProfile/FinishedCourse';
import { LearningCourse } from './CourseProfile/LearningCourse';
import './courseInfo.scss'
const LEARNING__TAB = 'learning__tab';
const FINISHED__TAB = 'finshed__tab';
export default function CourseInfo() {
  const [courseTab, setCourseTab] = useState<string>(LEARNING__TAB);
  return (
    <Row className="courses__main">
      <div className="course__tab">
        <span
          onClick={() =>
            courseTab === FINISHED__TAB && setCourseTab(LEARNING__TAB)
          }
          className={courseTab === LEARNING__TAB ? 'course__tab--active' : ''}
        >
          Khóa học đang diễn ra      
        </span>
        <span
          onClick={() =>
            courseTab === LEARNING__TAB && setCourseTab(FINISHED__TAB)
            
          }
          className={courseTab === FINISHED__TAB ? 'course__tab--active' : ''}
        >
          Khóa học đã hoàn thành
        </span>
      </div>
      <Col xs={12} className="courses__info__tab">   
        {courseTab === LEARNING__TAB ? <LearningCourse /> : <FinishedCourse />}
      </Col>
    </Row>
  );
}
