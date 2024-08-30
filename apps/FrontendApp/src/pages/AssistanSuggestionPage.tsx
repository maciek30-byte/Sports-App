import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const AssistantSuggestionsPage: React.FC = () => {
  return (
    <div>
      <Title level={2}>Sugestie Asystenta</Title>
      <p>Tutaj będą wyświetlane sugestie i porady od asystenta treningowego.</p>
    </div>
  );
};

export default AssistantSuggestionsPage;
