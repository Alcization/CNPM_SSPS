import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './css/uploadFiles/uploadFile.css';
import chooseFile from "./img/chooseFile.png";
import config from "../../../../assets/config.json"

function ChooseFile({ setFileData }) {
  const hiddenFileInput = useRef(null); //hidden file input

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const [acceptedFileTypes, setAcceptedFileTypes] = useState('');

  useEffect(() => {
    setAcceptedFileTypes(config.acceptedFileTypes);
  }, []);

  const [file, setFile] = useState(null); //lưu file
  const [fileState, setFileState] = useState("nothing");

  const handleFileChange = (event) => {
    //thay đổi file
    setFile(event.target.files[0]);
    setFileState("success");
    setFileData((prevData) => ({
      ...prevData,
      file: event.target.files[0],
    }));
  };

  const handleDelete = (event) => {
    //xóa file
    setFile(null);
    setFileState("fail");
  };

  //upload success
  const UploadStatus = () => {
    if (fileState === "success") {
      return (
        <div className="content">
          <p className="fileName">{file.name}</p>
          <p className="notify success">Tải lên thành công</p>
        </div>
      );
    } else if (fileState === "fail") {
      return (
        <div className="content">
          <p className="notify">Tải lên thất bại</p>
        </div>
      );
    } else {
      return (
        <div className="content">
          <p className="notify">Chưa có file</p>
        </div>
      );
    }
  };

  return (
    <div className="chooseFile row">
      <div className="chooseFile-trigger col-sm-2">
        <p>Tải tài liệu</p>
        <button
          className="chooseFile-trigger__block"
          style={{ background: "none" }}
          onClick={handleClick}
        >
          <img
            src={chooseFile}
            alt="Chọn tập tin"
            className="chooseFile-img"
          ></img>
          <p>Chọn tập tin</p>
        </button>
        <input
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          ref={hiddenFileInput}
          style={{ display: "none" }}
        />
      </div>
      <div className="chooseFile-notify col-sm-10">
        <UploadStatus />
        <button onClick={handleDelete}>
          <i className="bx bx-trash"></i>
        </button>
      </div>
    </div>
  );
}

function PrintingInfo({ setPrintingData }) {
  //number of copies
  const [numberOfCopies, setNumberOfCopies] = useState();

  const changeNumberOfCopies = (event) => {
    setNumberOfCopies(event.target.value);
    setPrintingData((prevData) => ({
      ...prevData,
      numberOfCopies: event.target.value,
    }));
  };

  //paper size
  const [paperSize, setPaperSize] = useState();

  const changePaperSize = (event) => {
    setPaperSize(event.target.value);
    setPrintingData((prevData) => ({
      ...prevData,
      paperSize: event.target.value,
    }));
  };

  //page number
  const [pageNumber, setPageNumber] = useState("");

  const changePageNumber = (event) => {
    setPageNumber(event.target.value);
    setPrintingData((prevData) => ({
      ...prevData,
      pageNumber: event.target.value,
    }));
  };

  //printing option
  const [printingOption, setPrintingOption] = useState();

  const changePrintingOption = (event) => {
    setPrintingOption(event.target.value);
    setPrintingData((prevData) => ({
      ...prevData,
      printingOption: event.target.value,
    }));
  };

  //direction
  const [direction, setDirection] = useState();

  const changeDirection = (event) => {
    setDirection(event.target.value);
    setPrintingData((prevData) => ({
      ...prevData,
      direction: event.target.value,
    }));
  };

  return (
    <div className="printingInfo">
      <div className="row">
        <div className="numberOfCopies col">
          <label htmlFor="options" className="numberOfCopies-title">
            Số bản
          </label>
          <select
            className="numberOfCopies-option"
            name="options"
            value={numberOfCopies}
            onChange={changeNumberOfCopies}
          >
            <option value="">Chọn số bản</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="paperSize col">
          <label htmlFor="options" className="paperSize-title">
            Khổ giấy
          </label>
          <select
            className="paperSize-option"
            name="options"
            value={paperSize}
            onChange={changePaperSize}
          >
            <option value="">Chọn khổ giấy</option>
            <option value="A4">A4</option>
            <option value="A5">A5</option>
            <option value="A3">A3</option>
          </select>
        </div>
        <div className="pageNumer col">
          <p>Số trang in</p>
          <input
            type="text"
            className="pageNumber-input"
            placeholder="VD: 1-10"
            value={pageNumber}
            onChange={changePageNumber}
          />
        </div>
      </div>
      <div className="row">
        <div className="printingOption col">
          <label htmlFor="options" className="printingOption-title">
            Tùy chọn in
          </label>
          <select
            className="printingOption-option"
            name="options"
            value={printingOption}
            onChange={changePrintingOption}
          >
            <option value="">Chọn số mặt in</option>
            <option value="In 1 mặt">In 1 mặt</option>
            <option value="In 2 mặt">In 2 mặt</option>
          </select>
        </div>
        <div className="Direction col">
          <label htmlFor="options" className="Direction-title">
            Khổ
          </label>
          <select
            className="Direction-option"
            name="options"
            value={direction}
            onChange={changeDirection}
          >
            <option value="">Chọn khổ</option>
            <option value="Dọc">Dọc</option>
            <option value="Ngang">Ngang</option>
          </select>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
}
// , fileData
//, file: fileData
function Trigger({ printingData, fileData }) {
  return (
    <div className="trigger">
      <NavLink to={'/student/student_home'} className="trigger-link">
        <button type="button" className="trigger-btn trigger-btn-cancel">
          Hủy bỏ
        </button>
      </NavLink>
      <NavLink
        to={'/student/confirm_printing'}
        state={{ printingData, fileData }}
        className="trigger-link-continue"
      >
        <button type="button" className="trigger-btn trigger-btn-continue">
          Tiếp theo
        </button>
      </NavLink>
    </div>
  );
}

function UploadFile() {
  const [printingData, setPrintingData] = useState({
    numberOfCopies: "",
    paperSize: "",
    pageNumber: "",
    printingOption: "",
    direction: "",
  });
  const [fileData, setFileData] = useState({
    file: null,
  });
  return (
    <div className='uploadFile1' style={{marginTop: '5rem'}}>
      <ChooseFile setFileData={setFileData} />
      <PrintingInfo setPrintingData={setPrintingData} />
      <Trigger printingData={printingData} fileData={fileData} />
    </div>
  );
}

export default UploadFile;
