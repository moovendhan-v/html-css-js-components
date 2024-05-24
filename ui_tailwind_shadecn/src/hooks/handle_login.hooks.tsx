import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useLoginStore } from "@/store/Auth";
const userInfo = useLoginStore.getState()

export const HandleLogin = () => {
    const clientId = '5871c78bb36c12b03eb3';
    const redirectUri = 'http://localhost:4000/auth/github-oauth';
    const scope = 'user';
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = githubOAuthUrl
};

const githubToken = Cookies.get('authToken');
console.log('GitHub Token:', githubToken);


const fetchUserData = async (token: string) => {
  const user = await useLoginStore.getState().login(token)
  return user;
};

export const Logins: React.FC = () => {

  useEffect(() => {
    const githubToken = Cookies.get('authToken');
    console.log('GitHub Token:', githubToken);

    if (githubToken) {
      fetchUserData(githubToken)
    }
  }, []);

  return (
    <div>
      {userInfo.isLoading ? (
       <></>
      ) : (
        <>
         <div>
          <h1>Welcome, {userInfo.user?.name}</h1>
        </div>
        </>
      )}
    </div>
  );
};
