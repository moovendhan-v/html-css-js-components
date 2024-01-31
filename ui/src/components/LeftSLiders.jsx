import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LeftSliderNavbar = ({ title, linkTo, onClick, activeLink }) => {
    const handleClick = () => {
        onClick(linkTo); 
    };
    return (
        <div className={`slider-navbar ${activeLink === linkTo ? 'active_nav' : ''}`} onClick={handleClick}>
            <div className="slider-content">
                <div>
                    <Link aria-current="page" className={`nav-link fw-semibold text-light ${activeLink === linkTo ? 'active' : ''}`} to={`/${linkTo}`} >{title}</Link>
                </div>
            </div>
        </div>
    );
};

const LeftSliders = () => {
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    //setting active link by uri params
      const pathname = location.pathname;
      setActiveLink(pathname.replace('/', ''));
  }, [location]);
    return (
        <>
            <LeftSliderNavbar title="All" linkTo="all" activeLink={activeLink}  />
            <LeftSliderNavbar title="Buttons" linkTo="buttons" activeLink={activeLink}  />
            <LeftSliderNavbar title="Cards" linkTo="cards" activeLink={activeLink}  />
            <LeftSliderNavbar title="Forms" linkTo="forms" activeLink={activeLink}  />
            <LeftSliderNavbar title="Checkbox" linkTo="checkbox"  activeLink={activeLink}  />
            <LeftSliderNavbar title="Loader" linkTo="loader"  activeLink={activeLink}  />
            <LeftSliderNavbar title="Input" linkTo="input"  activeLink={activeLink}  />
            <LeftSliderNavbar title="tooltip" linkTo="tooltip"  activeLink={activeLink}  />
            <LeftSliderNavbar title="navbar" linkTo="navbar"  activeLink={activeLink}  />
            <LeftSliderNavbar title="tabs" linkTo="tabs"  activeLink={activeLink}  />
            <LeftSliderNavbar title="toast" linkTo="toast"  activeLink={activeLink}  />
        </>
    );
};

export default LeftSliders;
