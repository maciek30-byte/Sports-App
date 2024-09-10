import React from 'react';
import { Typography, Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useStore } from '../../../config/providers/MobxProvider';
import { observer } from 'mobx-react-lite';
import UserProgress from '../UserProgress/UserProgress';
import styles from './Dashboard.module.css';

const { Title } = Typography;

export const Dashboard: React.FC = observer(() => {
  const { authStore } = useStore();

  return (
    <div className={styles.dashboard}>
      <Title level={2}>Welcome, {authStore.userName}!</Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <UserProgress />
        </Col>
        <Col span={8}>
          <Card title="Quick Actions" className={styles.card}>
            <Button type="primary" block>
              <Link to="/current-workout">Start Today's Workout</Link>
            </Button>
            <Button style={{ marginTop: '10px' }} block>
              <Link to="/design-microcycle">Plan New Microcycle</Link>
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Your Stats" className={styles.card}>
            <p>Current Microcycle: Week 2 of 4</p>
            <p>Workouts Completed: 8</p>
            <Button type="link" block>
              <Link to="/personal-records">View Personal Records</Link>
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
});

export default Dashboard;
