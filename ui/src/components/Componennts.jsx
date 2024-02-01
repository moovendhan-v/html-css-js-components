import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import ComponentsCard from './ComponentsCard';
import LeftSliders from './LeftSLiders';

const App = ({catogreise}) => {
  return (
    <>
      <div className="container-fluid d-flex">
        <div className='left_div shadow_fade mb-3'>
          <div className='mb-5'>
           <LeftSliders />
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
