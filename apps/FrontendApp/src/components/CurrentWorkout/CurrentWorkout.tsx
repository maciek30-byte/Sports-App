import React, { useEffect, useState } from 'react';
import { Card, Checkbox, Button, message } from 'antd';

import { Exercise, WorkoutPlan } from '../../types/Microcycle';
import styles from './CurrentWorkout.module.css';
import { MicrocycleService } from '../../../AuthService/MicroCycleService';

const CurrentWorkout: React.FC = () => {
  const [workout, setWorkout] = useState<Exercise[]>([]);

  useEffect(() => {
    fetchCurrentWorkout();
  }, []);

  const fetchCurrentWorkout = async () => {
    try {
      const response = await MicrocycleService.getCurrentDayWorkout();
      if (response.type === 'workout') {
        setWorkout((response as WorkoutPlan).exercises);
      } else {
        message.info('Today is a rest day.');
      }
    } catch (error) {
      message.error('Failed to fetch current workout');
    }
  };

  const handleExerciseComplete = async (exerciseId: string, completed: boolean) => {
    try {
      await MicrocycleService.updateWorkoutProgress(exerciseId, completed);
      setWorkout(workout.map(exercise =>
        exercise.id === exerciseId ? { ...exercise, completed } : exercise
      ));
    } catch (error) {
      message.error('Failed to update exercise status');
    }
  };

  const handleGoalMet = async (exerciseId: string, goalMet: boolean) => {
    try {
      await MicrocycleService.updateWorkoutProgress(exerciseId, undefined, goalMet);
      setWorkout(workout.map(exercise =>
        exercise.id === exerciseId ? { ...exercise, goalMet } : exercise
      ));
    } catch (error) {
      message.error('Failed to update goal status');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Today's Workout</h2>
      {workout.map((exercise) => (
        <Card key={exercise.id} className={styles.exerciseCard}>
          <h3>{exercise.name}</h3>
          <p>{exercise.sets} sets x {exercise.reps} reps @ {exercise.weight} kg</p>
          <Checkbox
            checked={exercise.completed}
            onChange={(e) => handleExerciseComplete(exercise.id, e.target.checked)}
          >
            Completed
          </Checkbox>
          <Button
            type={exercise.goalMet ? "primary" : "default"}
            onClick={() => handleGoalMet(exercise.id, !exercise.goalMet)}
          >
            {exercise.goalMet ? "Goal Met" : "Mark Goal as Met"}
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default CurrentWorkout;
