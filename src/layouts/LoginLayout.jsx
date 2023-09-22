import React from 'react';
import { Outlet } from 'react-router-dom';

const LoginLayout = () => {
  return (
    <div dir='auto'>
      <Outlet />
    </div>
  );
};

export default LoginLayout;
