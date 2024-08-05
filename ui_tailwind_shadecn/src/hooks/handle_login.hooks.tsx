import React, { useEffect } from 'react';
import { useLoginStore } from "@/store/Auth";
import { useNavigate } from 'react-router-dom';
import { getEnvVariable } from '@/utils/load.utils';
const baseUri = getEnvVariable('BASE_URI');
// import { toast } from "sonner";
import { useAuth } from '@/components/AuthProvide';
const userInfo = useLoginStore.getState();
console.log(userInfo)

export const HandleLogin = () => {
    const clientId = '5871c78bb36c12b03eb3';
    const redirectUri = `${baseUri}/auth/github-oauth`;
    const scope = 'user';
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = githubOAuthUrl
};


const fetchUserData = async () => {
  const user = await useLoginStore.getState().login()
  return user;
};

export const Logins: React.FC = () => {

  const navigate = useNavigate();
  const { token, isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  useEffect(() => {

    if (token) {
      fetchUserData().then(() => {
        if (userInfo.isLoggedIn) {
          navigate('/profile');
        }
      });
    }
  }, [navigate, token]);


  return (
    <div>
      {userInfo.isLoading ? (
       <></>
      ) : (
        <>
         <div>
          <h1>{userInfo.user?.name}</h1>
        </div>
        </>
      )}
    </div>
  );
};



// export const CheckRefreshToken: React.FC = () => {
//   const githubToken = Cookies.get('authToken');

//   useEffect(() => {
//     const handleStorageChange = (event: { key: string | null; }) => {
//       if (event.key === null || event.key === 'userInfo') {
//         // 'event.key' is null if localStorage.clear() is called
//         if (!localStorage.getItem('userInfo')) {
//           console.log('Local storage item "userInfo" is deleted');
//           if (githubToken) {
//             fetchUserData(githubToken);
//           }
//         }
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, [githubToken]);

//   return null;
// };