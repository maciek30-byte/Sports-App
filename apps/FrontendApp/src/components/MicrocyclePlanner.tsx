import React, { useState } from 'react';
import { Card, Modal, Button, Typography, Space, message, Menu, Dropdown, InputNumber } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import styles from './MicrocyclePlanner.module.css';
import { DayPlan, Microcycle } from '../models/MicroCycle';
import { MicrocycleService } from '../../AuthService/MicroCycleService';
import CreateWorkoutForm from './Forms/CreateWorkoutForm/CreateWorkoutForm';

const { Title } = Typography;

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const MicrocyclePlanner: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [microcycle, setMicrocycle] = useState<Microcycle>({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
    dayPlans: {},
    weekCount: 1
  });
  const [isSummaryModalVisible, setIsSummaryModalVisible] = useState(false);

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedDay(null);
  };

  const handleWorkoutSave = (workout: DayPlan) => {
    setMicrocycle(prev => ({
      ...prev,
      dayPlans: { ...prev.dayPlans, [workout.day]: workout },
    }));
    handleModalClose();
  };

  const handleRestDay = (day: string) => {
    setMicrocycle(prev => ({
      ...prev,
      dayPlans: { ...prev.dayPlans, [day]: { day, type: 'rest' } },
    }));
  };

  const handleMicrocycleComplete = () => {
    if (Object.keys(microcycle.dayPlans).length === 7) {
      setIsSummaryModalVisible(true);
    } else {
      message.error('Please plan all days of the week.');
    }
  };

  const handleMicrocycleSubmit = async () => {
    try {
      await MicrocycleService.createMicrocycle(microcycle);
      message.success('Microcycle submitted successfully!');
      setIsSummaryModalVisible(false);
      setMicrocycle({
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
        dayPlans: {},
        weekCount: 1
      });
    } catch (error) {
      message.error('Failed to submit microcycle. Please try again.');
    }
  };

  const menu = (day: string) => (
    <Menu>
      <Menu.Item key="1" onClick={() => handleDayClick(day)}>
        Add Workout
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleRestDay(day)}>
        Mark as Rest Day
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.container}>
      <Title level={2}>Plan Your Microcycle</Title>
      <Space className={styles.weekCountInput}>
        <span>Number of weeks:</span>
        <InputNumber
          min={1}
          max={12}
          defaultValue={1}
          onChange={(value) => setMicrocycle(prev => ({ ...prev, weekCount: value }))}
        />
      </Space>
      <div className={styles.weekGrid}>
        {daysOfWeek.map((day) => (
          <Dropdown overlay={menu(day)} trigger={['click']} key={day}>
            <Card
              className={`${styles.dayCard} ${microcycle.dayPlans[day]?.type === 'workout' ? styles.hasWorkout : ''} ${microcycle.dayPlans[day]?.type === 'rest' ? styles.restDay : ''}`}
            >
              <div className={styles.dayName}>{day}</div>
              {microcycle.dayPlans[day]?.type === 'workout' && (
                <div className={styles.workoutInfo}>
                  {microcycle.dayPlans[day].exercises?.length} exercises
                </div>
              )}
              {microcycle.dayPlans[day]?.type === 'rest' && (
                <div className={styles.restInfo}>
                  Rest Day
                </div>
              )}
              <DownOutlined className={styles.dropdownIcon} />
            </Card>
          </Dropdown>
        ))}
      </div>
      <Modal
        title={`Plan workout for ${selectedDay}`}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={800}
      >
        {selectedDay && (
          <CreateWorkoutForm
            onSave={handleWorkoutSave}
            initialWorkout={microcycle.dayPlans[selectedDay]?.type === 'workout' ? microcycle.dayPlans[selectedDay] : undefined}
            selectedDay={selectedDay}
          />
        )}
      </Modal>
      <Space className={styles.actionButtons}>
        <Button type="primary" onClick={handleMicrocycleComplete}>
          Complete Microcycle
        </Button>
      </Space>
      <Modal
        title="Microcycle Summary"
        visible={isSummaryModalVisible}
        onCancel={() => setIsSummaryModalVisible(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleMicrocycleSubmit}>
            Submit Microcycle
          </Button>,
        ]}
        width={800}
      >
        <div>
          {daysOfWeek.map((day) => (
            <div key={day}>
              <h3>{day}</h3>
              {microcycle.dayPlans[day]?.type === 'workout' ? (
                <ul>
                  {microcycle.dayPlans[day].exercises?.map((exercise, index) => (
                    <li key={index}>
                      {exercise.name}: {exercise.sets} sets, {exercise.reps} reps, {exercise.weight} kg
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Rest Day</p>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default MicrocyclePlanner;
