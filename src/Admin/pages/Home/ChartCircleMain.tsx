import React, { useContext } from 'react';
import { ChartColumnContext, options } from './ChartColumn';
import { ChartZoom } from './ChartZoom';
import './chartMain.scss';
import { Bar, Doughnut } from 'react-chartjs-2';
import { ChartCircleContext } from './ChartCircle';
interface ChartCircleMainProps {}

export const ChartCircleMain = (props: ChartCircleMainProps) => {
    const dataCircle = useContext(ChartCircleContext);  
  return (
    <div className="chart__main">
      
      <Doughnut data={dataCircle} className="chart__js" />
    </div>
  );
};
