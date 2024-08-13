import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../config/providers/MobxProvider';
import { LayoutContainer } from '../components/Layout/Layout';

export const App = observer(() => {
  const { authStore } = useStore();

  return (
    // <Routes>
    //   <Route path="/" element={!authStore.isUserLoggedIn ? <LoginPage /> : <LayoutContainer title=" Layot" children={ActiveCaloriesForm}/>} />
    // </Routes>

    <LayoutContainer />
  );
});

export default App;
