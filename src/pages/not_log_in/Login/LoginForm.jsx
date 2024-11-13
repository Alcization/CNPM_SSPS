import React from 'react';
import { NavLink } from 'react-router-dom';
import './Login.css';
import InputField from './InputField';
import email from '../../../assets/email.png'
import key from '../../../assets/key.png'

const LoginForm = () => {
  return (
    <form className="loginForm">
      <InputField
        type="email"
        placeholder="Email"
        icon={email}
        alt="Email icon"
      />
      <InputField
        type="password"
        placeholder="Password"
        icon={key}
        alt="Password icon"
        showPasswordToggle
      />
      {/* <button type="submit" className="loginButton">
        Login
      </button> */}
      <NavLink to={'login'}>
        <button className="loginButton">Login as student</button>
      </NavLink>
      <NavLink to={"/admin_home"}>
        <button className="loginButton">Login as admin</button>
      </NavLink>

    </form>
  );
};

export default LoginForm;