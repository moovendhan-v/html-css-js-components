// PostContent.js
import React, { useEffect } from 'react';
import code from '../assets/myicons/code.svg'

const PostContent = ({ pageUrls }) => {
  const shadowRef = React.useRef();

  useEffect(() => {
    const shadowRoot = shadowRef.current.attachShadow({ mode: 'open' });
    // Ensure pageUrls is a string
    if (typeof pageUrls === 'string') {
      fetch(pageUrls)
        .then(response => response.text())
        .then(data => {
          const div = document.createElement('div');
          div.innerHTML = data;
          shadowRoot.appendChild(div);
        })
        .catch(error => console.error(`Error fetching page content from ${pageUrls}:`, error));
    }
  }, [pageUrls]);

  return (
    <div className="box ">
      <div className='myBox' ref={shadowRef}></div> 
      <div className='readCode d-flex  align-items-center'>
         <div>
         <img className='svg' src={code} alt="" />
         </div>
         <div>  Edit code</div>
      </div> 
    </div>
  );
};

export default PostContent;
