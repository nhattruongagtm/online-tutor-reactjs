import React from 'react'
import ProfileRegister, { createData } from '../ProfileRegister'
import './finishedCourse.scss'
interface FinishedCourseProps {
    
}
const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    
  ];
  
export const FinishedCourse = (props: FinishedCourseProps) => {
    return (
        <div className="finished__course">
          
            <ProfileRegister rows={rows} height={'100%'}/>
        </div>
    )
}
