import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(user, isLoading, isAuthenticated);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  console.log(user);
  return (
    isAuthenticated && (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img src={user.picture} alt={user.name} />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>{user.nickname}</h2>
          <p>Email:{user.email}</p>
          {user.email_verified ? (
            <div>Email is Verified.</div>
          ) : (
            <div>Please verify your email.</div>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;
