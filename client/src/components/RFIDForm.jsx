import { useState } from 'react';
import { useRFIDContext } from '../hooks/useRFIDContext';
import { useAuthContext } from '../hooks/useAuthContext';

const RFIDForm = () => {
  const { dispatch } = useRFIDContext();
  const { user } = useAuthContext();

  const [rfid, setRfid] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const newRFID = { rfid, name, phone, email, password };

    const response = await fetch('https://rfid-authentication.onrender.com/api/rfid', {
      method: 'POST',
      body: JSON.stringify(newRFID),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    } else {
      setRfid('');
      setName('');
      setPhone('');
      setEmail('');
      setPassword('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_RFID', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add an account</h3>

      <label>RFID:</label>
      <input
        type="text"
        onChange={(e) => setRfid(e.target.value)}
        value={rfid}
        className={emptyFields.includes('rfid') ? 'error' : ''}
      />

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Phone:</label>
      <input
        type="text"
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        className={emptyFields.includes('phone') ? 'error' : ''}
      />

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className={emptyFields.includes('email') ? 'error' : ''}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className={emptyFields.includes('password') ? 'error' : ''}
      />

      <button>Add RFID</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RFIDForm;
