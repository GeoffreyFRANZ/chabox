import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/layout';
import Chat from './components/chat';
import Home from './components/home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route principale vers Chat */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
