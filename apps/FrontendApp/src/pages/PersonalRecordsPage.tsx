import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const PersonalRecordsPage: React.FC = () => {
  return (
    <div>
      <Title level={2}>Twoje Rekordy</Title>
      <p>Tutaj będą wyświetlane osobiste rekordy użytkownika.</p>
    </div>
  );
};

export default PersonalRecordsPage;
