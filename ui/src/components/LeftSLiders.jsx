import react from "react";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

const LeftSliders = ()=>{
    return(
        <>
            <LeftSliderNavbar title="All" linkTo="all" />
              <LeftSliderNavbar title="Buttons" linkTo="buttons" />
              <LeftSliderNavbar title="Cards" linkTo="cards" />
              <LeftSliderNavbar title="Forms" linkTo="forms" />
              <LeftSliderNavbar title="Checkbox" linkTo="checkbox" />
              <LeftSliderNavbar title="Loader" linkTo="loader" />
              <LeftSliderNavbar title="Input" linkTo="input" />
              <LeftSliderNavbar title="tooltip" linkTo="tooltip" />
              <LeftSliderNavbar title="tooltip" linkTo="components" />
              <LeftSliderNavbar title="navbar" linkTo="navbar" />
              <LeftSliderNavbar title="tabs" linkTo="navbar" />
              <LeftSliderNavbar title="toast" linkTo="toast" />
        </>
    )
}

export default LeftSliders;