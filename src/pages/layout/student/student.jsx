import React from "react";
import "./components/css/app.css";
import "./components/css/lang.css";
import "bootstrap/dist/css/bootstrap.css";
import { Outlet } from 'react-router-dom';
import Header from "./components/header";

function Student() {
  return (
      <div className="wrapper">
        <Header />
        <Outlet/>
      </div>
  );
}

export default Student;


