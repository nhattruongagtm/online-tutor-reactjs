import React, { useState } from 'react';
import './filter.scss';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
type Props = {
  onGetSearch: (text: string) => void;
};
const Filter = ({ onGetSearch }: Props) => {
  const [input, setInput] = useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onGetSearch(value);
  };
  return (
    <div className="filter__options">
      <Input.Group compact>
        <Input
          style={{
            width: 'calc(200px)',
          }}
          onChange={handleOnChange}
          value={input}
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
