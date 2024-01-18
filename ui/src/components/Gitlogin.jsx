// GitHubLoginButton.jsx
import React, { useState, useEffect } from 'react';

const GitHubLoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const githubOAuthState = window.localStorage.getItem('githubOAuthState');
    if (githubOAuthState) {
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleLogin = () => {
    const clientId = '5871c78bb36c12b03eb3';
    const redirectUri = 'http://localhost:5173';
    const scope = 'user';
    const state = generateRandomState();

    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

    window.localStorage.setItem('githubOAuthState', state);
    // Redirect to GitHub for authentication
    window.location.href = githubOAuthUrl;
  };

  const handleLogout = () => {
    // Clear the GitHub token from local storage
    window.localStorage.removeItem('githubAuthToken');
    setIsLoggedIn(false);
  };

  const generateRandomState = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  return (
    <div>
      {isLoggedIn ? (
        // If logged in, show logout button
        <button className='btn btn-danger' onClick={handleLogout}>
          Logout 
        </button>
      ) : (
        // If not logged in, show login button
        <button className='btn btn-primary' onClick={handleLogin}>
          Login / Signup  {isLoggedIn}
        </button>
      )}
    </div>
  );
};

export default GitHubLoginButton;
