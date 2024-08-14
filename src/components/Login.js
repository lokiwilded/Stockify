import { GoogleLogin } from '@react-oauth/google';
import React from 'react';

const Login = ({ setToken }) => {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        setToken(credentialResponse.credential);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
};

export default Login;
