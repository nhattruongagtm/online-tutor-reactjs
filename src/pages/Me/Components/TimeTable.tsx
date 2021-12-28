import React from 'react';
import Timetable from 'react-timetable-events';
import './timeTable.scss';
import {
  ScheduleComponent,
  Inject,
  Day,
  Week,
  WorkWeek,
  Agenda,
  Month,
  EventSettingsModel,
} from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
interface TimeTableProps {}

const events = {
  monday: [
    {
      id: 1,
      name: 'Custom Event 1',
      type: 'custom',
      startTime: new Date('2018-02-23T11:30:00'),
      endTime: new Date('2018-02-23T13:30:00'),
    },
    {
      id: 2,
      name: 'Custom Event 2',
      type: 'custom',
      startTime: new Date('2018-02-23T15:00:00'),
      endTime: new Date('2018-02-23T17:00:00'),
    },
  ],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
};

// const Time = () => <Timetable events={events} />;

export const TimeTable = (props: TimeTableProps) => {
  const localData: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        EndTime: new Date(2021, 11, 28, 8, 30),
        StartTime: new Date(2021, 11, 28, 7, 0),
        Subject: 'học tiếng anh giao tiếp',
        IsReadonly: true,
      },
      {
        Id: 2,
        EndTime: new Date(2021, 11, 29, 10, 30),
        StartTime: new Date(2021, 11, 29, 9, 0),
        Subject: 'học lập trình',
        IsReadonly: true,  
      },
      {
        Id: 3,
        StartTime: new Date(2021, 11, 30, 14, 30),
        EndTime: new Date(2021, 11, 30, 16, 0),
        Subject: 'học lập trình',
        IsReadonly: true,  
      },
    ],
    fields: {
      subject: { name: 'Subject' },
      startTime: { name: 'StartTime' },
      endTime: { name: 'EndTime' },
    },
  };
  const remoteData = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });
  return (
    <div className="schedule__scroll">
      <ScheduleComponent
        startHour='07:00' endHour='18:00'
        currentView="Week"
        selectedDate={new Date(2021, 11, 28)}
        eventSettings={{ dataSource: localData.dataSource }}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  );
};
