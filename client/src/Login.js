import React, { useState } from 'react';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    })
    .then((response) => {
    return response.json();
    })
    .then((data) => {
      console.log('data received:', data);
    })
    .catch((error) => {
      console.error('error:', error);
  });

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