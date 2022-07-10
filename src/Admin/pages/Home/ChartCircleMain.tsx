import React, { useContext, useState } from 'react';
import { ChartColumnContext, options } from './ChartColumn';
import { ChartZoom } from './ChartZoom';
import './chartMain.scss';
import { Bar, Doughnut } from 'react-chartjs-2';
import { ChartCircleContext } from './ChartCircle';
import CircleChart from './CircleChart';
import { DatePicker } from 'antd';
import { Year } from '@syncfusion/ej2-react-schedule';
import { number } from 'yup/lib/locale';
interface ChartCircleMainProps {}

export interface MonthYear {
  month: number;
  year: number;
}

export const ChartCircleMain = (props: ChartCircleMainProps) => {
  const [type, setType] = useState<number>(0);
  const [date, setDate] = useState<MonthYear>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });
  return (
    <div className="chart__main">
      <div className="chart__title">
        <span>Thông kê môn học trong tháng:</span>
        {/* <select name="" id="" onChange={(e) => setType(Number(e.target.value))}>
          <option value="0">theo ngày</option>
          <option value="1">theo tuần</option>
          <option value="2">theo tháng</option>
        </select> */}
        {/* <span style={{ marginLeft: '15px' }}>Tháng: </span> */}
        <select
          name=""
          id=""
          onChange={(e) =>
            setDate({
              ...date,
              month: Number(e.target.value),
            })
          }
          defaultValue={date.month}
        >
          {Array.from(new Array(12)).map((_, index) => (
            <option value={index + 1}>{index + 1}</option>
          ))}
        </select>
      </div>
      {/* <DatePicker mode="month" /> */}
      <CircleChart type={type} date={date} />
    </div>
  );
};
