import React from 'react';
import {
  Routes,
  Route, 
} from 'react-router-dom';

import IndexPage from './pages/Index.js';
import PredictPage from './pages/Predict.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
         
      <Route path="/predict" element={<PredictPage />} />
    </Routes>
  );
}

export default App;
