import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      style={{
        paddingLeft: '75px',
        backgroundColor: 'transparent',
        borderStyle: 'none',
        color: '#E2F0F7',
      }}
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};
export default LoginButton;
