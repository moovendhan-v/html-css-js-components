import { useLogto } from "@logto/react";
import { useEffect, useState } from "react";

export const Home = () => {
    const { isAuthenticated, getIdTokenClaims, signIn, signOut } = useLogto();
    const [userId, setUserId] = useState('');
  
    useEffect(() => {
      (async () => {
        if (isAuthenticated) {
          const claims = await getIdTokenClaims();
          setUserId(claims.sub);
        }
      })();
    }, [getIdTokenClaims, isAuthenticated]);
  
    return (
      <div>
        {userId && <p>Logged in as {userId}</p>}
        {isAuthenticated ? (
          <button onClick={signOut}>Sign Out</button>
        ) : (
          <button onClick={() => signIn('http://localhost:3000/callback')}>Sign In</button>
        )}
      </div>
    );
  };