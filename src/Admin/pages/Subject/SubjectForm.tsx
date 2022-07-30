import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { subjectApi } from '../../../api/subjectApi';
import { Subject } from '../../../models/subject';
import { edit as editSubject } from '../../../reducers/subjectSlice';
import { RootState } from '../../../store';
type Props = {};

const SubjectForm = (props: Props) => {
  const store = useSelector((state: RootState) => state.subject);
  const { edit, list, loading } = store;
  const dispatch = useDispatch();
  const onFinish = async (data: Subject) => {
    try {
      if (edit) {
        const resp = await subjectApi.updateSubject(edit.id as number, data);
        const { data: res } = resp;
        if (res) {
          dispatch(editSubject(null));
          toast.success('Cập nhật môn học thành công!');
        } else {
          toast.error('Cập nhật môn học thất bại!');
        }
      } else {
        const resp = await subjectApi.createSubject(data);
        const { data: res } = resp;
        if (res) {
          toast.success('Tạo môn học thành công!');
        } else {
          toast.error('Tạo môn học thất bại!');
        }
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi!');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="create__form">
      <div className="title">
        {edit ? 'Cập nhật môn học' : 'Thêm môn học'}{' '}
        <span style={{ marginLeft: '10px', fontSize: '5px' }}>
          {' '}
          {edit && (
            <Button
              size="small"
              htmlType="submit"
              shape="round"
              onClick={() => dispatch(editSubject(null))}
            >
              Hủy
            </Button>
          )}
        </span>
      </div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        fields={[
          {
            name: ['name'],
            value: edit ? edit.name : '',
          },
          {
            name: ['description'],
            value: edit ? edit.description : '',
          },
        ]}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Tên môn học:"
          name="name"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên môn học!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả:" name="description">
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {edit ? 'Cập nhật' : 'Tạo môn học'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SubjectForm;
