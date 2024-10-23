import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
//import InsuranceDetails from './pages/InsuranceDetails';
import Header from './components/Header';
import InventoryManagement from './pages/InventoryManagement';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/"  index element={<ElectronicsStore/>} />
       
        <Route path="/inventory" element={<InventoryManagement />} />
      </Routes>
    </div>
  );
}

export default App;