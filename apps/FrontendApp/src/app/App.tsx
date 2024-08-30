import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../config/providers/MobxProvider';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LayoutContainer } from '../components/Layout/Layout';
import LoginForm from '../components/Forms/LoginUserForm/LoginUserForm';

import CharacterLevelPage from '../pages/CharacterLevelPage';

import PersonalRecordsPage from '../pages/PersonalRecordsPage';
import { Dashboard } from '../components/Dashboard/DashBoard';
import DesignMicrocyclePage from '../pages/DesingMicroCyclePage';
import AssistantSuggestionsPage from '../pages/AssistanSuggestionPage';


export const App = observer(() => {
  const { authStore } = useStore();

  // if (!authStore.isUserLoggedIn) {
  //   return <LoginForm />;
  // }

  return (
    <LayoutContainer>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/character-level" element={<CharacterLevelPage />} />
        <Route path="/design-microcycle" element={<DesignMicrocyclePage />} />
        <Route path="/personal-records" element={<PersonalRecordsPage />} />
        <Route path="/assistant-suggestions" element={<AssistantSuggestionsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LayoutContainer>
  );
});

export default App;
