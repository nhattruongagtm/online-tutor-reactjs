import React, { useEffect, useState } from 'react';
import { Pie } from '@ant-design/plots';
import { ResponseData } from '../../../models/response';
import { statisticApi } from '../../../api/statisticApi';
import { MonthYear } from './ChartCircleMain';

type Props = {
  type: number;
  date: MonthYear;
};

export interface CircleData {
  type: string;
  value: number;
}

const CircleChart = ({ type, date }: Props) => {
  const [data, setData] = useState<CircleData[]>([]);
  useEffect(() => {
    const loadSubjectData = async () => {
      try {
        let resp: ResponseData<CircleData[]>;
        switch (type) {
          case 0:
            resp = await statisticApi.getRevenueBySubjectDays(
              date.month,
              date.year
            );
            console.log(resp.data);
            setData(resp.data);
        }
      } catch (error) {}
    };
    loadSubjectData();
  }, [type, date]);   
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        // content: 'AntV\nG2Plot',
      },
    },
  };
  return <Pie {...config} />;
};

export default CircleChart;
