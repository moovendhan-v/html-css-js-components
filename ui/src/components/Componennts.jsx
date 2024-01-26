import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import ComponentsCard from './ComponentsCard';

const LeftSliderNavbar = ({ title, linkTo }) => {
  const [isActive, setIsActive] = useState(false);

  const toggleSlider = () => {
    setIsActive(!isActive);
  };
  return (
    <div className={`slider-navbar ${isActive ? 'active' : ''}`}>
      <div className="slider-content">
        <div>
            <Link aria-current="page" className='nav-link active fw-semibold text-light' to={`/${linkTo}`} >{title}</Link>
        </div>
      </div>
    </div>
  );
};

const App = ({catogreise}) => {
  return (
    <>
      <div className="container-fluid d-flex">
        <div className='left_div'>
          <div>
            <LeftSliderNavbar title="All" linkTo="components" />
            <LeftSliderNavbar title="Buttons" linkTo="buttons" />
            <LeftSliderNavbar title="Cards" linkTo="cards" />
            <LeftSliderNavbar title="Forms" linkTo="components" />
            <LeftSliderNavbar title="Checkbox" linkTo="components" />
            <LeftSliderNavbar title="Loader" linkTo="components" />
          </div>
        </div>
        <div className='right_div'>
          <div>
            <ComponentsCard catogreise={catogreise} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
