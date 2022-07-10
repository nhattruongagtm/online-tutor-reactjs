import { MuiThemeProvider } from '@material-ui/core';
import moment from 'moment';
import { listenerCount } from 'process';
import {
  ClassItem,
  LearningDate,
} from '../components/WaitingClassList/WaitingClassList';
import { converLearningDate, convertDate } from './date';
const formatString = 'YYYY/MM/DD HH:mm:ss';

export interface DateTime {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  second: number;
}
export interface TimeTable {
  Id: number | string;
  StartTime: Date;
  EndTime: Date;
  Subject: String;
  IsReadonly: boolean;
}

const formatToString = (number: number) => {
  return number < 10 ? '0' + number : number;
};
export const getFinishedTime = (
  time: number,
  numberOfMonth: number,
  subjectName: string,
  //   schedule {day,time}
  days: LearningDate[]
) => {
  const date = getDateTimeFromNumberChain(time);

  const startTime = moment(`${date}`, formatString);

  let totalDaysOfMonths = 0;
  for (let i = 0; i < numberOfMonth; i++) {
    totalDaysOfMonths += moment().daysInMonth();
  }

  const endTime = startTime.clone().add(totalDaysOfMonths, 'days');

  return getDateListFromTwoDates(startTime, endTime, days, subjectName);
};
export const getDateTimeFromNumberChain = (chain: number): String => {
  const date = new Date(chain);
  const rs: DateTime = {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
  return `${rs.year}/${rs.month < 10 ? '0' + rs.month : rs.month}/${
    rs.day < 10 ? '0' + rs.day : rs.day
  } 00:00:00`;
};

export const getDateListFromTwoDates = (
  startDate: moment.Moment,
  endTime: moment.Moment,
  days: LearningDate[],
  subjectName?: string
) => {
  let rs: TimeTable[] = [];
  let now = startDate.clone();
  while (now.isSameOrBefore(endTime)) {
    const day = now.isoWeekday() + 1;
    days.forEach((item) => {
      if (item.day === day) {
        const start = item.time.toString().includes('.') ? true : false;

        const data: TimeTable = {
          StartTime: now
            .set('hour', 0)
            .set('minute', 0)
            .set('second', 0)
            .add(
              start ? Math.floor(item.time) * 60 + 30 : item.time * 60,
              'minutes'
            )
            .toDate(),
          EndTime: now.clone().add(90, 'minutes').toDate(),
          IsReadonly: false,
          Id: now.clone().toDate().toISOString(),
          Subject: subjectName || '',
        };
        rs.push(data);
      }
    });
    now.add(1, 'days');
  }
  return rs;
};

export const getDaysInMonth = (
  month: number = new Date().getMonth() + 1,
  year: number = new Date().getFullYear()
) => {
  let rs: string[] = [];
  const startDate = moment(
    `${year}-${formatToString(month)}-01`,
    'YYYY-MM-DD'
  ).set('day', 1);
  const daysInMonth = moment(
    `${year}-${formatToString(month)}`,
    'YYYY-MM'
  ).daysInMonth();
  const endDate = moment(
    `${year}-${formatToString(month)}-01`,
    'YYYY-MM-DD'
  ).set('day', daysInMonth);

  const current = startDate.clone();
  while (current.isSameOrBefore(endDate)) {
    const item = current.format('YYYY-MM-DD');
    rs.push(item);
    current.add(1, 'days');
  }
  return rs;
};
