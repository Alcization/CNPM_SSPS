import React from 'react';
import './LoginButton.css';
import { NavLink } from 'react-router-dom';

const LoginButton = () => {
  return (
    <NavLink to={'login'}>
      <button className="loginButton">Đăng nhập</button>
    </NavLink>
  );
};

export default LoginButton;