import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import home from '../../../assets/home.png';
import printer from '../../../assets/printer small.png';
import slider from '../../../assets/sliders.png';
import chart from '../../../assets/bar-chart-2.png';
import clipboard from '../../../assets/clipboard.png';
import book from '../../../assets/book.png';
import user from '../../../assets/user_icon.png';
import clock from '../../../assets/clock.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const navItems = [
  { icon_: { home }, label_: "Trang chủ", centered: true, link_: "admin/admin_home" },
  { icon_: { printer }, label_: "Trạng thái", centered: true, link_: "admin/printer_status" },
  { icon_: { printer }, label_: "Thông tin", centered: true, link_: "admin/printer_info" },
  { icon_: { slider }, label_: "Cấp phát", centered: true, link_: "admin/allocation" },
  { icon_: { slider }, label_: "Định dạng", centered: true, link_: "admin/file_type" },
  { icon_: { chart }, label_: "Báo cáo", centered: true, link_: "admin/report" },
  { icon_: { clock }, label_: "Lịch sử in", centered: true, link_: "admin/history" },
  { icon_: { clipboard }, label_: "Lịch sử mua", centered: true, link_: "admin/admin_payment" },
  // { icon_: {book}, label_: "Thư viện", marginTop: true, link_: "admin/library" },
  // { icon_: { user }, label_: "Người dùng", marginTop: true, link_: "admin/users" }
];

const LeftSidebar = () => {
  return (
    <nav className="Sidebar">
      {navItems.map((item, index) => (

        <NavLink key={index} to={`/${item.link_}`} className="nav_Item">
          <img src={Object.values(item.icon_)} alt={item.label_} />
          <span>{item.label_}</span>
        </NavLink>

      ))}
    </nav>
  );
};

export default LeftSidebar;