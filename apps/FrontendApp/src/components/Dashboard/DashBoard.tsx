import React from 'react';
import { Typography, Card, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export const Dashboard: React.FC = () => {
  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="Poziom Postaci" extra={<Link to="/character-level">Szczegóły</Link>}>
            <p>Sprawdź swój aktualny poziom i postępy.</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Zaprojektuj MikroCykl" extra={<Link to="/design-microcycle">Przejdź</Link>}>
            <p>Stwórz swój własny plan treningowy.</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Twoje Rekordy" extra={<Link to="/personal-records">Zobacz</Link>}>
            <p>Przeglądaj swoje osobiste rekordy.</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Sugestie Asystenta" extra={<Link to="/assistant-suggestions">Sprawdź</Link>}>
            <p>Otrzymaj spersonalizowane porady treningowe.</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
