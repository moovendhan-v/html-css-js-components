
// GitHubLoginButton.jsx
import useGitHubAuthentication from '../hooks/useGitHubAuthentication';
import { useSelector } from 'react-redux';
// import { userProfileReducer } from '../actions/user.action';


const GitHubLoginButton = () => {

console.log(useSelector(state => state))

  const { isLoggedIn, handleLogin, handleLogout } = useGitHubAuthentication();
  return (
    <>
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
    </>
  );
};

export default GitHubLoginButton;
