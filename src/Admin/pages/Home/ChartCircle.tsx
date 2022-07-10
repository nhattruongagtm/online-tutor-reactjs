import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { createContext } from 'react';
import { ChartZoom } from './ChartZoom';
import CircleChart from './CircleChart';

Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const dataCircle = {
  labels: ['Toán', 'Vật lý', 'Hóa học', 'Tiếng Anh', 'Ngữ văn', 'khác'],
  datasets: [
    {
      label: 'doanh thu',
      data: [12, 9, 3, 30, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
export const ChartCircleContext = createContext(dataCircle);

interface Props {}

export const ChartCircle = (props: Props) => {
  return (
    <ChartCircleContext.Provider value={dataCircle}>
      <div className="chart--circle">
        <CircleChart
          type={0}
          date={{  
            month: new Date().getMonth()+1,
            year: new Date().getFullYear(),
          }}
        />
      </div>
      <ChartZoom name="Thông kê môn học nổi bật" type={0} />
    </ChartCircleContext.Provider>
  );
};
