import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './css/uploadFiles/confirmPrinting.css';
import Printer from "./img/multifunction-printer.png";
import { color } from "chart.js/helpers";

const title = {
  fontSize: "2.2vh",
  color: "black",
}

function ConfirmPrinting() {
  const location = useLocation();

  const printingData = location.state.printingData;
  const fileData = location.state.fileData;

  const [showOTP, setShowOTP] = useState(false);

  const handleClick = () => {
    setShowOTP(!showOTP);
  };

  function OTPcode() {
    return (
      <form className="OTPcode">
        <div className="OTPcode-input">
          <label for="otp" className="OTP-title">
            Nhập OTP
          </label>
          <input
            type="text"
            className="OTP-input"
            name="otp"
            maxlength="6"
            pattern="\d{6}"
            required
          />
        </div>
        <input type="submit" value="Xác nhận" className="OTP-submit" />
      </form>
    );
  }
  return (
    <div className="confirmPrinting">
      <div className="confirmPrinting-body row">
        <div className="confirmPrinting-infor col-8" style={{marginTop: '5rem'}}>
          <div className="confirmPrinting-infor_choosePrinter row">
            <div className="building col">
              <label for="options" className="building-title">
                Tòa nhà
              </label>
              <select className="numberOfCopies-option" name="options">
                <option value="option1">H6</option>
                <option value="option2">H1</option>
                <option value="option3">H2</option>
                <option value="option3">H3</option>
              </select>
            </div>
            <div className="printer col">
              <label for="options" className="building-title">
                Máy in
              </label>
              <select className="numberOfCopies-option" name="options">
                <option value="option1">106H6</option>
                <option value="option2">207H6</option>
                <option value="option3">305H6</option>
                <option value="option3">402H6</option>
              </select>
            </div>
          </div>
          <div className="confirmPrinting-infor_showInfor">
            <div className="confirmPrinting-infor_showInfor__fileName">
              {fileData.file ? fileData.file.name : "Chưa có file"}
            </div>
            <div className="confirmPrinting-infor_showInfor__DocInfor">
              <div className="row">
                <div className="numberOfCopies col">
                  <p className={title}>Số bản</p>
                  <p className="detail">
                    {printingData?.numberOfCopies || "Không có dữ liệu"}
                  </p>
                </div>
                <div className="paperSize col">
                  <p className={title}>Khổ giấy</p>
                  <p className="detail">
                    {printingData?.paperSize || "Không có dữ liệu"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="PrintOption col">
                  <p className={title}>Tùy chọn in</p>
                  <p className="detail">
                    {printingData?.printingOption || "Không có dữ liệu"}
                  </p>
                </div>
                <div className="Direction col">
                  <p className={title}>Khổ</p>
                  <p className="detail">
                    {printingData?.direction || "Không có dữ liệu"}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="pageNumber col-6">
                  <p className={title}>Số trang in</p>
                  <p className="detail">
                    {printingData?.pageNumber || "Không có dữ liệu"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="confirmPrinting-link__trigger"
            onClick={handleClick} style={{color: 'white'}}>
            Xác nhận in
          </button>
          {showOTP && (
            <div className="overlay">
              <OTPcode />
            </div>
          )}
        </div>
        <img src={Printer} alt="Máy in" className="printer-img col-4" style={{marginTop: '5rem'}}/>
      </div>
    </div>
  );
}

export default ConfirmPrinting;
