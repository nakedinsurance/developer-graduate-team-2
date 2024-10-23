import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import LoginSignup from './pages/LoginSignup'; 
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> 
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
