import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const LeftSliderNavbar = ({ title, linkTo, onClick, activeLink, roles }) => {
  const handleClick = () => {
    onClick(linkTo);
  };
  if (roles == "navbar") {
    return (
      <div className={`menu-navbar ${activeLink === linkTo ? 'active_nav' : ''}`} onClick={handleClick}>
        <div className="slider-content">
          <div>
            <Link aria-current="page" className={`nav-link fw-semibold text-light p-1 ${activeLink === linkTo ? 'active' : ''}`} to={`/${linkTo}`} >{title}</Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`slider-navbar ${activeLink === linkTo ? 'active_nav' : ''}`} onClick={handleClick}>
        <div className="slider-content">
          <div>
            <Link aria-current="page" className={`nav-link fw-semibold text-light ${activeLink === linkTo ? 'active' : ''}`} to={`/${linkTo}`} >{title}</Link>
          </div>
        </div>
      </div>
    );
  }
};

const LeftSliders = ({ role }) => {
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    //setting active link by uri params
    const pathname = location.pathname;
    setActiveLink(pathname.replace('/', ''));
  }, [location]);
  return (
    <>
      <LeftSliderNavbar title="All" linkTo="all" activeLink={activeLink} roles={role} />
      <LeftSliderNavbar title="Buttons" linkTo="buttons" activeLink={activeLink} roles={role} />
      <LeftSliderNavbar title="Cards" linkTo="cards" activeLink={activeLink} roles={role} />
      <LeftSliderNavbar title="Forms" linkTo="forms" activeLink={activeLink} roles={role} />
      <LeftSliderNavbar title="Checkbox" linkTo="checkbox" activeLink={activeLink} roles={role} />
      <LeftSliderNavbar title="Loader" linkTo="loader" activeLink={activeLink} roles={role} />
      <LeftSliderNavbar title="Input" linkTo="input" activeLink={activeLink} roles={role} />
      <LeftSliderNavbar title="tooltip" linkTo="tooltip" activeLink={activeLink} roles={role} />
      <LeftSliderNavbar title="navbar" linkTo="navbar" activeLink={activeLink} roles={role} />
      <LeftSliderNavbar title="tabs" linkTo="tabs" activeLink={activeLink} roles={role} />
      <LeftSliderNavbar title="toast" linkTo="toast" activeLink={activeLink} roles={role} />
    </>
  );
};

export default LeftSliders;
