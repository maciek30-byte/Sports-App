import React from 'react';
import { Typography, Card, Progress, List, Statistic, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface CharacterData {
  name: string;
  level: number;
  totalWeight: number;
  weeklyChange: number;
  weeklyWeightChange: number;
}

const mockCharacterData: CharacterData = {
  name: "John Doe",
  level: 5.7,
  totalWeight: 10000,
  weeklyChange: 0.7,
  weeklyWeightChange: 50
};

const CharacterLevelPage: React.FC = () => {
  const { name, level, totalWeight, weeklyChange, weeklyWeightChange } = mockCharacterData;

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Poziom Postaci</Title>
      <Card>
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Imię" value={name} />
          </Col>
          <Col span={12}>
            <Statistic title="Poziom" value={Math.floor(level)} prefix={<Progress type="circle" percent={((level % 1) * 100)} width={80} />} />
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '24px' }}>
          <Col span={12}>
            <Statistic
              title="Zmiana poziomu w tym tygodniu"
              value={weeklyChange}
              precision={2}
              valueStyle={{ color: weeklyChange >= 0 ? '#3f8600' : '#cf1322' }}
              prefix={weeklyChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="poziomów"
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Zmiana wagi w tym tygodniu"
              value={weeklyWeightChange}
              precision={2}
              valueStyle={{ color: weeklyWeightChange >= 0 ? '#3f8600' : '#cf1322' }}
              prefix={weeklyWeightChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="kg"
            />
          </Col>
        </Row>
      </Card>
      <Card style={{ marginTop: '24px' }}>
        <Title level={4}>Statystyki</Title>
        <List>
          <List.Item>
            <Text>Łączna podniesiona waga: {totalWeight} kg</Text>
          </List.Item>
          <List.Item>
            <Text>
              {weeklyWeightChange >= 0
                ? `W tym tygodniu podniosłeś o ${weeklyWeightChange} kg więcej niż w poprzednim tygodniu.`
                : `W tym tygodniu podniosłeś o ${Math.abs(weeklyWeightChange)} kg mniej niż w poprzednim tygodniu.`}
            </Text>
          </List.Item>
          <List.Item>
            <Text>
              {weeklyChange >= 0
                ? `Twój poziom wzrósł o ${weeklyChange.toFixed(2)} w tym tygodniu.`
                : `Twój poziom spadł o ${Math.abs(weeklyChange).toFixed(2)} w tym tygodniu.`}
            </Text>
          </List.Item>
        </List>
      </Card>
    </div>
  );
};

export default CharacterLevelPage;
