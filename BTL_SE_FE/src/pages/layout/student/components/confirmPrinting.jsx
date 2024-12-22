import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './css/uploadFiles/confirmPrinting.css';
import Printer from "./img/multifunction-printer.png";
import { useNavigate } from "react-router-dom";
import { color } from "chart.js/helpers";
// api
import { generateOTPToPrint, veriFyToPrint, getAllPrinters } from "../../../../api";
const title = {
  fontSize: "2.2vh",
  color: "black",
}

function ConfirmPrinting() {
  const navigate = useNavigate()
  const location = useLocation();
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [otp, setOtp] = useState("");
  const printingData = location.state.printingData;
  const fileData = location.state.fileData;
  const [showOTP, setShowOTP] = useState(false);
  const [infoPrinters, setInfoPrinters] = React.useState([]);
  const [loading, setLoading] = React.useState(true); // Trạng thái chờ
  // Kiểm tra hoặc đặt giá trị `user` từ API, localStorage, hoặc state management.
  React.useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const result = await getAllPrinters(); // Chờ hàm getUser() trả về kết quả
        // const result = await logoutUser()
        console.log(result); // In kết quả
        if (result) {
          setInfoPrinters(result.metaData); // Lưu thông tin user
        }
      } catch (error) {
        // ở đây nên làm cái allert error message
        // alert(error.message);
        console.error('Error fetching user:', error.message);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };
    fetchUser();
    // setLoading(false);
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Hiển thị màn hình loading trong khi chờ
  }
  const handleClick = async () => {
    setShowOTP(!showOTP);
    console.log("selectedPrinter,", selectedPrinter)
    console.log("fileData,", fileData)
    console.log("printingData", printingData)
    const response = await generateOTPToPrint()
    const result = response.metaData
    console.log("result from generateOTP", result)
  };
  const handleOTP = async () => {
    const isDoubleSided = printingData.printingOption === "In 1 mặt" ? false : true
    const formData = new FormData();
    formData.append("otp", otp);
    formData.append("totalPages", parseInt(printingData.pageNumber));
    formData.append("isDoubleSided", isDoubleSided);
    formData.append("documentFile", fileData.file); // Nếu có file
    formData.append("pageType", printingData.paperSize);
    formData.append("numCopies", printingData.numberOfCopies);
    formData.append("printerId", selectedPrinter);
    formData.append("building", selectedBuilding);
    const formDataObject = Object.fromEntries(formData.entries());
    console.log("formDataObject", formDataObject);

    const response = await veriFyToPrint(formData)
    const result = response.metaData
    console.log("result from veriFy", result)
    if (result) {
      alert("In thành công !")
      navigate("/student/upload_file")
    }
  }

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
            // value={otp}
            onBlur={(e) => setOtp(e.target.value)}
          />
        </div>
        {/* <input type="submit" value="Xác nhận" className="OTP-submit" /> */}
        <button type="button" className="OTP-submit" onClick={handleOTP}> Xác nhận </button>
      </form>
    );
  }
  return (
    <div className="confirmPrinting">
      <div className="confirmPrinting-body row">
        <div className="confirmPrinting-infor col-8" style={{ marginTop: '5rem' }}>
          <div className="confirmPrinting-infor_choosePrinter row">
            <div className="building col">
              <label for="options" className="building-title">
                Tòa nhà
              </label>
              <select defaultValue="" className="numberOfCopies-option" name="options" onChange={(e) => setSelectedBuilding(e.target.value)}>
                <option value="" disabled hidden>Chọn tòa </option>
                <option value="H6">H6</option>
                <option value="H1">H1</option>
                <option value="H2">H2</option>
                <option value="H3">H3</option>
              </select>
            </div>
            <div className="printer col">
              <label for="options" className="building-title">
                Máy in
              </label>
              <select defaultValue="" className="numberOfCopies-option" name="options" onChange={(e) => setSelectedPrinter(e.target.value)}>
                {/* <option value="" disabled hidden>Chọn máy in</option>
                <option value="106H6">106H6</option>
                <option value="207H6">207H6</option>
                <option value="305H6">305H6</option>
                <option value="402H6">402H6</option> */}
                <option value="" disabled hidden>Chọn máy in</option>
                {infoPrinters.map(item => (
                  <option key={item._id} value={item._id}>
                    {item.room}
                  </option>
                ))}
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
            onClick={handleClick} style={{ color: 'white' }}>
            Xác nhận in
          </button>
          {showOTP && (
            <div className="overlay">
              <OTPcode />
            </div>
          )}
        </div>
        <img src={Printer} alt="Máy in" className="printer-img col-4" style={{ marginTop: '5rem' }} />
      </div>
    </div>
  );
}

export default ConfirmPrinting;
