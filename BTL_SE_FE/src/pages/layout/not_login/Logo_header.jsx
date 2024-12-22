import React from 'react';
import logo from '../../../assets/logoBK.png'
import './Logo_header.css';

const Logo_header = () => {
  return (
    <div className="logo">
      <img src={logo} alt="HCMUT Logo" className="logoImage" />
      <div className="logoText">
        <span className="universityName">Trường Đại học Bách khoa - ĐHQG TP.HCM</span>
        <span className="serviceName">Student Smart Printing Service</span>
      </div>
    </div>
  );
};

export default Logo_header;
