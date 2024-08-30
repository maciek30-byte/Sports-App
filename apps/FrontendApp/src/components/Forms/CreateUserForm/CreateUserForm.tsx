import React from 'react';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import styles from './CreateUserForm.module.css';
import { RegisterUserValues } from '../types';

const { Option } = Select;

export const CreateUserForm: React.FC = () => {
  const [form] = Form.useForm();


  const onFinish = (values: RegisterUserValues) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className={styles.formWrapper}>
      <h1>Create User</h1>
      <Form
        form={form}
        name="user_create"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ gender: 'male' }}
        className={styles.userForm}
      >
        <Form.Item
          name="login"
          label="Login"
          rules={[{ required: true, message: 'Please input your login!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="age"
          label="Age"
          rules={[{ required: true, message: 'Please input your age!' }]}
        >
          <InputNumber min={0} max={120} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select your gender!' }]}
        >
          <Select>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

//@TODO move rules and text contents to separate json files//
