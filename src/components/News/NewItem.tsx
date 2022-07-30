import React from 'react';
import {
  EditOutlined,
  EllipsisOutlined,
  LikeOutlined,
  SettingOutlined,
  DislikeOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { Blog } from '../../models/blog';
import Parser from 'html-react-parser';

const { Meta } = Card;

type Props = {
  item: Blog;
};

const NewItem = ({ item }: Props) => {
  return (
    <div className="news__card">
      <div className="news__date">{`Vào lúc ${new Date(
        item.createdDate as number
      ).toLocaleString()}`}</div>
      <Card
        style={
          {
            // width: 300,
          }
        }
        // cover={
        //   <img
        //     alt="example"
        //     src="https://icdn.24h.com.vn/upload/3-2022/images/2022-07-16/1657962485-72c2735b7a18f97301eeb7872b2312f1-width645height484.jpg"
        //   />
        // }
        actions={[
          <div className="item__action">
            <span>58</span>{' '}
            <span>
              <LikeOutlined key="like" />
            </span>
          </div>,
          <div className="item__action">
            <span>2</span>
            <span>
              <DislikeOutlined key="dislike" />
            </span>
          </div>,
          <div className="item__action">
            <span>1596</span>
            <span>
              <EyeOutlined key="views" />
            </span>
          </div>,
        ]}
      >
        <Meta
          // avatar={
          //   <Avatar src="https://icdn.24h.com.vn/upload/3-2022/images/2022-07-16/1657962485-72c2735b7a18f97301eeb7872b2312f1-width645height484.jpg" />
          // }
          // title="Đã tìm ra tài xế gây tai nạn trong vụ 'làm ơn mắc oán' ở Quảng Ninh"
          description={Parser(item.content)}
        />
      </Card>
    </div>
  );
};

export default NewItem;
