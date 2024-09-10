import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './LoginUserForm.module.css';
import { useStore } from '../../../../config/providers/MobxProvider';
import { LoginValues } from '../types';

const LoginForm: React.FC = observer(() => {
  const [form] = Form.useForm();
  const { authStore } = useStore();

  const onFinish = async (values: LoginValues) => {
    try {
      await authStore.login(values.email, values.password);
      message.success('Zalogowano pomyślnie');
    } catch (error) {
      message.error(
        'Błąd logowania: ' + (error.response?.data?.msg || 'Nieznany błąd')
      );
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
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Proszę podać hasło!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Zaloguj
            </Button>
          </Form.Item>
        </Form>
        <div className={styles.registerLink}>
          Nie masz konta? <Link to="/register">Zarejestruj się</Link>
        </div>
      </div>
    </div>
  );
});

export default LoginForm;
