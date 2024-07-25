import { useState } from 'react';
import { useRFIDContext } from '../hooks/useRFIDContext';
import { useAuthContext } from '../hooks/useAuthContext';

const UpdateRFIDForm = ({ setIsUpdating }) => {
  const { rfid, dispatch } = useRFIDContext();
  const { user } = useAuthContext();

  const [name, setName] = useState(rfid.name);
  const [phone, setPhone] = useState(rfid.phone);
  const [email, setEmail] = useState(rfid.email);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [updatedFields, setUpdatedFields] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRFID = { ...updatedFields };

    const response = await fetch('http://localhost:4000/api/rfid', {
      method: 'PUT',
      body: JSON.stringify(updatedRFID),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      dispatch({ type: 'SET_RFID', payload: json });
      setIsUpdating(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form className="update" onSubmit={handleSubmit}>
      <h3>Update RFID</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
          handleFieldChange('name', e.target.value);
        }}
        value={name}
      />

      <label>Phone:</label>
      <input
        type="text"
        onChange={(e) => {
          setPhone(e.target.value);
          handleFieldChange('phone', e.target.value);
        }}
        value={phone}
      />

      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
          handleFieldChange('email', e.target.value);
        }}
        value={email}
      />

      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
          handleFieldChange('password', e.target.value);
        }}
        value={password}
      />

      <button>Update RFID</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default UpdateRFIDForm;
