import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route principale vers Chat */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
