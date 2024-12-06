import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';



const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (response, request) => {
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    })
    if (response) {
      navigate(`/user/${username}`)
    }
    else {
      console.log('error:')
    }

  };


return (
  <form onSubmit={handleSubmit()}>
  <label>
    Username:
    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
  </label>
  <br />
  <label>
    Password:
    <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
    </label>
    <br />
    <button type="submit">Log in</button>
  </form>
)
};

export default Login;