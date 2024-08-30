import React, { useState } from 'react';
import { Card, Modal, List, Typography } from 'antd';
import styles from './TrainingPage.module.css';

const { Title, Text } = Typography;

const mockWorkouts = {
  Monday: { exercises: [{ name: 'Squats', sets: 3, weight: 80 }, { name: 'Bench Press', sets: 4, weight: 60 }] },
  Wednesday: { exercises: [{ name: 'Deadlift', sets: 3, weight: 100 }, { name: 'Pull-ups', sets: 3, weight: 0 }] },
  Friday: { exercises: [{ name: 'Shoulder Press', sets: 3, weight: 40 }, { name: 'Bicep Curls', sets: 3, weight: 20 }] },
};

const WeeklyWorkoutSummary = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedDay(null);
  };

  return (
    <div className={styles.container}>
      <Title level={2}>Weekly Workout Summary</Title>
      <div className={styles.weekGrid}>
        {daysOfWeek.map((day) => (
          <Card
            key={day}
            className={`${styles.dayCard} ${mockWorkouts[day] ? styles.hasWorkout : ''}`}
            onClick={() => handleDayClick(day)}
          >
            <div className={styles.dayName}>{day}</div>
            {mockWorkouts[day] && (
              <div className={styles.workoutInfo}>
                {mockWorkouts[day].exercises.length} exercises
              </div>
            )}
          </Card>
        ))}
      </div>
      <Modal
        title={`Workout for ${selectedDay}`}
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedDay && mockWorkouts[selectedDay] ? (
          <div className={styles.modalForm}>
            <List
              className={styles.exerciseList}
              dataSource={mockWorkouts[selectedDay].exercises}
              renderItem={(item) => (
                <List.Item className={styles.exerciseItem}>
                  <Text strong>{item.name}</Text>: {item.sets} sets, {item.weight} kg
                </List.Item>
              )}
            />
          </div>
        ) : (
          <Text>No workout planned for this day.</Text>
        )}
      </Modal>
    </div>
  );
};

export default WeeklyWorkoutSummary;
