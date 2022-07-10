import React, { useContext, useState } from 'react';
import { ChartColumnContext, options } from './ChartColumn';
import { ChartZoom } from './ChartZoom';
import './chartMain.scss';
import { Bar } from 'react-chartjs-2';
import { Column } from '@ant-design/plots';
import ColumnChart from './ColumnChart';
interface ChartColumnMainProps {}

export const ChartColumnMain = (props: ChartColumnMainProps) => {
  const [type, setType] = useState<number>(0);
  return (
    <div className="chart__main">
      <div className="chart__title">
        <span>Doanh thu theo:</span>
        <select name="" id="" onChange={(e) => setType(Number(e.target.value))}>
          <option value="0">theo ngày</option>
          <option value="1">theo tuần</option>
          <option value="2">theo tháng</option>
        </select>
      </div>
      <ColumnChart type={type}/>
    </div>
  );
};
