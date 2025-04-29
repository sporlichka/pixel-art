import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Заменяем Switch на Routes
import Header from './components/Header';
import './css/App.css';
import Canvas from './components/Canvas';
import CanvasPage from './components/CanvasPage';

function App() {
  const [nickname, setNickname] = useState(localStorage.getItem('nickname') || '');

  return (
    <Router>
      <Header setNickname={setNickname} />
      <Routes>  {/* Заменяем Switch на Routes */}
        <Route path="/" element={<Canvas nickname={nickname} />} />
        <Route path="/canvas/:canvasId" element={<CanvasPage nickname={nickname} />} />
      </Routes>
    </Router>
  );
}

export default App;
