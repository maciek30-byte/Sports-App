import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const CharacterLevelPage: React.FC = () => {
  return (
    <div>
      <Title level={2}>Poziom Postaci</Title>
      <p>Tutaj będą wyświetlane informacje o poziomie postaci użytkownika.</p>
    </div>
  );
};

export default CharacterLevelPage;
