import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths, startOfMonth, format } from "date-fns";


import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  ArcElement,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";


import "../css/admin/report.css"
import { getReport, getCountPrinters } from "../../../../../api";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, ArcElement);

const BarChart1 = () => {
  const data = {
    labels: ["001", "002", "003", "004", "005", "006", "007", "008", "009"],
    datasets: [
      {
        label: "number of print page",
        data: [155, 35, 115, 145, 65, 195, 75, 85, 100],
        backgroundColor: "#D9B563",
        borderWidth: 1,
        barThickness: 27,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
        categoryPercentage: 1,
        barPercentage: 1,
      },
      y: { beginAtZero: true },
    },
    plugins: { legend: { display: true } },
  };

  return (
    <div className="bar-chart-1">
      <Bar data={data} options={options} />
    </div>
  );
};

const PieChart1 = () => {
  const data = {
    labels: ["Đang hoạt động", "Sẵn sàng", "Lỗi"],
    datasets: [
      {
        data: [11, 56, 33],
        backgroundColor: ["#4B9CFC", "#4BD396", "#F5707A"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="pie-chart-1 d-flex align-items-center justify-content-center">
      <Pie data={data} options={options} />
    </div>
  );
};

const BarChart2 = () => {
  const data = {
    labels: [
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
    ],
    datasets: [
      {
        label: "number of print page",
        data: [40, 95, 10, 5, 4, 15, 100, 65, 25, 36, 12, 40],
        backgroundColor: "#4BD396",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bar-chart-2">
      <Bar data={data} options={options} />
    </div>
  );
};

const PieChart2 = () => {
  const data = {
    labels: ["A4", "A3"],
    datasets: [
      {
        data: [80, 20],
        backgroundColor: ["#CA498C", "#FDE3DF"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  return (
    <div className="pie-chart-2 d-flex align-items-center justify-content-center">
      <Pie data={data} options={options} />
    </div>
  );
};

function ReportBody() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [dataReport, setDataReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenCalendar = () => {
    setIsOpen(!isOpen);
  };

  const handleMonthChange = async (date) => {
    setSelectedMonth(date);
    const start = startOfMonth(date);
    const end = startOfMonth(addMonths(date, 1));
    const startDate = new Date(start);

    setDateRange({ start, end });
    setIsOpen(false);
    const month = startDate.getMonth() + 1; // Months are 0-indexed, so add 1
    const year = startDate.getFullYear();
    const reqbody = {
      month,
      year
    }
    console.log(reqbody)
    const respose = await getReport(reqbody)
    const counPrinter = await getCountPrinters()
    const metaDataResponse = respose[0]
    const result = counPrinter.metaData
    const report = { ...metaDataResponse, countPrinter: result }
    if (report) {
      setDataReport(report); // Lưu thông tin user
    }
    console.log("report", report)
    return report

  };

  const [isToggled, setIsToggled] = useState(false);

  const handleButtonClick = () => {
    setIsToggled(!isToggled);
  };
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const result = await handleMonthChange((new Date()).toString()); // Chờ hàm getUser() trả về kết quả
        // const result = await logoutUser()
        console.log("result", result); // In kết quả
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

  if (loading || (!dataReport)) {
    return <div>Loading...</div>; // Hiển thị màn hình loading trong khi chờ
  }
  return (
    <div className="report-body">
      <h3 className="title">Báo cáo</h3>
      <div className="information d-flex justify-content-end align-items-center">
        <div className="time-option d-flex justify-content-between align-items-center">
          <p className="monthly">Hàng tháng</p>
          <div
            className={isToggled ? "toggle-button toggled" : "toggle-button"}
            onClick={handleButtonClick}
          >
            <i className="indicator"></i>
          </div>
          <p className="yearly">Hàng năm</p>
        </div>
        <div className="calendar d-flex justify-content-between align-items-center">
          <button onClick={handleOpenCalendar} className="calendar-btn">
            {isOpen ? (
              <i className="bx bx-calendar"></i>
            ) : (
              <i className="bx bx-calendar"></i>
            )}
          </button>{" "}
          {isOpen && (
            <DatePicker
              selected={selectedMonth}
              onChange={handleMonthChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              inline
            />
          )}
          {dateRange && (
            <div>
              <p className="dateOfPrinting">
                {format(dateRange.start, "dd/MM/yyyy")} -{" "}
                {format(dateRange.end, "dd/MM/yyyy")}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="line-one row d-flex justify-content-center align-items-center">
        <div className="number-of-printing-paper col-7 d-flex justify-content-around align-items-center">
          <div className="d-flex flex-column col-7">
            <label>Tổng số trang in</label>
            {/* biểu đồ cột */}
            <BarChart1 />
          </div>
          <div className="col-3">
            <div className="number-of-printer">
              <p>Số máy in</p>
              <p className="number">
                {(dataReport?.countPrinter?.[0]?.count || 0) +
                  (dataReport?.countPrinter?.[1]?.count || 0)}
              </p>
            </div>
            <div className="sum-of-printing-page">
              <p>Tổng số trang in</p>
              <p className="number">{dataReport?.pageEachType["A1"] + dataReport?.pageEachType["A2"] + dataReport?.pageEachType["A3"] + dataReport?.pageEachType["A4"]}</p>
            </div>
          </div>
        </div>
        <div className="printer-state col-4 d-flex justify-content-between">
          <div className="col-6 printer-state-infor ">
            <label>Trạng thái máy in</label>
            <div className="state d-flex justify-content-between align-items-center">
              <div className="color d-flex flex-column align-items-center justify-content-between">
                {/* <div className="blue" style={{ background: "#4B9CFC" }}></div> */}
                <div className="green" style={{ background: "#4BD396" }}></div>
                <div className="pink" style={{ background: "#F5707A" }}></div>
              </div>
              <div className="percent d-flex flex-column align-items-start justify-content-start">
                {/* <p>Đang hoạt động</p> */}
                <p>Sẵn sàng</p>
                <p>Lỗi</p>
              </div>
              <div className="percent d-flex flex-column align-items-start justify-content-start">
                {/* <p>11%</p> */}
                <p>{dataReport?.countPrinter[0]._id === "ACTIVE"
                  ? dataReport?.countPrinter[0]?.count ?? 0
                  : dataReport?.countPrinter[1]?.count ?? 0}
                </p>
                <p>{dataReport?.countPrinter[0]._id !== "ACTIVE"
                  ? dataReport?.countPrinter[0]?.count ?? 0
                  : dataReport?.countPrinter[1]?.count ?? 0}
                </p>
              </div>
            </div>
          </div>
          <div className="col-6 d-flex flex-column align-items-center justify-content-center">
            <PieChart1 />
          </div>
        </div>
      </div>
      <div className="row line-two">
        <div className="average-frequency-print col-7 d-flex flex-column align-items-left">
          <label>Trung bình tần suất in trong ngày</label>
          <BarChart2 />
        </div>

        <div className="paper-size row col-4">
          <div className="col-6 ">
            <label>Khổ trang in</label>
            <div className="size d-flex justify-content-between align-items-center">
              <div className="color d-flex flex-column justify-content-between align-items-center">
                <div className="pink" style={{ background: "#CA498C" }}></div>
                <div
                  className="white-pink"
                  style={{ background: "#FDE3DF" }}
                ></div>
              </div>
              <div className="percent d-flex flex-column justify-content-between align-items-center">
                <p>A4</p>
                <p>A3</p>
              </div>
              <div className="percent d-flex flex-column justify-content-between align-items-center">
                <p>{dataReport?.pageEachType["A4"]}</p>
                <p>{dataReport?.pageEachType["A3"]}</p>
              </div>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-center align-items-center">
            <PieChart2 />
          </div>
        </div>
      </div>
    </div>

  );
}

function Report() {
  return (
    <div className="report">
      <div className="body">
        <ReportBody />
      </div>
    </div>
  );
}
export default Report;
