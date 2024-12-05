import React, { useState } from 'react';
import axios from 'axios';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/login', {username, password});
      window.location.href = '/items' //should return user to the items page
    } catch (error) {
      console.error(error);
    }
  }


return (
  <form onsubmit={handleSubmit()}>
  <label>
    Username:
    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
  </label>
  <br />
  <label>
    Password:
    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
    </label>
    <br />
  </form>
)
};

export default Login;