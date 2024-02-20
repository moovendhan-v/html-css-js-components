// app.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './screens/Home';
import Componenets from './screens/Components';
import Editor from './screens/Editor';
import Profile from './screens/Profile';
import ContributeNewComp from './screens/ContributeNew';


function App() {
  const [isStillLoading, setIsStillLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStillLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [])
  return (
    <div className="App">
      <div className={`progressBar ${!isStillLoading ? 'hide' : ''}`}>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contributenew" element={<ContributeNewComp />} />
          {/* components  */}
          <Route path="/search" element={<Componenets catogreise={"search"} />} />
          <Route path="/all" element={<Componenets catogreise={"all"} />} />
          <Route path="/buttons" element={<Componenets catogreise={"buttons"} />} />
          <Route path="/cards" element={<Componenets catogreise={"cards"} />} />
          <Route path="/forms" element={<Componenets catogreise={"forms"} />} />
          <Route path="/checkbox" element={<Componenets catogreise={"checkbox"} />} />
          <Route path="/loader" element={<Componenets catogreise={"loader"} />} />
          <Route path="/input" element={<Componenets catogreise={"input"} />} />
          <Route path="/tooltip" element={<Componenets catogreise={"tooltip"} />} />
          <Route path="/navbar" element={<Componenets catogreise={"navbar"} />} />
          <Route path="/tabs" element={<Componenets catogreise={"tabs"} />} />
          <Route path="/toast" element={<Componenets catogreise={"toast"} />} />
          {/* component routeing end  */}
          <Route path="/edit" element={<Editor />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

