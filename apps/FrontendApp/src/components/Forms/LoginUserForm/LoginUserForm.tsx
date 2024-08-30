import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { observer } from 'mobx-react-lite';
import styles from './LoginUserForm.module.css';
import { OutMessagesService } from '../../../../messages/outMessages/OutMessagesService';
import { useStore } from '../../../../config/providers/MobxProvider';
import { LoginValues } from '../types';

const LoginForm: React.FC = observer(() => {
  const [form] = Form.useForm();
  const { authStore } = useStore();

  const onFinish = async (values: LoginValues) => {
    try {
      await OutMessagesService.sendLoginMessage(values);
      message.success('Zalogowano pomyślnie');
      authStore.isUserLoggedIn = true;
      authStore.userName = values.email;
    } catch (error) {
      message.error(
        'Błąd logowania: ' + (error.response?.data?.msg || 'Nieznany błąd')
      );
      authStore.isUserLoggedIn = false;
    }
  };

  return (
    <div className={styles.loginFormWrapper}>
      <div className={styles.loginFormContainer}>
        <div className={styles.loginFormHeader}>
          <h2>Login</h2>
        </div>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          className={styles.loginForm}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Proszę podać email!' },
              { type: 'email', message: 'Nieprawidłowy format email!' },
            ]}
          />
          <Input.Password name="password" type="password" />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Zaloguj
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});

export default LoginForm;

//@TODO move text away from component//
