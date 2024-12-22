import React from "react";
import BuyPrintingPaper from "./img/BuyPrintingPaper.png";
import Printer from "./img/printer.png";
import PrintingHistory from "./img/PrintingHistory.png";

import { NavLink } from "react-router-dom";
import "./css/home/home.css";

function Home() {
  return (
    <div className="home container">
      <div className="Home row">

        <div className="home-block printingDocument col-md-4">
          <NavLink to={'/student/upload_file'} className="link printingDocument-nav-link">
            <img
              src={Printer}
              alt="Printer"
              className="img printingDocument-logo__img"
            />
            <p className="homeblocktitle">IN TÀI LIỆU</p>
          </NavLink>
        </div>

        <div className="home-block printingHistory col-md-4">
          <NavLink to={'/student/printingLog'} className="link printingHistory-nav-link">
            <img
              src={PrintingHistory}
              alt="PrintingHistory"
              className="img printingHistory-logo__img"
            />
            <p className="homeblocktitle">LỊCH SỬ IN ẤN</p>
          </NavLink>
        </div>

        <div className="home-block buyPrintingPaper col-md-4">
          <NavLink to={'/student/buy_printing_paper'} className="link buyPrintingPaper-nav-link">
            <img
              src={BuyPrintingPaper}
              alt="BuyPrintingPaper"
              className="img buyPrintingPaper-logo__img"
            />
            <p className="homeblocktitle">MUA TRANG IN</p>
          </NavLink>
        </div>

      </div>
    </div>
  );
}

export default Home;
