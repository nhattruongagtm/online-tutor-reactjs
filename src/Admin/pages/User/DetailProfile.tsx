import React from 'react';
import { Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import Tutor from '../../../pages/Tutor/Tutor';

interface DetailProfileProps {}

export const DetailProfile = (props: DetailProfileProps) => {
    const history = useHistory();
  return (
    <Col className="profile__detail__course__admin">
      {/* <DetailCourse/>   */}
      <div className="profile__detail__course__admin__header">
        <button onClick={()=>history.goBack()}>
          <i className="fas fa-arrow-left"></i>{' '}
        </button>
      </div>
      <Tutor />
    </Col>
  );
};
