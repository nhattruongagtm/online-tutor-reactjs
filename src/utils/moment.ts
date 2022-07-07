import { MuiThemeProvider } from '@material-ui/core';
import moment from 'moment';
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
export const getFinishedTime = (
  time: number,
  numberOfMonth: number,
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

  return getDateListFromTwoDates(startTime, endTime, days);
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
  post?: ClassItem
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
          Subject: post?.subject || '',
        };
        rs.push(data);
      }
    });
    now.add(1, 'days');
  }
  return rs;
};
