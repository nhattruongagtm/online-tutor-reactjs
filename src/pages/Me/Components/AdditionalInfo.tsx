import { CheckOutlined, EditFilled } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { ChangePassword } from './ChangePassword';
import { AdditionalInfo as Info } from '../../../models/user';
import useUser from '../../../hooks/useUser';
import { userApi } from '../../../api/userApi';
import { toast } from 'react-toastify';
const { TextArea } = Input;
type Props = {};

const AdditionalInfo = (props: Props) => {
  const [introduce, setIntroduce] = useState<boolean>(false);
  const [addition, setAddition] = useState<boolean>(false);
  const [user] = useUser();
  const [input, setInput] = useState<Info>({
    id: (user?.id as number) || 0,
    addition: '',
    introduction: '',
  });

  useEffect(() => {
    const loadInfo = async () => {
      if (user) {
        try {
          const resp = await userApi.getAdditionalInfo(user.id);
          setInput(resp.data);
        } catch (error) {}
      }
    };
    loadInfo();
  }, [user]);

  const handleUpdate = async () => {
    try {
      if (user) {
        const resp = await userApi.updateAdditionalInfo(user.id, input);
        if (resp.data) {
          toast.success('Thay đổi thông tin thành công!');
        } else {
          toast.error('Thay đổi thông tin thất bại!');
        }
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi vui lòng thử lại!');
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };
  const handleUpdateIntroduction = () => {
    setIntroduce(!introduce);
    if (introduce) {
      handleUpdate();
    }
  };
  const handleUpdateAddtion = () => {
    setAddition(!addition);
    if (addition) {
      handleUpdate();
    }
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
                onClick={handleUpdateIntroduction}
              ></Button>
            </div>
            <TextArea
              value={input.introduction}
              className="profile__area"
              disabled={!introduce}
              name="introduction"
              onChange={handleOnChange}
            ></TextArea>
          </div>
          <div className="profile__detail">
            <div className="profile__introduce__title">
              Thông tin thêm
              <Button
                type="primary"
                icon={<>{addition ? <CheckOutlined /> : <EditFilled />}</>}
                size="small"
                shape="circle"
                style={{ marginLeft: '5px' }}
                onClick={handleUpdateAddtion}
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
