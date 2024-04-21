import { useHandleSignInCallback } from '@logto/react';


export const Callback = () => {

  const { isLoading } = useHandleSignInCallback(() => {

    // Navigate to root path when finished

  });


  // When it's working in progress

  if (isLoading) {

    return <div>Redirecting...</div>;

  }

};