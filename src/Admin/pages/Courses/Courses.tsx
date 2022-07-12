import React from 'react';

import { Col, Row } from 'react-bootstrap';
import { Params } from '../../../api/tutorApi';
import { Header } from '../User/Header';
import { Profile } from '../User/Profile';
import { DetailCourse } from './DetailCourse';
interface CoursesProps {}

export const Courses = (props: CoursesProps) => {
  const handleGetParams = (params: Params) =>{

  }
  return (
    <>
      <Col sm={8} className="dashboard__users">  
        <Header onGetParams={handleGetParams}/>
        <div className="dashboard__users__main">
          <div className="dashboard__users__main__list">
            <div className="dashboard__users__main__list__item">
              <table>
                <thead>
                  <tr>
                    <td className="table__courses__checkbox">
                      <input type="checkbox" />
                    </td>
                    <td className="table__courses__id">
                      ID <i className="fas fa-chevron-down"></i>{' '}
                    </td>
                    <td className="table__courses__name">
                      Họ tên<i className="fas fa-chevron-down"></i>{' '}
                    </td>
                    {/* <td>Giảng Viên<i className="fas fa-chevron-down"></i> </td>
                        <td>Học Viên<i className="fas fa-chevron-down"></i> </td> */}
                    <td className="table__courses__status">
                      Trạng thái<i className="fas fa-chevron-down"></i>{' '}
                    </td>
                    <td className="table__courses__fee">
                      Học phí<i className="fas fa-chevron-down"></i>{' '}
                    </td>
                  </tr>
                </thead>  
              </table>
              <div className="table__courses__scroll">
                <table>
                  <tbody>
                    <tr>
                      <td className="table__courses__checkbox">
                        <input type="checkbox" />
                      </td>
                      <td className="table__courses__id">#1242</td>
                      <td className="table__courses__name">
                        Lập trình frontend với ReactJS
                      </td>
                      {/* <td>Adam Joh</td>
                        <td>Huỳnh Nhật Trường</td> */}
                      <td className="table__courses__status table__courses__status--pending">
                        <span>Đang học</span>
                      </td>
                      <td className="table__courses__fee">1.500.000đ</td>
                    </tr>
                    <tr>
                      <td className="table__courses__checkbox">
                        <input type="checkbox" />
                      </td>
                      <td className="table__courses__id">#1242</td>
                      <td className="table__courses__name">
                        Lập trình frontend với ReactJS
                      </td>
                      {/* <td>Adam Joh</td>
                        <td>Huỳnh Nhật Trường</td> */}
                      <td className="table__courses__status table__courses__status--pending">
                        <span>Đang học</span>
                      </td>
                      <td className="table__courses__fee">1.500.000đ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="dashboard__users__main__pagination">
            <ul className="dashboard__pagination">
              <li>
                <i className="fas fa-chevron-left"></i>
              </li>
              <li>1</li>
              <li className="dashboard__pagination--active">2</li>
              <li>3</li>
              <li>...</li>
              <li>15</li>
              <li>
                <i className="fas fa-chevron-right"></i>
              </li>
            </ul>
          </div>
        </div>
      </Col>
      <Col className="dashboard__users__profile">
        <DetailCourse/>   
      </Col>
    </>
  );
};
