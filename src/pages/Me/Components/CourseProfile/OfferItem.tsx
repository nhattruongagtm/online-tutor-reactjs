import { CheckOutlined, StopOutlined } from '@ant-design/icons';
import React from 'react';
import { Card, Popover, Button, Avatar } from 'antd';
import { postApi } from '../../../../api/postApi';
import useUser from '../../../../hooks/useUser';
import { toast } from 'react-toastify';
const { Meta } = Card;
type Props = {
  info: any;
  pID: number;
  onDelete?: (uid: number, pid: number) => void;
};

const OfferItem = ({ info, pID, onDelete }: Props) => {
  const [user] = useUser();

  const handleCancelOffer = async () => {
    if (user) {
      try {
        const resp = await postApi.cancelOffer(info.parner.id, pID);
        if (resp.data) {
          onDelete && onDelete(info.parner.id, pID);
          toast.success('Từ chối đề nghị thành cống!');
        } else {
          toast.error('Từ chối đề nghị thất bại!');
        }
      } catch (error) {
        toast.error('Đã xảy ra lỗi!');
      }
    }
  };
  const handleAgreeOffer = () =>{
    toast.success("Đề nghị thành công!");
  }
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
              <Button danger>Hủy</Button>{' '}
              <Button onClick={handleCancelOffer}>Đồng ý</Button>
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
              <Button danger>Hủy</Button> <Button type="primary" onClick={handleAgreeOffer}>Đồng ý</Button>
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
              info.parner
                ? info.parner.avatar
                : 'https://joeschmoe.io/api/v1/random'
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
