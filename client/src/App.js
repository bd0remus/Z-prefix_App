import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';
import Home from './Home'
import Login from './Login'

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/register" element={<Register />} />
      <Route path="/items" element={<Items />} />
      <Route path="/items/:id" element={<Item />} /> */}
    </Routes>
  </Router>
)}

export default App;
