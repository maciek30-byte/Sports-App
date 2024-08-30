import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, List, Card, Space, Typography, Select, Modal, Switch, Popconfirm } from 'antd';
import { PlusOutlined, SaveOutlined, CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './CreateWorkoutForm.module.css';

const { Title, Text } = Typography;
const { Option } = Select;

const CreateWorkoutForm = () => {
  const [form] = Form.useForm();
  const [exercises, setExercises] = useState([]);
  const [workoutDay, setWorkoutDay] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);

  const onFinish = (values) => {
    setExercises([...exercises, { ...values, id: Date.now(), status: 'pending', missed: false }]);
    form.resetFields(['exerciseName', 'sets', 'weight']);
  };

  const saveWorkout = () => {
    console.log('Saving workout for', workoutDay, ':', exercises);
  };

  const toggleExerciseStatus = (exerciseId) => {
    setExercises(exercises.map(exercise =>
      exercise.id === exerciseId
        ? { ...exercise, status: exercise.status === 'completed' ? 'pending' : 'completed' }
        : exercise
    ));
  };

  const openEditModal = (exercise) => {
    setEditingExercise(exercise);
    setEditModalVisible(true);
  };

  const handleEdit = (values) => {
    setExercises(exercises.map(exercise =>
      exercise.id === editingExercise.id
        ? {
          ...exercise,
          ...values,
          status: 'failed',
          sets: values.actualSets,
          weight: values.actualWeight
        }
        : exercise
    ));
    setEditModalVisible(false);
  };

  const handleMissedChange = (checked) => {
    if (checked) {
      setExercises(exercises.map(exercise =>
        exercise.id === editingExercise.id
          ? { ...exercise, status: 'failed', missed: true, sets: 0, weight: 0 }
          : exercise
      ));
      setEditModalVisible(false);
    }
  };

  const handleDelete = (exerciseId) => {
    setExercises(exercises.filter(exercise => exercise.id !== exerciseId));
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <Title level={2} className={styles.formTitle}>Create Workout</Title>
        <Select
          className={styles.daySelect}
          placeholder="Select workout day"
          onChange={(value) => setWorkoutDay(value)}
        >
          {daysOfWeek.map(day => (
            <Option key={day} value={day}>{day}</Option>
          ))}
        </Select>
        <Form
          form={form}
          name="create_workout"
          onFinish={onFinish}
          layout="vertical"
          className={styles.form}
        >
          <Form.Item
            name="exerciseName"
            rules={[{ required: true, message: 'Please input the exercise name!' }]}
            className={styles.formItem}
          >
            <Input placeholder="Exercise Name" />
          </Form.Item>
          <Form.Item
            name="sets"
            rules={[{ required: true, message: 'Please input the number of sets!' }]}
            className={styles.formItem}
          >
            <InputNumber min={1} placeholder="Sets" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="weight"
            rules={[{ required: true, message: 'Please input the weight!' }]}
            className={styles.formItem}
          >
            <InputNumber min={0} step={0.5} placeholder="Weight (kg)" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
              Add Exercise
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className={styles.listSection}>
        <List
          dataSource={exercises}
          renderItem={(item) => (
            <List.Item>
              <Card
                className={`${styles.exerciseCard} ${item.status === 'completed' ? styles.completedExercise : ''}`}
              >
                <div className={styles.exerciseContent}>
                  <div>
                    <p className={styles.exerciseInfo}><strong>Exercise:</strong> {item.exerciseName}</p>
                    <p className={styles.exerciseInfo}><strong>Sets:</strong> {item.sets}</p>
                    <p className={styles.exerciseInfo}><strong>Weight:</strong> {item.weight} kg</p>
                    {item.status === 'failed' && (
                      <p className={styles.exerciseInfo}><strong>Missed:</strong> {item.missed ? 'Yes' : 'No'}</p>
                    )}
                  </div>
                  <div className={styles.exerciseActions}>
                    <Button
                      type={item.status === 'completed' ? 'primary' : 'default'}
                      icon={<CheckOutlined />}
                      onClick={() => toggleExerciseStatus(item.id)}
                    />
                    <Button
                      type={item.status === 'failed' ? 'primary' : 'default'}
                      icon={<CloseOutlined />}
                      onClick={() => openEditModal(item)}
                    />
                    <Popconfirm
                      title="Are you sure you want to delete this exercise?"
                      onConfirm={() => handleDelete(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                      />
                    </Popconfirm>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>

      <div className={styles.buttonSection}>
        <Space>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={saveWorkout}
            disabled={exercises.length === 0 || !workoutDay}
          >
            Save Workout
          </Button>
        </Space>
      </div>

      <Modal
        title="Edit Exercise"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form
          onFinish={handleEdit}
          initialValues={{
            actualSets: editingExercise?.sets,
            actualWeight: editingExercise?.weight,
            missed: editingExercise?.missed
          }}
          layout="vertical"
        >
          <Form.Item
            name="actualSets"
            label="Actual Sets"
            rules={[{ required: true, message: 'Please input the actual number of sets!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="actualWeight"
            label="Actual Weight"
            rules={[{ required: true, message: 'Please input the actual weight!' }]}
          >
            <InputNumber min={0} step={0.5} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="missed" label="Missed" valuePropName="checked">
            <Switch onChange={handleMissedChange} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateWorkoutForm;
