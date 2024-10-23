import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Checkout } from './components/Checkout/Checkout';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/"  index element={<Checkout/>} />
       
      </Routes>
    </div>
  );
}

export default App;