import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      style={{
        paddingLeft: '40px',
        fontSize: '25px',
        backgroundColor: 'transparent',
        borderStyle: 'none',
        color: '#50C878',
      }}
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};
export default LoginButton;
