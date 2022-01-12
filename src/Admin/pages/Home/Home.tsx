import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { createContext, useState } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';
import { ChartCircle } from './ChartCircle';
import { ChartColumn } from './ChartColumn';

interface HomeProps {}

export const Home = (props: HomeProps) => {
  return (
    <>
      <Col sm={8} className="dashboard__parameters">
        <Stack
          className="dashboard__parameters__main"
          direction="horizontal"
          gap={2}
        >
          <Col sm={4} className="dashboard__parameters__main__item">
            <div className="parameters__item__icons">
              <div className="parameters__item__icons__main">
                <i className="fas fa-eye"></i>
              </div>
              <i className="fas fa-ellipsis-v"></i>
            </div>
            <div className="parameters__item__main">
              <div className="parameters__item__main__number">
                <span>2341+</span>
                <span>Lượt xem</span>
              </div>
              <div className="parameters__item__main__chart">
                <span>50%</span>
              </div>
            </div>
          </Col>
          <Col sm={4} className="dashboard__parameters__main__item">
            <div className="parameters__item__icons">
              <div className="parameters__item__icons__main">
                <i className="fas fa-eye"></i>
              </div>
              <i className="fas fa-ellipsis-v"></i>
            </div>
            <div className="parameters__item__main">
              <div className="parameters__item__main__number">
                <span>2341+</span>
                <span>Lượt xem</span>
              </div>
              <div className="parameters__item__main__chart">
                <span>50%</span>
              </div>
            </div>
          </Col>
          <Col sm={4} className="dashboard__parameters__main__item">
            <div className="parameters__item__icons">
              <div className="parameters__item__icons__main">
                <i className="fas fa-eye"></i>
              </div>
              <i className="fas fa-ellipsis-v"></i>
            </div>
            <div className="parameters__item__main">
              <div className="parameters__item__main__number">
                <span>2341+</span>
                <span>Lượt xem</span>
              </div>
              <div className="parameters__item__main__chart">
                <span>50%</span>
              </div>
            </div>
          </Col>
        </Stack>
        <div className="dashboard__courses">
          <p className="dashboard__courses__title">
            <span>Danh sách khóa học</span>
            <span>Xem Thêm</span>
          </p>
          <table>
            <thead>
              <tr>
                <td className="table__course__id">
                  ID <i className="fas fa-chevron-down"></i>{' '}
                </td>
                <td className="table__course__name">
                  Khóa học<i className="fas fa-chevron-down"></i>{' '}
                </td>
                {/* <td>Giảng Viên<i className="fas fa-chevron-down"></i> </td>
                        <td>Học Viên<i className="fas fa-chevron-down"></i> </td> */}
                <td className="table__course__status">
                  Trạng thái<i className="fas fa-chevron-down"></i>{' '}
                </td>
                <td className="table__course__fee">
                  Học phí<i className="fas fa-chevron-down"></i>{' '}
                </td>
              </tr>
            </thead>
          </table>
          <div className="table__course__scroll">
            <table>
              <tbody>
                <tr>
                  <td className="table__course__id">#1242</td>
                  <td className="table__course__name">
                    Lập trình frontend với ReactJS
                  </td>
                  {/* <td>Adam Joh</td>
                        <td>Huỳnh Nhật Trường</td> */}
                  <td className="table__course__status table__course__status--pending">
                    <span>Đang học</span>
                  </td>
                  <td className="table__course__fee">1.500.000đ</td>
                </tr>
                <tr>
                  <td className="table__course__id">#1242</td>
                  <td className="table__course__name">
                    Lập trình frontend với ReactJS
                  </td>
                  {/* <td>Adam Joh</td>
                        <td>Huỳnh Nhật Trường</td> */}
                  <td className="table__course__status table__course__status--pending">
                    <span>Đang học</span>
                  </td>
                  <td className="table__course__fee">1.500.000đ</td>
                </tr>
                <tr>
                  <td className="table__course__id">#1242</td>
                  <td className="table__course__name">
                    Lập trình frontend với ReactJS
                  </td>
                  {/* <td>Adam Joh</td>
                        <td>Huỳnh Nhật Trường</td> */}
                  <td className="table__course__status table__course__status--finish">
                    <span>Hoàn thành</span>
                  </td>
                  <td className="table__course__fee">1.500.000đ</td>
                </tr>
                <tr>
                  <td className="table__course__id">#1242</td>
                  <td className="table__course__name">
                    Lập trình frontend với ReactJS
                  </td>
                  {/* <td>Adam Joh</td>
                        <td>Huỳnh Nhật Trường</td> */}
                  <td className="table__course__status table__course__status--cancel">
                    <span>Đã hủy</span>
                  </td>
                  <td className="table__course__fee">1.500.000đ</td>
                </tr>
              </tbody>
            </table>
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
