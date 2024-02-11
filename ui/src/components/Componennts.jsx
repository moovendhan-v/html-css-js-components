import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import ComponentsCard from './ComponentsCard';
import LeftSliders from './LeftSLiders';

const App = ({ catogreise }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // const slider = document.querySelector('.left_div');
      const footer = document.getElementById('footer');
      const container = document.querySelector('.gallery_containers');

      // const sliderTop = slider.getBoundingClientRect().bottom;
      const footerTop = footer.getBoundingClientRect().top;
      const containerTop = container.getBoundingClientRect().top;

      if(window.innerHeight < footerTop+200){ 
        setIsSticky(true);
      }else{
        setIsSticky(false);
      }
      if(containerTop > 120){
        setIsSticky(false);
        console.log("done");
      }

    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky]);

  return (
    <>
      <div className="container-fluid d-flex">
        <div className={`left_div shadow_fade mb-3 ${isSticky ? 'sticky' : ''}`}>
          <div className='mb-5'>
            <LeftSliders />
          </div>
        </div>
        <div className={`right_div`} style={isSticky ? { marginLeft: '15%' } : {}}>
          <div>
          <ComponentsCard catogreise={catogreise} componentType="all" />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
