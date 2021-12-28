import React from 'react';

interface TutorTabProps {}

export const TutorTab = (props: TutorTabProps) => {
  return (
    <>
      <table>
        <thead className="thead">
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
          <tbody className="tbody">  
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
              <td className="table__courses__status table__courses__status--finish">
                <span>Hoàn thành</span>
              </td>
              <td className="table__courses__fee">1.500.000đ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
