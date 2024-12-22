import React, { useState } from "react";

import "../../css/admin/sidebar.css";

import { NavLink } from "react-router-dom";

function Admin() {
  const [button, setButton] = useState("");
  const [config, setConfig] = useState(false);

  const handleButtonClick = (button) => {
    setButton(button);
    if (button === "button3") {
      setConfig(true);
    } else {
      setConfig(false);
    }
  };

  return (
    <div className="toolbar">
      <div className="block block-home">
        <NavLink
          to="/home"
          className="block-link"
          onClick={() => handleButtonClick("button1")}
        >
          <i class="bx bx-home-alt"></i>
          <p>Trang chủ</p>
        </NavLink>
      </div>
      <div className="block block-printer">
        <NavLink
          to="/printer"
          className="block-link"
          onClick={() => handleButtonClick("button2")}
        >
          <i class="bx bx-printer"></i>
          <p>Máy in</p>
        </NavLink>
      </div>
      <div className="block block-config">
        <NavLink
          to="/config/allocation"
          onClick={() => handleButtonClick("button3")}
          className="block-link"
        >
          <i class="bx bx-slider bx-rotate-270"></i>
          <p>Cấu hình</p>
        </NavLink>
      </div>
      {config && (
        <div className="block block-config">
          <NavLink
            to="/config/allocation"
            className="block-link block-link-config"
            onClick={() => handleButtonClick("button3")}
          >
            <p>Cấp phát</p>
          </NavLink>
        </div>
      )}
      {config && (
        <div className="block block-config">
          <NavLink
            to="/config/file_type"
            className="block-link block-link-config"
            onClick={() => handleButtonClick("button3")}
          >
            <p>Định dạng file</p>
          </NavLink>
        </div>
      )}

      <div className="block block-report">
        <NavLink
          to="/report"
          className="block-link"
          onClick={() => handleButtonClick("button4")}
        >
          <i class="bx bx-signal-3"></i>
          <p>Báo cáo</p>
        </NavLink>
      </div>
      <div className="block block-history">
        <NavLink
          to="/history"
          className="block-link"
          onClick={() => handleButtonClick("button5")}
        >
          <i class="bx bx-clipboard"></i>
          <p>Lịch sử</p>
        </NavLink>
      </div>
      <div className="block block-user">
        <NavLink
          to="/user"
          className="block-link"
          onClick={() => handleButtonClick("button7")}
        >
          <i class="bx bx-user"></i>
          <p>Người dùng</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Admin;
