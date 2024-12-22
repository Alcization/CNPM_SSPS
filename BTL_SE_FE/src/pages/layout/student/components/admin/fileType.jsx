import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import "../css/admin/fileType.css";
import ConfigType from "../../../../../assets/config.json";

function FileTypeBody() {
  const [fileSize, setFileSize] = useState(0);

  const increaseFileSize = () => {
    setFileSize(fileSize + 1);
  };

  const decreaseFileSize = () => {
    if (fileSize - 1 >= 0) {
      setFileSize(fileSize - 1);
    }
  };
  return (
    <div className="file-type-body d-flex align-items-start justify-content-between">
      <div className="filesName">
        <div className="filesName-header d-flex align-items-center justify-content-between">
          <div className="fileExtension col-5 d-flex align-items-center justify-content-center">
            <p>Tên đuôi</p>
            <i className="bx bxs-chevron-down"></i>
          </div>
          <div className="fileTypical col-5 d-flex align-items-center justify-content-center">
            <p>Loại file</p>
            <i className="bx bxs-chevron-down"></i>
          </div>
          <div className="deleteIcon col-2 d-flex align-items-center justify-content-center">
            <i class="bx bx-trash"></i>
          </div>
        </div>
        {/* {thêm một số dữ liệu nhờ arr của arr sau} */}
        {ConfigType.acceptedFileTypes.split(',').map((type) => (
          <div key={type} className="filesName-body d-flex align-items-center justify-content-between">
            <div className="fileExtension col-5 d-flex align-items-center justify-content-center">
              <p>{type}</p>
            </div>
            <div className="fileTypical col-5 d-flex align-items-center justify-content-center">
              <p>Văn bản</p>
            </div>
            <div className="deleteIcon col-2 d-flex align-items-center justify-content-center">
              <i className="bx bx-trash"></i>
            </div>
          </div>
        ))}
      </div>
      <div className="editFileConstraint d-flex flex-column align-items-center justify-content-between">
        <div className="fileType-add">
          <p className="title">Thêm định dạng file</p>
          <div className="fileType-add-content">
            <div className="fileType-add-extension d-flex align-items-center justify-content-between">
              <label for="fileType-add">Tên đuôi</label>
              <input
                type="text"
                className="fileType-add-input"
                name="fileType-add-input"
              />
            </div>
            <div className="fileType-add-typical d-flex align-items-center justify-content-between">
              <label for="fileType-add">Loại file</label>
              <select className="fileType-add-input" name="fileTypical">
                <option value=""></option>
                <option value="1">Văn bản</option>
                <option value="2">Trình chiếu</option>
                <option value="3">Hình ảnh</option>
              </select>
            </div>
            <div className="fileType-add-trigger d-flex align-items-center justify-content-center">
              <button
                type="submit"
                className="fileType-add-btn d-flex flex-row align-items-center justify-content-between"
              >
                <i class="bx bx-plus-circle"></i>
                <p>Thêm</p>
              </button>
            </div>
          </div>
        </div>
        <div className="fileSize">
          <p className="title">Kích thước file tối đa</p>
          <div className="fileSize-content d-flex flex-column align-items-center justify-content-center">
            <div className="fileSize-number d-flex flex-row align-items-center">
              <label for="numberSize">Kích thước</label>
              <input
                type="text"
                className="numberSize-input"
                name="numberSize"
                value={fileSize}
              />
              <div className="fileSize-arrow d-flex flex-column">
                <i className="bx bxs-chevron-up" onClick={increaseFileSize}></i>
                <i
                  className="bx bxs-chevron-down"
                  onClick={decreaseFileSize}
                ></i>
              </div>
              <p className="unit">MB</p>
            </div>
            <div className="fileSize-trigger">
              <button
                type="button"
                className="fileSize-btn d-flex flex-row align-items-center justify-content-center"
              >
                <i class="bx bx-edit"></i>
                <p>Cài đặt</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileType() {
  return (
    <div className="fileType">
      <div className="body">
        <FileTypeBody />
      </div>
    </div>
  );
}

export default FileType;