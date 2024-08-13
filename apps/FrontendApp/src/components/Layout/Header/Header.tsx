import styles from '../Layout.module.css';
import { Button, Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import React from 'react';

export const Header = ()=>{
  return (
    <Layout.Header className={styles.header}>
      <div className={styles.title}><h1>Tittle</h1></div>
      <Button
        icon={<LogoutOutlined />}
        className={styles.logoutButton}
      >
        Logout
      </Button>
    </Layout.Header>
  )
}

