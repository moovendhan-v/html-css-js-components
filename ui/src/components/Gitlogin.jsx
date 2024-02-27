// GitHubLoginButton.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userProfileReducer } from '../actions/user.action';
import { logout } from '../actions/user.action';

const GitHubLoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

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
          alert(JSON.stringify(data));
          alert(JSON.stringify(data.profile));
          window.location.href = '/';
          dispatch(userProfileReducer({ userProfileInfo: data.profile, saveTo: "profile" }));
        })
        .catch(error => {
          console.error('GitHub authentication error:', error);
        });
    }
  }, []);

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
          window.location.href = '/';
          dispatch(userProfileReducer({ userProfileInfo: data.profile, saveTo: "profile" }));
        })
        .catch(error => {
          console.error('GitHub authentication error:', error);
        });
    }

  };

  const handleLogout = () => {
    // Clear the GitHub token from local storage
    window.localStorage.removeItem('githubOAuthState');
    setIsLoggedIn(false);
    dispatch(logout());
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
