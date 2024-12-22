import React from 'react';
import './Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const navItems = [
    { id: '', label: 'Trang chủ' },
    { id: 'aboutcontent', label: 'Về chúng tôi' },
    { id: 'servicecontent', label: 'Dịch vụ' },
  ];

  return (
    <nav className="navigation">
      {navItems.map((item) => (
        <NavLink key={item.id} to={`${item.id}`} className="navItem">
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;