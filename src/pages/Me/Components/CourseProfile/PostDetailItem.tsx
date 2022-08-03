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
  const [parners, setParners] = useState<any[]>([]);
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
        console.log('data', data);
        const list = data.map((item: any) => {
          return {
            parner: item.account,
            content: item.content,
          };
        });
        setParners(list);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleDeleteItem = (uid: number, pid: number) => {
    setParners(
      parners.filter((item) => item.parner.id !== uid && record.id === pid)
    );
  };

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
            <OfferItem
              info={item}
              pID={record.id}
              key={item.parner}
              onDelete={handleDeleteItem}
            />
          ))}

          {parners.length === 0 && <span>Không có đề nghị nào.</span>}
        </div>
      </Modal>
    </>
  );
};

export default PostDetailItem;
