import { useContext } from 'react';
import AppContext from './app-context';

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("not valid");
  }
  return appContext;
};