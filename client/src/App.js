import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomeHub from './pages/HomeHub';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import MyCollection from './pages/MyCollection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeHub />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/collection" element={<MyCollection />} /> 
      </Routes>
    </Router>
  );
}

export default App;
