import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ElectronicsStore from './components/E-Store/ElectronicStore';
import Wishlist from "./pages/Wishlist"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/"  index element={<ElectronicsStore/>} />
        <Route path='/wishlist' element = {<Wishlist customerId={"cdad3ffd-f5d6-488e-b76f-a92a151b7c72"}/>}></Route>
        
        <Route path="/search" element={<SearchEngine />} />
        <Route path="/inventory" element={<InventoryManagement />} />
      </Routes>
    </div>
  );
}

export default App;