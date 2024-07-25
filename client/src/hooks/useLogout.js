import { useAuthContext } from './useAuthContext';
import { useRFIDContext } from './useRFIDContext'; // Updated hook import

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchRFID } = useRFIDContext(); // Updated dispatch

  const logout = () => {
    // Remove user from storage
    localStorage.removeItem('user');

    // Dispatch logout action
    dispatch({ type: 'LOGOUT' });
    dispatchRFID({ type: 'SET_RFID', payload: null }); // Update state to null
  };

  return { logout };
};
