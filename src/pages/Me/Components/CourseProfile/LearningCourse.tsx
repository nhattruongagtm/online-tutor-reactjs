import React from 'react'
import ProfileRegister, { createData } from '../ProfileRegister'
import './learningCourse.scss'
interface LearningCourseProps {
    
}

const rows = [
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];
  

export const LearningCourse = (props: LearningCourseProps) => {
    return (
        <div className="learning__courses">
            <div className="learning__courses__list">
            <ProfileRegister height={'100%'} rows={rows}/>
            </div>
        </div>
    )
}
