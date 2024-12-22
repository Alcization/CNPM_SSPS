import React from 'react';
import Logo_header from './Logo_header';
import Navigation from './Navigation';
import LoginButton from './LoginButton';
import './Header.css';

const Header = () => {
  return (
    <header className="header_1">
      <div className="headerContent">
        <Logo_header />
        <Navigation />
        <LoginButton />
      </div>
    </header>
  );
};

export default Header;