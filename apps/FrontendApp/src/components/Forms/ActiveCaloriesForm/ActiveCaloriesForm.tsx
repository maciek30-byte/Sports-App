import React from 'react';
import { Form, InputNumber, DatePicker, Button } from 'antd';
import styles from './ActiveCaloriesForm.module.css';
import { ActiveCaloriesValues } from '../types';

export const ActiveCaloriesForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values: ActiveCaloriesValues) => {

    console.log('987this is date', values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className={styles.form}
    >
      <Form.Item
        label="Burned Calories"
        name="calories"
        rules={[
          { required: true, message: 'Please input the number of calories!' },
        ]}
      >
        <InputNumber min={0} className={styles.input} />
      </Form.Item>

      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: 'Please select the date!' }]}
      >
        <DatePicker className={styles.datePicker} />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={styles.submitButton}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

