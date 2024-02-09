import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      style={{
        paddingLeft: '30px',
        fontSize: '25px',
        backgroundColor: 'transparent',
        borderStyle: 'none',
        color: '#EE4B2B',
      }}
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
