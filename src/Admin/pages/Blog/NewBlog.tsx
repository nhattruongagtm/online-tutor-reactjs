import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { blogApi } from '../../../api/blogApi';
import { storageApi } from '../../../api/storageApi';
import useUser from '../../../hooks/useUser';
import { Blog } from '../../../models/blog';
import { RootState } from '../../../store';
import TextEditor from './TextEditor';
type Props = {};

const { TextArea } = Input;

function NewBlog(props: Props) {
  const edit = useSelector((state: RootState) => state.blog.isEdit);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const [user] = useUser();
  const history = useHistory();
  const getThumbnail = () => {
    const index = text.indexOf('<img src=');
    const ref = text;
    if (index > -1) {
      const link = text.substring(
        index + 10,
        ref.substring(index + 10).indexOf(' alt=')
      );
      return link;
    }
    return 'https://previews.123rf.com/images/sodis/sodis1803/sodis180300030/97134777-%C3%A9ducation-en-ligne-cours-de-formation-tutoriels-%C3%A9tudes-%C3%A0-distance-e-learning-illustration-vectoriell.jpg';
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    // if (user) {
    if (edit) {
      console.log({ ...edit, content: text });
      blogApi
        .updateBlog(edit.id as number, { ...edit, content: text })
        .then((res) => {
          if (res) {
            const { data } = res;

            if (data) {
              toast.success('Cập nhật thành công!');
            } else {
              toast.error('Cập nhật thất bại!');
            }
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error('Đã xảy ra lỗi! Vui lòng thử lại!');
        });
    } else {
    }

    // }
  };
  const handleGetValue = (text: string) => {
    setText(text);
  };

  const CreateBlogForm = () => {
    const onFinish = async (values: Blog) => {
      if (edit) {
        const a = new Blob([values.thumbnail.file.originFileObj], {
          type: 'image/png',
        });
        const url = await storageApi.uploadFile(
          new Date().getTime(),
          a,
          'blogs'
        );
        blogApi
          .updateBlog(edit.id as number, {
            ...edit,
            content: text,
            title: values.title,
            thumbnail: url,
          })
          .then((res) => {
            if (res) {
              const { data } = res;

              if (data) {
                toast.success('Cập nhật thành công!');
              } else {
                toast.error('Cập nhật thất bại!');
              }
            }
          })
          .catch((e) => {
            console.log(e);
            toast.error('Đã xảy ra lỗi! Vui lòng thử lại!');
          });
      } else {
        const data: Blog = {
          title: values.title,
          content: text,
          dislikes: 0,
          likes: 0,
          views: 0,
          thumbnail: '',
          account: {
            id: 1,
          },
        };

        try {
          const a = new Blob([values.thumbnail.file.originFileObj], {
            type: 'image/png',
          });
          const url = await storageApi.uploadFile(
            new Date().getTime(),
            a,
            'blogs'
          );
          if (url) {
            const res = await blogApi.createBlog({ ...data, thumbnail: url });
            const { data: result } = res;
            if (result) {
              handleCancel();
              toast.success('Đăng bài thành công!');
            } else {
              toast.error('Đăng bài thất bại!');
            }
          } else {
            toast.error('Lỗi tải ảnh!');
          }
        } catch (error) {
          toast.error('Đã xảy ra lỗi!');
        }
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tiều đề blog"
          name="title"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tiêu đề!',
            },
          ]}
        >
          <TextArea defaultValue={edit && edit.title} rows={3} />
        </Form.Item>

        <Form.Item label="Thumbnail" name="thumbnail">
          <Upload action="/upload.do" listType="picture-card" maxCount={1}>
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {!edit ? 'Tạo Blog' : 'Cập nhật'}
          </Button>
        </Form.Item>
      </Form>
    );
  };
  return (
    <div className="new__blog">
      <TextEditor onGetValue={handleGetValue} edit={edit} />
      <div className="new__blog__action">
        <Button type="primary" className="btn-create" onClick={showModal}>
          {/* {!edit ? 'Thêm bài viết' : 'Cập nhật'} */}
          Tiếp theo
        </Button>
        <Modal
          title="Tạo Blog"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={<></>}
        >
          <CreateBlogForm />
        </Modal>
      </div>
    </div>
  );
}

export default NewBlog;
