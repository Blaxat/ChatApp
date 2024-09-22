import { useEffect } from 'react';
import { useRFIDContext } from '../hooks/useRFIDContext'; 
import { useAuthContext } from '../hooks/useAuthContext';

// components
import RFIDDetails from '../components/RFIDDetails';
import RFIDForm from '../components/RFIDForm';

const Home = () => {
  const { rfid, dispatch } = useRFIDContext(); 
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRFID = async () => {
      const response = await fetch('https://rfid-authentication.onrender.com/api/rfid', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_RFID', payload: json });
      }
    };

    if (user) {
      fetchRFID();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="rfid-details">
        {rfid ? <RFIDDetails rfid={rfid} /> : <RFIDForm />}
      </div>
    </div>
  );
};

export default Home;
