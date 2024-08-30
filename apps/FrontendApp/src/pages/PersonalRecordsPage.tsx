import React from 'react';
import { Typography, Card, Table, Tag } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;

interface PersonalRecord {
  key: string;
  exercise: string;
  weight: number;
  date: string;
  category: 'Siłowe' | 'Cardio' | 'Olimpijskie';
}

const mockData: PersonalRecord[] = [
  { key: '1', exercise: 'Przysiad', weight: 150, date: '2023-08-15', category: 'Siłowe' },
  { key: '2', exercise: 'Martwy ciąg', weight: 200, date: '2023-07-20', category: 'Siłowe' },
  { key: '3', exercise: 'Wyciskanie sztangi', weight: 100, date: '2023-08-01', category: 'Siłowe' },
  { key: '4', exercise: 'Podciąganie', weight: 30, date: '2023-08-10', category: 'Siłowe' },
  { key: '5', exercise: 'Bieg na 5km', weight: 0, date: '2023-07-30', category: 'Cardio' },
  { key: '6', exercise: 'Rwanie', weight: 80, date: '2023-08-05', category: 'Olimpijskie' },
];

const PersonalRecordsPage: React.FC = () => {
  const columns = [
    {
      title: 'Ćwiczenie',
      dataIndex: 'exercise',
      key: 'exercise',
    },
    {
      title: 'Rekord (kg)',
      dataIndex: 'weight',
      key: 'weight',
      sorter: (a: PersonalRecord, b: PersonalRecord) => a.weight - b.weight,
    },
    {
      title: 'Data ustanowienia',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => dayjs(text).format('DD.MM.YYYY'),
      sorter: (a: PersonalRecord, b: PersonalRecord) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Kategoria',
      key: 'category',
      dataIndex: 'category',
      render: (tag: string) => {
        let color = tag === 'Siłowe' ? 'green' : tag === 'Cardio' ? 'volcano' : 'geekblue';
        return (
          <Tag color={color} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Twoje Rekordy</Title>
      <Card>
        <Table columns={columns} dataSource={mockData} />
      </Card>
    </div>
  );
};

export default PersonalRecordsPage;
