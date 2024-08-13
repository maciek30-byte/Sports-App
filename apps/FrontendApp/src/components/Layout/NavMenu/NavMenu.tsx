import styles from '../Layout.module.css';
import { Layout, Menu } from 'antd';
import React from 'react';


export const NavMenu = () => {
  return (
    <Layout.Sider className={styles.sider}>
      <Menu
        mode="inline"
        className={styles.menu}
        items={[
          { key: 'dashboard', label: 'Dashboard' },
          { key: 'profile', label: 'Profile' },
          { key: 'settings', label: 'Settings' },
        ]}
      />
    </Layout.Sider>
  );
};

//@FIXME use React Router instead of this//
