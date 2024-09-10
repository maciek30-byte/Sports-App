import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../config/providers/MobxProvider';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from '../components/Forms/LoginUserForm/LoginUserForm';
import CreateUserForm from '../components/Forms/CreateUserForm/CreateUserForm';
import { LayoutContainer } from '../components/Layout/Layout';
import Dashboard from '../components/Dashboard/DashBoard';
import CharacterLevelPage from '../pages/CharacterLevelPage';
import MicrocyclePlanner from '../components/MicrocyclePlanner';
import CurrentWorkout from '../components/CurrentWorkout/CurrentWorkout';
import PersonalRecords from '../components/PersonalRecords/PersonalRecords';
import UserProgress from '../components/UserProgress/UserProgress';


export const App = observer(() => {
  const { authStore } = useStore();

  if (!authStore.isUserLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<CreateUserForm />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <LayoutContainer>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/character-level" element={<CharacterLevelPage />} />
        <Route path="/design-microcycle" element={<MicrocyclePlanner />} />
        <Route path="/current-workout" element={<CurrentWorkout />} />
        <Route path="/personal-records" element={<PersonalRecords />} />
        <Route path="/user-progress" element={<UserProgress />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LayoutContainer>
  );
});

export default App;
