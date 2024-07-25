import { useContext } from 'react';
import { RFIDContext } from '../context/RFIDContext';

export const useRFIDContext = () => {
  const context = useContext(RFIDContext);

  if (!context) {
    throw Error('useRFIDContext must be used inside an RFIDContextProvider');
  }

  return context;
};
