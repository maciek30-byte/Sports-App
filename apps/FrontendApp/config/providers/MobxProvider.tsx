import React, { createContext, useContext } from 'react';
import { Store } from '../../src/Store';

const StoreContext = createContext<Store | null>(null);

export const MobxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = new Store();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within MobxProvider');
  }
  return store;
};
