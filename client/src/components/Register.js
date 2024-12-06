import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const handleSubmit = async () => {

    try {
      const response = await axios.post("http://localhost:3000/register", {
        firstName,
        lastName,
        username,
        password
      });
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  };

  
  return (
    <>
    <h1>Register new User</h1>
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
      </label>
      <br />
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
      <button type="submit">Register User</button>
      <a href="http://localhost:3000/login" class="button-class">Already a user? Login!</a>
    </form>
    </>
  );


}

export default Register;