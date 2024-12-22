import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import { NavLink } from "react-router-dom";

import "../css/admin/addCalendar.css";
// api
import { createDefaultPage } from "../../../../../api";

function AddAllocationCalendar() {
  const [semester, setSemester] = useState("");

  const handleChangeSemester = (event) => {
    setSemester(event.target.value);
  };

  const [startSchoolYear, setStartSchoolYear] = useState(
    new Date().getFullYear()
  );
  const [endSchoolYear, setEndSchoolYear] = useState(startSchoolYear + 1);

  const increaseSchoolYear = () => {
    setStartSchoolYear(startSchoolYear + 1);
    setEndSchoolYear(endSchoolYear + 1);
  };

  const decreaseSchoolYear = () => {
    setStartSchoolYear(startSchoolYear - 1);
    setEndSchoolYear(endSchoolYear - 1);
  };

  const today = new Date();
  const [day, setDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth() + 1); // Tháng bắt đầu từ 0
  const [year, setYear] = useState(today.getFullYear());
  const [error, setError] = useState("");

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const days = Array.from(
    { length: getDaysInMonth(month, year) },
    (_, i) => i + 1
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 21 }, (_, i) => today.getFullYear() + i);

  const isValidDate = (d, m, y) => {
    const date = new Date(y, m - 1, d);
    return (
      // date.getFullYear() === y &&
      // date.getMonth() + 1 === m &&
      // date.getDate() === d
      date.getFullYear() === y &&
      date.getMonth() + 1 === m
    );
  };








  // TODO : Get data in add calendar here
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(day, month, year)
    if (isValidDate(day, month, year)) {
      setError("");
      // alert(`Ngày cấp phát: ${day}/${month}/${year}`);
      const semesters = semester;
      // const year = `${startSchoolYear}-${endSchoolYear}`;
      // Tạo một đối tượng Date với thứ tự yyyy-mm-dd
      // const dateObject = new Date(`${startSchoolYear}-${month}-${day}T00:00:00.000Z`);
      const dateObject = new Date(`${startSchoolYear}-${month}-${day}T00:00:00.000Z`);
      // Chuyển sang chuỗi ISO
      const isoDate = dateObject.toISOString();

      const papers = numOfPaper.value;
      // console.log(semesters, year, date, papers);
      const dataBody = {
        semester: semesters,
        startDateHK1: isoDate,
        defaultPage: papers,
        priceA4: 200
      }
      console.log(dataBody); // Output: 2024-08-19T00:00:00.000Z
      const result = await createDefaultPage(dataBody)
      if (result) {
        alert("Cấp phát thành công")
      }
    } else {
      setError("Lỗi nhập dữ liệu");
    }
  };


  useEffect(() => {
    // Cập nhật số ngày khi tháng hoặc năm thay đổi
    setDay((prevDay) => Math.min(prevDay, getDaysInMonth(month, year)));
  }, [month, year]);

  return (
    <div className="addAllocationCalendar">
      <div className="content">
        <p className="title">Thêm lịch cấp phát</p>
      </div>
      <form className="addCalendar-form" onSubmit={handleSubmit}>
        <div className="addCalendar-content row">
          <div className="col-6">
            <div className="addCalendar-infor addCalendar-infor-semester d-flex flex-column ">
              <label for="semester" className="semester">
                Học kì
              </label>
              <input
                type="text"
                class="addCalendar-semester-control"
                id="semester"
                name="semester"
                maxLength="3"
                onChange={handleChangeSemester}
                required
              />
            </div>
            <div className="addCalendar-infor allocationDay d-flex flex-column ">
              <label>Ngày cấp phát </label>
              <div className="allocationDay-content">
                <select value={day} onChange={(e) => setDay(e.target.value.toString())}>
                  <option value="">Ngày</option>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {" / "}
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Tháng</option>
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                {" / "}
                <select value={year} onChange={(e) => setYear(e.target.value)}>
                  <option value="">Năm</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </div>
          <div className="col-6">
            <div className="addCalendar-infor schoolYear d-flex flex-column">
              <label>Năm học</label>
              <div className="schoolYear-content d-flex flex-row align-items-center justify-content-center">
                <p>
                  {startSchoolYear} - {endSchoolYear}
                </p>
                <div className="schoolYear-trigger d-flex flex-column">
                  <i
                    className="bx bxs-chevron-up"
                    onClick={increaseSchoolYear}
                  ></i>
                  <i
                    className="bx bxs-chevron-down"
                    onClick={decreaseSchoolYear}
                  ></i>
                </div>
              </div>
            </div>

            <div className="addCalendar-infor numOfPaper d-flex flex-column">
              <label for="numOfPaper">Số trang cấp phát</label>
              <input
                type="text"
                class="addCalendar-numOfPaper-control"
                id="numOfPaper"
                name="numOfPaper"
                required
              />
            </div>
          </div>
          <div className="addCalendar-trigger d-flex flex-row align-items-center">
            <NavLink to="/admin/allocation" className="addCalendar-trigger-link">
              <button type="button" className="addCalendar-trigger-btn triggerCancel">Hủy</button>
            </NavLink>
            <button type="submit" className="addCalendar-trigger-btn triggerAdd d-flex flex-row align-items-center justify-content-between">
              <i class="bx bx-plus-circle"></i>
              <p>Thêm lịch</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function AddSemester() {
  const [semester, setSemester] = useState("");

  const handleChangeSemester = (event) => {
    setSemester(event.target.value);
  };

  const [startSchoolYear, setStartSchoolYear] = useState(
    new Date().getFullYear()
  );
  const [endSchoolYear, setEndSchoolYear] = useState(startSchoolYear + 1);

  const increaseSchoolYear = () => {
    setStartSchoolYear(startSchoolYear + 1);
    setEndSchoolYear(endSchoolYear + 1);
  };

  const decreaseSchoolYear = () => {
    setStartSchoolYear(startSchoolYear - 1);
    setEndSchoolYear(endSchoolYear - 1);
  };

  const today = new Date();
  const [day, setDay] = useState(today.getDate());
  const [month, setMonth] = useState(today.getMonth() + 1); // Tháng bắt đầu từ 0
  const [year, setYear] = useState(today.getFullYear());
  const [error, setError] = useState("");

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const days = Array.from(
    { length: getDaysInMonth(month, year) },
    (_, i) => i + 1
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 21 }, (_, i) => today.getFullYear() + i);

  const isValidDate = (d, m, y) => {
    const date = new Date(y, m - 1, d);
    return (
      date.getFullYear() === y &&
      date.getMonth() + 1 === m &&
      date.getDate() === d
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidDate(day, month, year)) {
      setError("");
      alert(`Ngày cấp phát: ${day}/${month}/${year}`);
    } else {
      setError("Ngày không hợp lệ");
    }
  };

  useEffect(() => {
    // Cập nhật số ngày khi tháng hoặc năm thay đổi
    setDay((prevDay) => Math.min(prevDay, getDaysInMonth(month, year)));
  }, [month, year]);
  return (
    <div className="addSemester">
      <div className="content">
        <p className="title">Thêm học kỳ</p>
      </div>
      <form className="addSemester-form" onSubmit={handleSubmit}>
        <div className="addSemester-content d-flex flex-row justify-content-between align-items-center">
          <div className="addSemester-infor semester d-flex flex-column">
            <label for="semester">Học kì</label>
            <input
              type="text"
              class="addSemester-control"
              id="semester"
              name="semester"
              maxLength="3"
              onChange={handleChangeSemester}
              required
            />
          </div>
          <div className="addSemester-infor schoolYear d-flex flex-column">
            <label>Năm học</label>
            <div className="schoolYear-content d-flex flex-row align-items-center justify-content-center">
              <p>
                {startSchoolYear} - {endSchoolYear}
              </p>
              <div className="schoolYear-trigger d-flex flex-column">
                <i
                  className="bx bxs-chevron-up"
                  onClick={increaseSchoolYear}
                ></i>
                <i
                  className="bx bxs-chevron-down"
                  onClick={decreaseSchoolYear}
                ></i>
              </div>
            </div>
          </div>
          <div className="addSemester-infor startSchoolSemester d-flex flex-column">
            <label>Ngày bắt đầu học kỳ </label>
            <div className="startSchoolSemester-content">
              <select value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="">Ngày</option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {" / "}
              <select value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="">Tháng</option>
                {months.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {" / "}
              <select value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Năm</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
        <div className="addCalendar-trigger d-flex flex-row align-items-center">
          <NavLink to="/config/allocation" className="addCalendar-trigger-link">
            <button
              type="button"
              className="addCalendar-trigger-btn triggerCancel"
            >
              Hủy
            </button>
          </NavLink>
          <NavLink to="/config/allocation" className="addCalendar-trigger-link">
            <button
              type="button"
              className="addCalendar-trigger-btn triggerAdd d-flex flex-row align-items-center justify-content-between"
            >
              <i class="bx bx-plus-circle"></i>
              <p>Thêm học kỳ</p>
            </button>
          </NavLink>
        </div>
      </form>
    </div>
  );
}

function AddCalendarBody() {
  return (
    <div className="addCalendarBody">
      <AddAllocationCalendar />
      {/* <AddSemester /> */}
    </div>
  );
}

function AddCalendar() {
  return (
    <div className="addCalendar">
      <div className="body">
        <AddCalendarBody />
      </div>
    </div>
  );
}

export default AddCalendar;

