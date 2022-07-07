import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import React from 'react';
import { Card, Popover, Button, Avatar } from 'antd';
const { Meta } = Card;

type Props = {
  info: any;
};

const OfferItem = ({ info }: Props) => {
  return (
    <Card
      style={{
        width: 300,
      }}
      className="card__offer"
      actions={[
        <Popover
          placement="left"
          content={
            <>
              <p className="title__offer__tooltip">Từ chối đề nghị này?</p>
              <Button danger>Hủy</Button> <Button>Đồng ý</Button>
            </>
          }
        >
          <Button danger>
            <StopOutlined key="setting" />
          </Button>
        </Popover>,
        <Popover
          placement="right"
          content={
            <>
              <p className="title__offer__tooltip">Chấp nhận đề nghị này?</p>
              <Button danger>Hủy</Button> <Button type='primary'>Đồng ý</Button>
            </>
          }
        >
          <Button type="primary">
            <CheckOutlined key="ellipsis" />
          </Button>
        </Popover>,
      ]}
    >
      <Meta
        avatar={
          <Avatar
            src={
              info.avatar ? info.avatar : 'https://joeschmoe.io/api/v1/random'
            }
          />
        }
        title={info.parner.displayName}
        description={info.content}
      />
    </Card>
  );
};

export default OfferItem;
