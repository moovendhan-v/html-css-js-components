import { useLogto } from '@logto/react';

export const SignIn = () => {
  const { signIn, isAuthenticated } = useLogto();

  if (isAuthenticated) {
    return <div>Signed in</div>;
  }

  return (
    <button onClick={() => signIn('http://localhost:5174/callback')}>
      Sign In
    </button>
  );
};