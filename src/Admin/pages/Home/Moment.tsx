import React, { useState } from 'react';

type Props = {};

export interface DateTime {
  day: number;
  month: number;
  year: number;
}
const Moment = (props: Props) => {
  const [dateTime, setDateTime] = useState<DateTime>({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  return <div>Moment</div>;
};

export default Moment;
