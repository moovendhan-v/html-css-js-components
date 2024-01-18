import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
const root = createRoot(document.getElementById('root'));

const GitHubAuth = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    // alert(code);
    if (code) {
      fetch('http://localhost:4000/auth/github-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(response => response.json())
        .then(data => {
          // Assuming your server responds with an access token
          const githubAccessToken = data.access_token;
          // Store the GitHub access token in localStorage or a secure storage method
          localStorage.setItem('githubAccessToken', githubAccessToken);
        })
        .catch(error => {
          console.error('GitHub authentication error:', error);
        });
    }
  }, []);

  return <App />;
};

root.render(<GitHubAuth />, document.getElementById('root'));
