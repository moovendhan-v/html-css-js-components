// shadowHooks.js
import React, { useEffect, useRef } from 'react';

const useShadowHooks = ({ pageUrls }) => {
  const shadowRef = useRef();

  useEffect(() => {
    const shadowRoot = shadowRef.current.attachShadow({ mode: 'open' });

    // Fetch content for each URL and create elements
    pageUrls.forEach((url, index) => {
      fetch(url)
        .then(response => response.text())
        .then(data => {
          const div = document.createElement('div');
          div.innerHTML = data;
          shadowRoot.appendChild(div);
        })
        .catch(error => console.error(`Error fetching page content from ${url}:`, error));
    });
  }, [pageUrls]);

  return {
    shadowRef,
  };
};

export default useShadowHooks;
