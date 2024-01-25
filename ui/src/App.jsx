// app.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './screens/Home';
import Componenets from './screens/Components';
import Editor from './screens/Editor';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/components" element={<Componenets  catogreise={"buttons"}/>} />
          <Route path="/buttons" element={<Componenets catogreise={"buttons"} />} />
          <Route path="/cards" element={<Componenets catogreise={"cards"} />} />
          <Route path="/edit" element={<Editor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

