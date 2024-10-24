import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
//import InsuranceDetails from './pages/InsuranceDetails';
import Header from './components/Header';
import InventoryManagement from './pages/InventoryManagement';
import LoginSignup from './pages/LoginSignup';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </div>
  );
}

export default App;