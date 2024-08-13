import { FC } from 'react';
import { ProviderType } from './types';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

export const BrowserRouterProvider:FC<ProviderType> = ({children}) =>{
  return(
    <BrowserRouter>
      {children}
    </BrowserRouter>
  )
}
