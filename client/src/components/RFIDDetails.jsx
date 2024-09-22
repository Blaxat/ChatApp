import { useRFIDContext } from '../hooks/useRFIDContext';
import { useAuthContext } from '../hooks/useAuthContext';

const RFIDDetails = ({ rfid }) => {
  const { dispatch } = useRFIDContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('https://rfid-authentication.onrender.com/api/rfid', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_RFID', payload: json });
    }
  };

  return (
    <div className="rfid-details">
      <h4>{rfid.name}</h4>
      <p><strong>RFID: </strong>{rfid.rfid}</p>
      <p><strong>Phone: </strong>{rfid.phone}</p>
      <p><strong>Email: </strong>{rfid.email}</p>
      <button className="material-symbols-outlined" onClick={handleClick}>Delete Account</button>
    </div>
  );
};

export default RFIDDetails;
