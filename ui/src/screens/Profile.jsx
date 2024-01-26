import Nav from '../components/Nav';
import Footer from '../components/Footer';
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

const Profile = ()=>{
    return(
        <>
        <Nav />
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
            {/* profiles  */}
            <div>
              <div className='row d-flex'>
                    <div className="col-2 p-3 bg-grey">
                        <img className='img-fluid' src="https://avatars.githubusercontent.com/u/96030910?v=4" alt="" />
                    </div>
                    <div className="col-10 p-3 bg-grey">
                        <div><h3 className='fw-bolder'>Moovendhan v</h3></div>
                        <div><p className='text-info'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga, ullam.</p></div>
                        <div><p>Organisations</p></div>
                        <div className="d-flex">
                            <div className='pe-2'>
                                <a href="#">Github</a>
                            </div>
                            <div className='pe-2'>
                                <a href="#">Website</a>
                            </div>
                        </div>
                    </div>
              </div>
            </div>

            {/* infos */}
            <div className='d-flex bg-grey my-2 rounded-2 '>
                <div className='p-3'>
                    <Link className='profile_text' to="/publicvarient">Public Varient</Link>
                </div>
              <div className='p-3'>
                    <Link className='profile_text' to="/approvals">Waiting for Approvals</Link>
                </div>
              <div className='p-3'>
                    <Link className='profile_text' to="/publicvarient">Drafts</Link>
                </div>
            </div>

            {/* details */}
            <div className='profile_tabs bg-grey'>

            </div>

          </div>
        </div>
        <Footer />
      </>
    )
}

export default Profile;