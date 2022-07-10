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
import React, { createContext, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartZoom } from './ChartZoom';
import ColumnChart from './ColumnChart';

interface HomeProps {}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      //   text: 'Doanh thu',
    },
  },
};
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const dataColumn = {
  labels,
  datasets: [
    {
      label: 'Doanh thu',
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

interface ChartColumnProps {
  isOpen: boolean;
}

export const ChartColumnContext = createContext(dataColumn);

export const ChartColumn = () => {
  return (
    <ChartColumnContext.Provider value={dataColumn}>
      {/* <Bar options={options} data={dataColumn} /> */}
      <div className="chart--column">
      <ColumnChart type={0}/>
      </div>

      <ChartZoom type={1} name="Thống kê doanh thu" options={options} />
    </ChartColumnContext.Provider>
  );  
};
