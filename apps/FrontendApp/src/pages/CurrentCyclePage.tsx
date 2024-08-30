import React, { useState } from 'react';
import { Typography, Card, List, Button, Modal, Form, InputNumber, message } from 'antd';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  completed: boolean;
  actualSets?: number;
  actualReps?: number;
  actualWeight?: number;
}

interface Workout {
  date: string;
  exercises: Exercise[];
}

// Mock data - w rzeczywistości to będzie pobierane z backendu
const mockWorkout: Workout = {
  date: '2023-08-30',
  exercises: [
    { id: '1', name: 'Przysiad', sets: 3, reps: 8, weight: 100, completed: false },
    { id: '2', name: 'Martwy ciąg', sets: 3, reps: 6, weight: 120, completed: false },
    { id: '3', name: 'Wyciskanie sztangi', sets: 3, reps: 10, weight: 80, completed: false },
  ],
};

const CurrentCyclePage: React.FC = () => {
  const [workout, setWorkout] = useState<Workout>(mockWorkout);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCompleteExercise = (exerciseId: string) => {
    setWorkout(prevWorkout => ({
      ...prevWorkout,
      exercises: prevWorkout.exercises.map(exercise =>
        exercise.id === exerciseId ? { ...exercise, completed: true } : exercise
      ),
    }));
    message.success('Ćwiczenie oznaczone jako wykonane!');
  };

  const handleEditClick = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setIsModalVisible(true);
    form.setFieldsValue({
      actualSets: exercise.actualSets || exercise.sets,
      actualReps: exercise.actualReps || exercise.reps,
      actualWeight: exercise.actualWeight || exercise.weight,
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      setWorkout(prevWorkout => ({
        ...prevWorkout,
        exercises: prevWorkout.exercises.map(exercise =>
          exercise.id === editingExercise?.id
            ? { ...exercise, ...values, completed: true }
            : exercise
        ),
      }));
      setIsModalVisible(false);
      message.success('Wyniki ćwiczenia zaktualizowane!');
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Trening na dzień {workout.date}</Title>
      <Card>
        <List
          dataSource={workout.exercises}
          renderItem={exercise => (
            <List.Item
              actions={[
                exercise.completed ? (
                  <Button icon={<CheckOutlined />} type="primary" disabled>
                    Wykonane
                  </Button>
                ) : (
                  <Button
                    icon={<CheckOutlined />}
                    onClick={() => handleCompleteExercise(exercise.id)}
                  >
                    Oznacz jako wykonane
                  </Button>
                ),
                <Button
                  icon={<EditOutlined />}
                  onClick={() => handleEditClick(exercise)}
                >
                  Edytuj wyniki
                </Button>
              ]}
            >
              <List.Item.Meta
                title={exercise.name}
                description={
                  <>
                    <Text>Zaplanowane: {exercise.sets} x {exercise.reps} po {exercise.weight} kg</Text>
                    {exercise.completed && exercise.actualSets && exercise.actualReps && exercise.actualWeight && (
                      <Text type="success"> | Wykonane: {exercise.actualSets} x {exercise.actualReps} po {exercise.actualWeight} kg</Text>
                    )}
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>
      <Modal
        title="Edytuj wyniki ćwiczenia"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="actualSets" label="Wykonane serie">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="actualReps" label="Wykonane powtórzenia">
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item name="actualWeight" label="Użyty ciężar (kg)">
            <InputNumber min={0} step={0.5} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CurrentCyclePage;
