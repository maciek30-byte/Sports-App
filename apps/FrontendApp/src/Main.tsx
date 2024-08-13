import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/App';
import { AppProvider } from '../config/providers/AppProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
