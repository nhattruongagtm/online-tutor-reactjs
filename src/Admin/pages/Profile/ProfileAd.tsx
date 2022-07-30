import React, { useState } from 'react';
import { Form, Input, Button, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

type Props = {};

const ProfileAd = (props: Props) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
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
      <Form.Item label="" valuePropName="fileList">
        avatar
      </Form.Item>
      <Form.Item
        label="Email"  
        name="email"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập email!',
          },
        ]}
      >
        <Input disabled />
      </Form.Item>

      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu!',
          },
        ]}
      >
        <Input.Password disabled />
      </Form.Item>
      <Form.Item
        label="Họ Tên"
        name="displayName"
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập họ tên của bạn!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Thay đổi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileAd;
