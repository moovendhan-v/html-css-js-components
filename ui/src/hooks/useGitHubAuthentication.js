// useGitHubAuthentication.js
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile, logout } from '../actions/user.action';

const useGitHubAuthentication = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const githubOAuthState = window.localStorage.getItem('githubOAuthState');
    if (githubOAuthState) {
      setIsLoggedIn(true);
    }
  }, []);

  // https://github.com/login/oauth/authorize?client_id=5871c78bb36c12b03eb3&redirect_uri=http://localhost:5174/&scope=user
  
  const handleLogin = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    const clientId = '5871c78bb36c12b03eb3';
    const redirectUri = 'http://localhost:5174';
    const scope = 'user';
    const state = generateRandomState();
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
    const authWindow = window.open(githubOAuthUrl, '_blank');

    fetch('http://localhost:4000/auth/github-oauth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    })
      .then(response => response.json())
      .then(data => {
        window.localStorage.setItem('githubOAuthState', state);
        // window.location.href = '/profile';
        dispatch(updateUserProfile({ userProfileInfo: data.response.user, saveTo: "profile" }));
        dispatch(updateUserProfile({ userProfileInfo: data.response.components, saveTo: "components" }));
        // dispatch(userProfileReducer({ userProfileInfo: data.response.components, saveTo: "components" }));
        setIsLoggedIn(true);
        authWindow.close();
        alert(JSON.stringify(data.response.user));
      })
      .catch(error => {
        setIsLoggedIn(false);
        console.error('GitHub authentication error:', error);
        alert(error.message);
      });

    // Redirect to GitHub for authentication
    // window.location.href = githubOAuthUrl;

    // Open GitHub authentication in a new window
    // const authWindow = window.open(githubOAuthUrl, '_blank');
    // authWindow.close();

  //   window.addEventListener('message', (event) => {
  //     // Check if the message is from the child window
  //     if (event.source === authWindow) {
  //         // Handle the message from the child window
  //         if (event.data === 'authenticationCompleted') {
  //             // Authentication completed, do necessary actions in the old tab
  //             // For example, redirect back to the old tab
  //             window.location.href = redirectUri;
  //             // Close the new tab
  //             authWindow.close();
  //         }
  //     }
  // });

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

  return { isLoggedIn, handleLogin, handleLogout };
 
};

export default useGitHubAuthentication;
