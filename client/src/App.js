import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';
import Home from './Home'
import Login from './Login'
import Items from './Items'
import Register from './components/Register'

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/items" element={<Items />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/register" element={<Register />} />
      <Route path="/items/:id" element={<Item />} /> */}
    </Routes>
  </Router>
)}

export default App;
