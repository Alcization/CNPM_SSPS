import { useState, useEffect } from "react";

import "./css/navbar.css";
import "./css/header.css";

import { NavLink } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import { useNavigate } from "react-router-dom";
//api
import { logoutUser, getInFoStudent } from "../../../../api";


function Setting() {
  const navigate = useNavigate()
  const [infoStudent, setinfoStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const Logout = async () => {

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
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // taoj cart tuwj nhieen truocs khi render toi trả về kết quả
        const response = await getInFoStudent()
        const result = response.metaData
        setinfoStudent(result)
      } catch (error) {
        // ở đây nên làm cái allert error message
        console.error('Error fetching user:', error.message);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };
    fetchUser();
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Hiển thị màn hình loading trong khi chờ
  }

  return (
    <div className="setting">
      <div className="setting-block-navBar"></div>
      <div className="setting-block paperNo">
        <p className="line1">Số trang in</p>
        <p>{infoStudent.numberPageValid}</p>
      </div>
      <div className="setting-block logo AccountInfo">
        <NavLink to={'/student/student_account'} className="setting-block-link" >
          <i className="bx bx-user"></i>
          <p>Thông tin tài khoản</p>
        </NavLink>
      </div>
      <div className="setting-block logo logOut">
        <button className="setting-block-link" style={{ background: "white", border: "none", height: "10px" }} onClick={() => { Logout() }}>
          <i className="bx bx-log-out"></i>
          <p>Đăng xuất</p>
        </button>
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
            <p>Lộc</p>
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
