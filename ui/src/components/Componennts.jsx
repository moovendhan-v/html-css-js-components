import React, { useState } from 'react';
import PopularPosts from './PopularPosts';
import { Link } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';



const LeftSliderNavbar = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSlider = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`slider-navbar ${isActive ? 'active' : ''}`}>
      {/* <button onClick={toggleSlider}>Toggle Slider</button> */}
      <div className="slider-content">
        {/* Your slider content goes here */}
        <div>
            <a class="nav-link active fw-semibold text-light" aria-current="page" ><Link to="/allcomponents">All</Link></a>
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
            <a class="nav-link active fw-semibold text-light" aria-current="page" ><Link to="/allcomponents">All Components</Link></a>
            </div>
        </div>
        <div className='right_div'>
            <div>
                <h3>Main div</h3>
                {/* <PopularPosts /> */}
           <CodeEditor />
            </div>
        </div>
    </div>
   </>
  );
};

export default App;
