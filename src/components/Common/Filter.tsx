import React from 'react';
import './filter.scss';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
type Props = {};
const Filter = (props: Props) => {
  return (
    <div className="filter__options">
      <Input.Group compact>
        <Input
          style={{
            width: 'calc(200px)',
          }}
          defaultValue=""
        />
        <Button
          type="primary"
          shape="circle"
          size="middle"
          icon={<SearchOutlined />}
        ></Button>
      </Input.Group>
    </div>
  );
};

export default Filter;
