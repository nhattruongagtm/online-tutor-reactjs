import { CheckOutlined, EditFilled } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { ChangePassword } from './ChangePassword';

const { TextArea } = Input;
type Props = {};

export interface InfoInput {
  introduce: string;
  addition: string;
}
const AdditionalInfo = (props: Props) => {
  const [introduce, setIntroduce] = useState<boolean>(false);
  const [addition, setAddition] = useState<boolean>(false);
  const [input, setInput] = useState<InfoInput>({
    introduce: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugiat inventore doloremque repellendus impedit autem laudantium omnis eius. Dolorum illo obcaecati architecto aliquid similique aliquam, nam iste ad omnis facilis itaque!',
    addition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugiat inventore doloremque repellendus impedit autem laudantium omnis eius. Dolorum illo obcaecati architecto ',
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };
  return (
    <div className="profile__more__change">
      <div className="profile__base__title profile__register">
        <p>Thông tin thêm</p>
      </div>
      <div className="profile__more__change__body">
        <div className="profile__change">
          <div className="profile__introduce">
            <div className="profile__introduce__title">
              Giới thiệu{' '}
              <Button
                type="primary"
                icon={<>{introduce ? <CheckOutlined /> : <EditFilled />}</>}
                size="small"
                shape="circle"
                style={{ marginLeft: '5px' }}
                onClick={() => setIntroduce(!introduce)}
              ></Button>
            </div>
            <TextArea
              value={input.introduce}
              className="profile__area"
              disabled={!introduce}
              name="introduce"
              onChange={handleOnChange}
            ></TextArea>
          </div>
          <div className="profile__detail">
            <div className="profile__introduce__title">Thông tin thêm
            <Button
                type="primary"
                icon={<>{addition ? <CheckOutlined /> : <EditFilled />}</>}
                size="small"
                shape="circle"
                style={{ marginLeft: '5px' }}
                onClick={() => setAddition(!addition)}

              ></Button>
            </div>
            <TextArea
              value={input.addition}
              className="profile__area"
              disabled={!addition}
              name="addition"
              onChange={handleOnChange}  
            ></TextArea>
          </div>
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
