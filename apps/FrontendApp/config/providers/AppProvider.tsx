import React, { FC } from 'react';
import { ProviderType } from './types';
import { MobxProvider } from './MobxProvider';

export const AppProvider: FC<ProviderType> = ({ children }) => {
  return (
    <MobxProvider>
      {children}
    </MobxProvider>
  );
};
