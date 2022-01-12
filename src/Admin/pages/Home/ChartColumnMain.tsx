import React, { useContext } from 'react';
import { ChartColumnContext, options } from './ChartColumn';
import { ChartZoom } from './ChartZoom';
import './chartMain.scss';
import { Bar } from 'react-chartjs-2';
interface ChartColumnMainProps {}

export const ChartColumnMain = (props: ChartColumnMainProps) => {
    const dataColumn = useContext(ChartColumnContext);
  return (
    <div className="chart__main">
      <span>Doanh thu theo:</span>
      <select name="" id="">
        <option value="week">theo tuần</option>
        <option value="month">theo tháng</option>
        <option value="year">theo năm</option>
      </select>
      <Bar options={options} data={dataColumn} />
    </div>
  );
};
