import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import home from '../../../assets/home.png';
import printer from '../../../assets/printer small.png';
import slider from '../../../assets/sliders.png';
import chart from '../../../assets/bar-chart-2.png';
import clipboard from '../../../assets/clipboard.png';
import book from '../../../assets/book.png';
import user from '../../../assets/user.png';

const navItems = [
  { icon_: {home}, label_: "Trang chủ", centered: true},
  { icon_: {printer}, label_: "Máy in", centered: true},
  { icon_: {slider}, label_: "Cấu hình", centered: true },
  { icon_: {chart}, label_: "Báo cáo", centered: true },
  { icon_: {clipboard}, label_: "Lịch sử", centered: true },
  { icon_: {book}, label_: "Thư viện", marginTop: true },
  { icon_: {user}, label_: "Người dùng", marginTop: true }
];

const LeftSidebar = () => {
  return (
    <nav className="Sidebar">
      {navItems.map((item, index) => (

        <NavLink key={index} to={`/${item.label_}`} className="nav_Item">
          <img src={Object.values(item.icon_)} alt={item.label_} />
          <span>{item.label_}</span>
        </NavLink>

      ))}
    </nav>
  );
};

export default LeftSidebar;