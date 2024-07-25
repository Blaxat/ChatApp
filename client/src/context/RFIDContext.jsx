import { createContext, useReducer } from 'react';

export const RFIDContext = createContext();

export const rfidReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RFID':
      return {
        rfid: action.payload
      };
    case 'CREATE_RFID':
      return {
        rfid: action.payload
      };
    case 'UPDATE_RFID':
      return {
        rfid: { ...state.rfid, ...action.payload }
      };
    case 'DELETE_RFID':
      return {
        rfid: null
      };
    default:
      return state;
  }
};

export const RFIDContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rfidReducer, {
    rfid: null
  });

  return (
    <RFIDContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RFIDContext.Provider>
  );
};
