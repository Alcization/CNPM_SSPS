import { useState, useEffect } from "react";

import "./navbar.css";
import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { logoutUser } from "../../../api";


function Setting() {
  const navigate = useNavigate()
  const logOut = async () => {
    console.log("ddang chayj log out")

    const result = await logoutUser()

    console.log("logout successfull")
    if (result.metaData) {

      // navigate('/')
      window.location.href = `${window.location.origin}?redirectTo=/`;
    }
  }
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get('redirectTo');
    if (redirectTo) {
      navigate(redirectTo);
    }
  }, [navigate]);
  return (
    <div className="setting">
      <div className="setting-block-navBar"></div>
      <div className="setting-block paperNo">
        <p className="line1">Số trang in</p>
        <p>NULL</p>
      </div>
      <div className="setting-block logo AccountInfo">
        <NavLink to={'/student/student_account'} className="setting-block-link">
          <i className="bx bx-user"></i>
          <p>Thông tin tài khoản</p>
        </NavLink>
      </div>
      <div className="setting-block logo logOut">
        {/* <NavLink
          to="/"
          className="setting-block-link"
        > */}
        <button className="setting-block-link" style={{ background: "white", border: "none", height: "10px" }} onClick={() => { logOut(); }}>
          <i className="bx bx-log-out"></i>
          <p>Đăng xuất</p>
        </button>
        {/* </NavLink> */}
      </div>
    </div>
  );
}

function NavBar() {
  const [showSetting, setShowSetting] = useState(false);

  const handleShowSetting = () => {
    setShowSetting(!showSetting);
  }

  return (
    <nav className="navbar-nav">
      <ul className="navbar-nav-ul">
        <li className="navbar-nav-ul-li">
          <NavLink to="/" className="navbar-nav-ul-li-link">
            <i className="bx bx-message-rounded"></i>
          </NavLink>
        </li>
        <li className="navbar-nav-ul-li">
          <NavLink to="/" className="navbar-nav-ul-li-link">
            <i className="bx bx-bell"></i>
          </NavLink>
        </li>
        <li className="navbar-nav-ul-li">
          <NavLink
            to="/"
            className="navbar-nav-ul-li-link navbar-nav-ul-li-link__admin"
          >
            <i className="bx bx-user-circle"></i>
            <p>Admin</p>
          </NavLink>
        </li>
        <li className="navbar-nav-ul-li">
          <div className="navbar-nav-ul-li-link">
            <i className="bx bx-cog " onClick={handleShowSetting}></i>
          </div>
        </li>
      </ul>
      {showSetting && <Setting />}
    </nav>
  );
}

export default NavBar;
