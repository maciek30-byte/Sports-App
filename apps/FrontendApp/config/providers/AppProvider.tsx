import React, { FC } from 'react';
import { ProviderType } from './types';
import { MobxProvider } from './MobxProvider';
import { BrowserRouterProvider } from './BrowserRouterProvider';

export const AppProvider: FC<ProviderType> = ({ children }) => {
  return (
    <MobxProvider>
      <BrowserRouterProvider>
        {children}
      </BrowserRouterProvider>
    </MobxProvider>
  );
};
