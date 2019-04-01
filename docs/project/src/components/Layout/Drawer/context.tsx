import React from 'react';

export interface IDrawerContext {
  open(): void;
  close(): void;
}

export const DrawerContext = React.createContext<IDrawerContext>(null);