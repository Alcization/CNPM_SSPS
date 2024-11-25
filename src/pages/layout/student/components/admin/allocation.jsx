import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";



import "../css/admin/allocation.css";
import "../css/admin/paginate.css";


const PaginatedTable = () => {
  const infor = [
    ["HK242", "2024-2025", "1/4/2025", "20", "Chưa cấp phát"],
    ["HK242", "2024-2025", "1/2/2025", "20", "Chưa cấp phát"],
    ["HK241", "2024-2025", "1/12/2024", "20", "Chưa cấp phát"],
    ["HK241", "2024-2025", "1/10/2024", "20", "Đã cấp phát"],
    ["HK233", "2023-2024", "1/8/2024", "20", "Đã cấp phát"],
    ["HK233", "2023-2024", "1/6/2024", "20", "Đã cấp phát"],
    ["HK242", "2024-2025", "1/4/2025", "20", "Chưa cấp phát"],
    ["HK242", "2024-2025", "1/2/2025", "20", "Chưa cấp phát"],
    ["HK241", "2024-2025", "1/12/2024", "20", "Chưa cấp phát"],
    ["HK241", "2024-2025", "1/10/2024", "20", "Chưa cấp phát"],
    ["HK242", "2024-2025", "1/4/2025", "20", "Chưa cấp phát"],
    ["HK242", "2024-2025", "1/2/2025", "20", "Chưa cấp phát"],
    ["HK241", "2024-2025", "1/12/2024", "20", "Chưa cấp phát"],
    ["HK241", "2024-2025", "1/10/2024", "20", "Đã cấp phát"],
    ["HK233", "2023-2024", "1/8/2024", "20", "Đã cấp phát"],
    ["HK233", "2023-2024", "1/8/2024", "20", "Đã cấp phát"],
    ["HK233", "2023-2024", "1/6/2024", "20", "Đã cấp phát"],
    ["HK233", "2023-2024", "1/6/2024", "20", "Đã cấp phát"]
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Tính toán dữ liệu cho trang hiện tại
  const offset = currentPage * itemsPerPage;
  const currentPageData = infor.slice(offset, offset + itemsPerPage);

  // Xử lý khi người dùng thay đổi trang
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div className="table-info">
        <table className="table text-center align-middle table-responsive">
          <thead>
            <tr>
              <th>Học kì</th>
              <th>Năm học</th>
              <th>Ngày cấp phát</th>
              <th>Số trang A4 cấp phát</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          {currentPageData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </table>
      </div>
      <div className="chooseTable d-flex align-items-center justify-content-end">
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(infor.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakLinkClassName={"page-link"}
          />
        </div>
        <div className="btn btn-outline-dark btn-square"></div>
        <div className="numOfTable">
          của {Math.ceil(infor.length / itemsPerPage)}
        </div>
      </div>
    </div>
  );
};

function FilterResults() {
  const [isToggled, setIsToggled] = useState(false);

  const handleButtonClick = () => {
    setIsToggled(!isToggled);
  };
  return (
    <form class="filterResults-form">
      <div class="form-group">
        <label for="semester">Học kỳ</label>
        <input
          type="text"
          class="form-control"
          id="semester"
          name="semester"
          required
        />
      </div>
      <div class="form-group">
        <label for="status">Trạng thái</label>
        <select class="form-control" id="status" name="status" required>
          <option value="allocated">Đã cấp phát</option>
          <option value="not-allocated-yet">Chưa cấp phát</option>
        </select>
      </div>
      <div class="form-group">
        <label for="date">Thời gian</label>
        <input
          type="date"
          class="form-control"
          id="date"
          name="date"
          required
        />
      </div>
      <div class="chooseState">
        <div className="chooseState-new">Mới nhất</div>
        <div
          className={isToggled ? "toggle-button toggled" : "toggle-button"}
          onClick={handleButtonClick}
        >
          <i className="indicator"></i>
        </div>
        <div className="chooseState-old">Cũ nhất</div>
      </div>
      <button type="submit" class="btn btn-primary btn-submit">
        Lọc
      </button>
    </form>
  );
}

function AllocationBody() {
  const [filter, setFilter] = useState(false);

  const handleClick = () => {
    setFilter(!filter);
  };

  return (
    <div className="allocationBody">
      <div className="trigger flex-row justify-content-between align-items-center">
        <div className="trigger-filterResults">
          <button
            type="button"
            className="trigger-link"
            onClick={handleClick}
            style={{ background: "none", border: "none" }}
          >
            <i class="bx bx-filter-alt"></i>
            <p>Lọc kết quả</p>
          </button>
          {filter && (
            <div className="overlay">
              <FilterResults />
            </div>
          )}
        </div>
        <div className="trigger-addCalendar">
          <NavLink to="/admin/add_calendar" className="trigger-link">
            <i class="bx bx-plus-circle"></i>
            <p>Thêm lịch</p>
          </NavLink>
        </div>
      </div>
      <PaginatedTable />
    </div>
  );
}

function Allocation() {
  return (
    <div className="allocation" style={{width: '179vh', height: '80vh'}}>
      <AllocationBody />
    </div>
  );
}

export default Allocation;
