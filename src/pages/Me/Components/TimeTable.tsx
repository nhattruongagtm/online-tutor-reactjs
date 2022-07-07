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
import React from 'react';
import { getFinishedTime } from '../../../utils/moment';
import './timeTable.scss';
interface TimeTableProps {}

export const TimeTable = (props: TimeTableProps) => {
  const localData: EventSettingsModel = {
    dataSource: getFinishedTime(1656526357149, 2, [
      {
        day: 2,
        time: 7,
      },
      {
        day: 5,
        time: 8.5,
      },
    ]),
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
