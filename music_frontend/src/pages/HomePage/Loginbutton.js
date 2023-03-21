import React from 'react';
import { Button } from 'react-bootstrap';

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = 'https://accounts.spotify.com/authorize';
  };

  return (
    <Button onClick={handleLogin} variant="contained" color="primary">
      Log in with Spotify
    </Button>
  );
};

export default LoginButton;