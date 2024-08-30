import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import styles from '../Layout.module.css';

export const NavMenu = () => {
  return (
    <Layout.Sider className={styles.sider}>
      <Menu
        mode="inline"
        className={styles.menu}
      >
        <Menu.Item key="dashboard">
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="character-level">
          <Link to="/character-level">Poziom Postaci</Link>
        </Menu.Item>
        <Menu.Item key="design-microcycle">
          <Link to="/design-microcycle">Zaprojektuj MikroCykl</Link>
        </Menu.Item>
        <Menu.Item key="personal-records">
          <Link to="/personal-records">Twoje Rekordy</Link>
        </Menu.Item>
        <Menu.Item key="assistant-suggestions">
          <Link to="/assistant-suggestions">Sugestie Asystenta</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};
