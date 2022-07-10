import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { getDaysInMonth } from '../../../utils/moment';
import { IColumnData } from '../../../models/statistic';
import { statisticApi } from '../../../api/statisticApi';
import { ResponseData } from '../../../models/response';
interface Props {
  type: number;
}

export type IColumn = IColumnData[];

const ColumnChart = ({ type }: Props) => {
  const [data, setData] = useState<IColumn>([]);

  useEffect(() => {
    const getRevenueByDays = async () => {
      try {
        let resp: ResponseData<IColumnData[]>;
        switch (type) {
          case 0:
            resp = await statisticApi.getRevenueByDays();
            setData(resp.data);
            break;
          case 1:
            resp = await statisticApi.getRevenueByWeek();
            console.log(resp.data)  
            setData(resp.data);
            break;
          case 2:
            resp = await statisticApi.getRevenueByMonth();
            setData(resp.data);
            break;
        }
      } catch (error) {
        console.log(error);
      }
    };   
    getRevenueByDays();
  }, [type]);
  const config = {
    data,
    xField: 'type',
    yField: 'revenue',
    label: {
      position: 'middle',
      // 'top', 'bottom', 'middle',
      style: {
        fill: '#FFFFFF',  
        opacity: 0.6,
      },
    },
    theme: {
      styleSheet: {
        brandColor: '#ff74a2',
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  return <Column {...(config as any)} />;
};

export default ColumnChart;
