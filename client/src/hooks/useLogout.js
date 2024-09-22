import { useAuthContext } from './useAuthContext';
import { useRFIDContext } from './useRFIDContext'; 

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchRFID } = useRFIDContext(); 

  const logout = () => {
    localStorage.removeItem('user');

    dispatch({ type: 'LOGOUT' });
    dispatchRFID({ type: 'SET_RFID', payload: null }); 
  };

  return { logout };
};
