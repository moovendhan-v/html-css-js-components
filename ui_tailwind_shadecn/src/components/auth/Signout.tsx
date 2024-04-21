import { useLogto } from "@logto/react";

export const SignOut = () => {
    const { signOut } = useLogto();
  
    return (
      <button onClick={() => signOut('http://localhost:3000')}>
        Sign out
      </button>
    );
  };