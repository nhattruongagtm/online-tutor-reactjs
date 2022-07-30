import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import {
  Agenda,
  Day,
  EventSettingsModel,
  Inject,
  Month,
  ScheduleComponent,
  Week,
  WorkWeek,
} from '@syncfusion/ej2-react-schedule';
import React, { useEffect, useState } from 'react';
import { getFinishedTime } from '../../../utils/moment';
import './timeTable.scss';
import { TimeTable as Schedule } from '../../../utils/moment';
import { userApi } from '../../../api/userApi';
import useUser from '../../../hooks/useUser';
interface TimeTableProps {}

export const TimeTable = (props: TimeTableProps) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [user] = useUser();
  useEffect(() => {
    const loadScheduleList = async () => {
      try {
        if (user) {
          const resp = await userApi.getMyClasses(user.id);
          const { data } = resp;
          const { classes } = data;

          classes.forEach((item) => {
            const timeItem = getFinishedTime(
              item.learningDate,
              item.duration,
              item.subjectName,
              item.schedules
            );
            console.log(item)
            setSchedules([...schedules,...timeItem])
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadScheduleList();
  }, [user]);
  console.log({schedules})
  const localData: EventSettingsModel = {
    dataSource: schedules,
    fields: {
      subject: { name: 'Subject' },
      startTime: { name: 'StartTime' },
      endTime: { name: 'EndTime' },
    },
  };
  return (
    <div className="schedule__scroll">
      <ScheduleComponent
        startHour="07:00"
        endHour="18:00"
        currentView="Week"
        selectedDate={new Date()}
        eventSettings={{ dataSource: localData.dataSource }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};
