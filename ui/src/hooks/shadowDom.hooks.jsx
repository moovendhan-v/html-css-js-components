// useFetchContent.js
import { useEffect, useRef } from 'react';

const useFetchContent = (pageUrls) => {
  const shadowRef = useRef();

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

  return shadowRef;
};

export default useFetchContent;
