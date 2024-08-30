import React from 'react';
import { Layout } from 'antd';
import styles from './Layout.module.css';
import { NavMenu } from './NavMenu/NavMenu';
import { Header } from './Header/Header';
import { Content, Footer } from 'antd/es/layout/layout';

export const LayoutContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout>
        <NavMenu />
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
      <Footer className={styles.footer}>©2024 Your Company</Footer>
    </Layout>
  );
};
