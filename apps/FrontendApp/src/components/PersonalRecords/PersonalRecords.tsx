import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import styles from './PersonalRecords.module.css';
import { MicrocycleService } from '../../../AuthService/MicroCycleService';

interface Record {
  exercise: string;
  maxWeight: number;
}

const PersonalRecords: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    fetchPersonalRecords();
  }, []);

  const fetchPersonalRecords = async () => {
    try {
      const data = await MicrocycleService.getPersonalRecords();
      setRecords(data);
    } catch (error) {
      console.error('Failed to fetch personal records:', error);
    }
  };

  const columns = [
    {
      title: 'Exercise',
      dataIndex: 'exercise',
      key: 'exercise',
    },
    {
      title: 'Max Weight (kg)',
      dataIndex: 'maxWeight',
      key: 'maxWeight',
    },
  ];

  return (
    <div className={styles.recordsContainer}>
      <h2>Personal Records</h2>
      <Table dataSource={records} columns={columns} rowKey="exercise" />
    </div>
  );
};

export default PersonalRecords;
