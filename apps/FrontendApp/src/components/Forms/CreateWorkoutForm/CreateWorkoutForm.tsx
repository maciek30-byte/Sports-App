import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select, Space } from 'antd';

const { Option } = Select;

interface CreateWorkoutFormProps {
  onSave: (workout: any) => void;
  initialWorkout?: any;
  selectedDay?: string;
}

const CreateWorkoutForm: React.FC<CreateWorkoutFormProps> = ({ onSave, initialWorkout, selectedDay }) => {
  const [form] = Form.useForm();
  const [exercises, setExercises] = useState<any[]>(initialWorkout?.exercises || []);

  useEffect(() => {
    if (selectedDay) {
      form.setFieldsValue({ day: selectedDay });
    }
  }, [selectedDay, form]);

  const onFinish = (values: any) => {
    const workout = {
      day: values.day,
      exercises: exercises.map((exercise, index) => ({
        ...exercise,
        exerciseName: values[`exerciseName${index}`],
        sets: values[`sets${index}`],
        reps: values[`reps${index}`],
        weight: values[`weight${index}`],
      })),
    };
    onSave(workout);
  };

  const addExercise = () => {
    setExercises([...exercises, {}]);
  };

  const removeExercise = (index: number) => {
    const newExercises = [...exercises];
    newExercises.splice(index, 1);
    setExercises(newExercises);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="day" label="Dzień tygodnia" rules={[{ required: true }]}>
        <Select disabled={!!selectedDay}>
          {['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'].map((day) => (
            <Option key={day} value={day}>
              {day}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {exercises.map((_, index) => (
        <Space key={index} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
          <Form.Item
            name={`exerciseName${index}`}
            rules={[{ required: true, message: 'Wprowadź nazwę ćwiczenia' }]}
          >
            <Input placeholder="Nazwa ćwiczenia" />
          </Form.Item>
          <Form.Item
            name={`sets${index}`}
            rules={[{ required: true, message: 'Wprowadź liczbę serii' }]}
          >
            <InputNumber min={1} placeholder="Serie" />
          </Form.Item>
          <Form.Item
            name={`reps${index}`}
            rules={[{ required: true, message: 'Wprowadź liczbę powtórzeń' }]}
          >
            <InputNumber min={1} placeholder="Powtórzenia" />
          </Form.Item>
          <Form.Item
            name={`weight${index}`}
            rules={[{ required: true, message: 'Wprowadź ciężar' }]}
          >
            <InputNumber min={0} step={0.5} placeholder="Ciężar (kg)" />
          </Form.Item>
          <Button onClick={() => removeExercise(index)}>Usuń</Button>
        </Space>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={addExercise} block>
          Dodaj ćwiczenie
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Zapisz trening
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateWorkoutForm;
