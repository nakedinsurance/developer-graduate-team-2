import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ElectronicsStore from './components/E-Store/ElectronicStore';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/"  index element={<ElectronicsStore/>} />
       
      </Routes>
    </div>
  );
}

export default App;