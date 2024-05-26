import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useLoginStore } from "@/store/Auth";
import { useNavigate } from 'react-router-dom';
// import { toast } from "sonner";
const userInfo = useLoginStore.getState()

export const HandleLogin = () => {
    const clientId = '5871c78bb36c12b03eb3';
    const redirectUri = 'http://localhost:4000/auth/github-oauth';
    const scope = 'user';
    const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = githubOAuthUrl
};


const fetchUserData = async (token: string) => {
  const user = await useLoginStore.getState().login(token)
  return user;
};

export const Logins: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const githubToken = Cookies.get('authToken');
    console.log('GitHub Token:', githubToken);

    if (githubToken) {
      fetchUserData(githubToken).then(() => {
        // Redirect to profile if login is successful
                // toast.success("Login success", {
        //   description: "Enjoy the ui world",
        //   position: 'bottom-right',
        //   classNames:{
        //     error: "bg-theme"
        //   },
        //   action: {
        //     label: "close",
        //     onClick: () => console.log("Undo"),
        //   },
          
        // })
        if (userInfo.isLoggedIn) {
          navigate('/profile');
        }

      });
    }
  }, [userInfo, navigate]);


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