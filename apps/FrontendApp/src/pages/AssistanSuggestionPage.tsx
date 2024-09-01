import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const AssistantSuggestionsPage: React.FC = () => {
  return (
    <div>
      <Title level={2}>Sugestie Asystenta AI</Title>
      <p>Tutaj będą wyświetlane sugestie i porady od Trenera AI.</p>
    </div>
  );
};

export default AssistantSuggestionsPage;
