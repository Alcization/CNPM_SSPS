import React from "react";
import hcmut from "../../../../assets/logoBK.png";
import { NavLink } from "react-router-dom";
import "./css/hcmut.css";

function HCMUT() {
  return (
    <div className="HCMUT" id="HCMUT-id">
      <div className="HCMUT-logo">
        <img src={hcmut} alt="HCMUT" className="HCMUT-logo__img" />
      </div>
      <div className="HCMUT-slogan">
        <NavLink to={'/student/student_home'} className="HCMUT-slogan-nav-link">
          <p className="line1">Trường Đại học Bách Khoa - ĐHQG TP.HCM</p>
          <p>Student Smart Printing Service</p>
        </NavLink>
      </div>
    </div>
  );
}

export default HCMUT;
