import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
//import InsuranceDetails from './pages/InsuranceDetails';
import Header from './components/Header';
import InventoryManagement from './pages/InventoryManagement';
import Wishlist from "./pages/Wishlist"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/"  index element={<ElectronicsStore/>} />
        <Route path='/wishlist' element = {<Wishlist customerId={"cdad3ffd-f5d6-488e-b76f-a92a151b7c72"}/>}></Route>
        
        <Route path="/inventory" element={<InventoryManagement />} />
      </Routes>
    </div>
  );
}

export default App;