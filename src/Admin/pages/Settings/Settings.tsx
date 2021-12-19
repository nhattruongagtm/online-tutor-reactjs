import React from 'react'
import { Col } from 'react-bootstrap'
import DetailCourse from '../../../pages/DetailCourse/DetailCourse'
import Tutor from '../../../pages/Tutor/Tutor'
import Profile from '../Profile/Profile'

interface SettingsProps {
    
}

export const Settings = (props: SettingsProps) => {
    return (
        <Col className="profile__detail__course__admin">
            {/* <DetailCourse/>   */}
            <Tutor/>  
        </Col>
    )
}
