import React from 'react';
import { Typography } from 'antd';
import MicrocyclePlanner from '../components/MicrocyclePlanner';

const { Title } = Typography;

const DesignMicrocyclePage: React.FC = () => {
  return (
    <div>
      <Title level={2}>Zaprojektuj MikroCykl</Title>
      <MicrocyclePlanner />
    </div>
  );
};

export default DesignMicrocyclePage;
