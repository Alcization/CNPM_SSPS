import React from 'react';
import './Header.css';
import NavBar from './navbar';
const Header = () => {
  return (
    <header className="header_admin"  style={{backgroundColor: 'aquamarine'}}>
      <NavBar />
    </header>
  );
};

export default Header;