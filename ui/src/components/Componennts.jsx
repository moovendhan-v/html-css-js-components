import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import ComponentsCard from './ComponentsCard';

const LeftSliderNavbar = ({ title }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleSlider = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`slider-navbar ${isActive ? 'active' : ''}`}>
      <div className="slider-content">
        <div>
          <a className="nav-link active fw-semibold text-light" aria-current="page">
            <Link to="/allcomponents">{title}</Link>
          </a>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <div className="container-fluid">
        <div className='left_div'>
          <div>
            <LeftSliderNavbar title="All" />
            <LeftSliderNavbar title="Buttons" />
            <LeftSliderNavbar title="Cards" />
            <LeftSliderNavbar title="Forms" />
            <LeftSliderNavbar title="Checkbox" />
            <LeftSliderNavbar title="Loader" />
          </div>
        </div>
        <div className='right_div'>
          <div>
            <ComponentsCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
