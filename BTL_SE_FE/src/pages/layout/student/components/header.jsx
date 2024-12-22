import React from "react";

import HCMUT from "./hcmut";
import NavBar from "./navbar";

import "./css/header.css";

function Header() {
  return (
    <div className="header">
      <HCMUT />
      <NavBar />
    </div>
  );
}

export default Header;
