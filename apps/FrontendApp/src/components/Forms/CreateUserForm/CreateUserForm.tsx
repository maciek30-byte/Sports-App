import React from 'react';
import { Form, Input, Button, Select, InputNumber, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './CreateUserForm.module.css';
import { RegisterUserValues } from '../types';
import { useStore } from '../../../../config/providers/MobxProvider';
import { observer } from 'mobx-react-lite';

const { Option } = Select;

export const CreateUserForm: React.FC = observer(() => {
  const [form] = Form.useForm();
  const { authStore } = useStore();
  const navigate = useNavigate();

  const onFinish = async (values: RegisterUserValues) => {
    try {
      await authStore.register(values.name, values.email, values.password, values.age, values.gender);
      message.success('User successfully registered');
      navigate('/login');
    } catch (error) {
      message.error('Registration error: ' + (error.response?.data?.msg || 'Unknown error'));
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h1>Create Account</h1>
      <Form
        form={form}
        name="user_create"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ gender: 'male' }}
        className={styles.userForm}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Invalid email format!' }
          ]}
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
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
});

export default CreateUserForm;
