import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = createRoot(document.getElementById('root'));

const GitHubAuth = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetch('http://localhost:4000/auth/github-oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(JSON.stringify(data, null, 2));
          const githubAccessToken = data && data.githubAccessToken;
          if (githubAccessToken) {
            // Store the GitHub access token in localStorage
            localStorage.setItem('githubAccessToken', githubAccessToken);
          } else {
            console.error('GitHub authentication error: Invalid access token received');
          }
        })
        .catch(error => {
          console.error('GitHub authentication error:', error);
        });
    }
  }, []);

  return <App />;
};

root.render(<GitHubAuth />, document.getElementById('root'));
