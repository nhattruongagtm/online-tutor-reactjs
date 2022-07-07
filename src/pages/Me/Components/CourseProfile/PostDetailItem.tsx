import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Modal } from 'antd';
import { ClassItem } from '../../../../components/WaitingClassList/WaitingClassList';
import OffterItem from './OfferItem';
import OfferItem from './OfferItem';
import { postApi } from '../../../../api/postApi';
type Props = {
  record: ClassItem;
};

const PostDetailItem = ({ record }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [parners, setParners] = useState([]);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    postApi
      .getOffers(record.id)
      .then((res) => {
        const { data } = res;
        const list = data.map((item: any) => {
          return {
            parner: item.tutor.account,
            content: item.content,
          };
        });
        setParners(list);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <Button onClick={() => setIsModalVisible(!isModalVisible)}>
        Xem {record.offer}/3 đề nghị
      </Button>
      <Modal
        title="Danh sách gia sư đã đề nghị khóa học"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="offer__modal"
      >
        <div className="offer__list">
          {parners.map((item) => (
            <OfferItem info={item} />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default PostDetailItem;
