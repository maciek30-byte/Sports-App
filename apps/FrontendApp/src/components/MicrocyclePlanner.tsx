import React, { useState } from 'react';
import { Card, Modal, Button, Typography, Space, message, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './MicrocyclePlanner.module.css';
import CreateWorkoutForm from './Forms/CreateWorkoutForm/CreateWorkoutForm';

const { Title } = Typography;

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface DayPlan {
  type: 'workout' | 'rest';
  exercises?: any[];
}

const MicrocyclePlanner: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [workouts, setWorkouts] = useState<Record<string, DayPlan>>({});
  const [isSummaryModalVisible, setIsSummaryModalVisible] = useState(false);

  const handleDayClick = (day: string) => {
    setSelectedDay(day);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedDay(null);
  };

  const handleWorkoutSave = (day: string, workout: any) => {
    setWorkouts(prev => ({ ...prev, [day]: { type: 'workout', exercises: workout.exercises } }));
    handleModalClose();
  };

  const handleRestDay = (day: string) => {
    setWorkouts(prev => ({ ...prev, [day]: { type: 'rest' } }));
  };

  const handleMicrocycleComplete = () => {
    if (Object.keys(workouts).length === 7) {
      setIsSummaryModalVisible(true);
    } else {
      message.error('Please plan all days of the week.');
    }
  };

  const handleMicrocycleSubmit = () => {
    // TODO: Implement API call to save microcycle
    console.log('Submitting microcycle:', workouts);
    message.success('Microcycle submitted successfully!');
    setIsSummaryModalVisible(false);
    setWorkouts({});
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
      <div className={styles.weekGrid}>
        {daysOfWeek.map((day) => (
          <Dropdown overlay={menu(day)} trigger={['click']}>
            <Card
              key={day}
              className={`${styles.dayCard} ${workouts[day]?.type === 'workout' ? styles.hasWorkout : ''} ${workouts[day]?.type === 'rest' ? styles.restDay : ''}`}
            >
              <div className={styles.dayName}>{day}</div>
              {workouts[day]?.type === 'workout' && (
                <div className={styles.workoutInfo}>
                  {workouts[day].exercises!.length} exercises
                </div>
              )}
              {workouts[day]?.type === 'rest' && (
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
            onSave={(workout) => handleWorkoutSave(selectedDay, workout)}
            initialWorkout={workouts[selectedDay]?.type === 'workout' ? { exercises: workouts[selectedDay].exercises! } : undefined}
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
              {workouts[day]?.type === 'workout' ? (
                <ul>
                  {workouts[day].exercises!.map((exercise: any, index: number) => (
                    <li key={index}>
                      {exercise.exerciseName}: {exercise.sets} sets, {exercise.weight} kg, {exercise.reps} reps
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
