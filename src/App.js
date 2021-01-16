import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [hobby, setHobby] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const validate = () => {
    if(name.replace(/\s+/g, '') === '') {
      setError('Please enter name.');
      return false;
    }
    if(hobby === '') {
      setError('Please select a hobby.');
      return false;
    }
    if(message.replace(/\s+/g, '') === '') {
      setError('Please enter a message.');
      return false;
    }
    setError('');
    return true;
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if(validate()) {

      const response = await fetch('http://localhost:3001/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: Date.now(),
          name,
          gender,
          hobby,
          message
        })
      });
      const data = await response.json();

      console.log(data);

      if(data.id) {
        setStatus('Form submitted successfully!')
      } else {
        setStatus('There was an error! Please try again.')
      }

    }
  }

  return (
    <div className="App">
      <form className="form" onSubmit={onSubmit} method="POST">
        <div className="input-wrapper">
          <input placeholder="Name" type="text" name="name" value={name} onChange={(e) => {
            setName(e.target.value)
          }} />
        </div>
        <div className="input-wrapper select-wrapper">
          <select name="gender" value={gender} onChange={(e) => {
            setGender(e.target.value)
          }}>
            <option className="placeholder" value="" disabled>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="input-wrapper select-wrapper">
          <select name="hobby" value={hobby} onChange={(e) => {
            setHobby(e.target.value)
          }}>
            <option className="placeholder" value="" disabled>Hobby</option>
            <option value="cricket">Cricket</option>
            <option value="swimming">Swimming</option>
            <option value="reading">Reading</option>
            <option value="soccer">Soccer</option>
            <option value="hiking">Hiking</option>
          </select>
        </div>
        <div className="input-wrapper">
          <textarea placeholder="Message" name="message" cols="20" rows="5" onChange={(e) => {
            setMessage(e.target.value)
          }} />
        </div>
        {error && <p className="error">{error}</p>}
        {status && <p className="status">{status}</p>}
        <div className="submit-wrapper">
          <button type="submit" onClick={onSubmit}>Send</button>
        </div>
      </form>
    </div>
  );
}

export default App;
