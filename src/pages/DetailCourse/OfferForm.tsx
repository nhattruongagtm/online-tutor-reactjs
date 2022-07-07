import { Modal, Button, Input } from 'antd';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { courseApi } from '../../api/CourseApi';
import { UserAuth } from '../../reducers/loginSlice';

const { TextArea } = Input;
type Props = {
  user: UserAuth | undefined;
  courseId: number;
};

const OfferForm = ({ user, courseId }: Props) => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleOffer = () => {
    user &&   
      courseApi
        .offerPost(user.id, courseId, text)
        .then((res) => {
          if (res.data.id) {
            toast.success('Đăng ký nhận lớp thành công!');
          } else {
            toast.warning('Bạn đã đăng ký nhận khóa học này rồi!');
          }
          hideModal();
        })
        .catch((e) => {
          console.log(e);
          toast.error('Đã xảy ra lỗi! Vui lòng thử lại!');
          hideModal();
        });
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        className="course__intro__btn--receive"
      >
        Nhập lớp
      </Button>
      <Modal
        title="Đăng ký nhận lớp"
        visible={visible}
        onOk={handleOffer}
        onCancel={hideModal}
        cancelText="Hủy"
        okText="Đăng ký"
        className="register__popup"
      >
        <div className="register__modal">
          <p>Bạn sẽ đăng ký nhận lớp này chứ? </p>
          <span>
            Sau khi đề nghị, học viên sẽ chọn gia sư nào phù hợp và hệ thống sẽ
            tiến hành mở lớp nha!
          </span>
          <TextArea
            placeholder="Hãy giới thiệu bản thân để có thể thu hút học viên hơn nhé!"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default OfferForm;
