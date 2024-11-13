import React from 'react';
import bg from '../../../assets/about_bg.jpg'
import './AboutContent.css';

const AboutContent = () => {
  return (
    <div className="introSection">
      <img src={bg} alt="backgroundImage" className="backgroundImage" />
      <div className="contentWrapper">
        <h1 className="title_about">Giới thiệu</h1>
        <p className="description">
          Student Smart Printing Service là một dự án được thực hiện dưới sự quản lý của Trường Đại học Bách Khoa
           - ĐHQG TP.HCM
        </p>
        <div className="establishmentInfo">
          <h2 className="subtitle">Thành lập</h2>
          <p className="details">
            Dự án được ra đời nhằm mục đích hỗ trợ sinh viên của trường trong việc in ấn. 
            Việc in ấn từ lâu đã là một phần không thể thiếu trong cuộc sống học tập của sinh viên đã đặt một 
            nhu cầu cấp thiết có một hệ thống cho phép sinh viên tiếp cận với các thiết bị in ấn, hệ thống tài 
            liệu thư viện một cách nhanh chóng, tiện lợi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;