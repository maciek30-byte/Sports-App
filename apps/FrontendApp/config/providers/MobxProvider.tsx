import React, { createContext, FC, ReactNode } from 'react';
import { ProviderType } from './types';
import { Store } from '../../src/Store';

const GlobalStoreContext = createContext<Store | null>(null);

const globalStore = new Store();

interface MobxProviderProps {
  children: ReactNode;
}

export const MobxProvider: FC<MobxProviderProps> = ({ children }) => {
  return (
    <GlobalStoreContext.Provider value={globalStore}>
      {children}
    </GlobalStoreContext.Provider>
  );
};


export const useStore = () => {
  const store = React.useContext(GlobalStoreContext);
  if (!store) {
    throw new Error('useGlobalStore must be used within MobxProvider');
  }
  return store;
};
