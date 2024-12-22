import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import { NavLink } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

import "../css/admin/allocation.css";
import "../css/admin/paginate.css";

// api 
import { getAllDefaultPage } from "../../../../../api";



function PaginatedTable() {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const result = await getAllDefaultPage(); // Chờ hàm getUser() trả về kết quả
      // const result = await logoutUser()
      console.log(result); // In kết quả
      if (result) {
        setData(result); // Lưu thông tin user
      }
    } catch (error) {
      // ở đây nên làm cái allert error message
      // alert(error.message);
      console.error('Error fetching user:', error.message);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };
  useEffect(() => {
    fetchUser();
    setLoading(false);
  }, []);
  if (loading) {
    return <div>Loading...</div>; // Hiển thị màn hình loading trong khi chờ
  }
  // Tính toán dữ liệu cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Get the items for the current page
  console.log("data---->", data)
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Create the pagination items
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>
    );
  }




  const DisplayData = currentItems.map((info) => {
    return (
      <tr key={info._id}>
        <td className="my-sm-5 text-center">{info.semester}</td>
        <td className="my-sm-3 text-center">{new Date(info.startDateHK1).getFullYear()}</td>
        <td className="my-sm-3 text-center">{info.startDateHK1}</td>
        <td className="my-sm-5 text-center">{info.defaultPage}</td>
        <td className="my-sm-5 text-center">Đã cấp phát</td>
      </tr>

    );
  });

  return (
    <div>
      <div className='w-100 bg-white p-4 rounded ' style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <Table bordered hover className='mb-0' style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem' }}>
          <thead>
            <tr>
              <th className="my-sm-5 text-center">Học kì</th>
              <th className="my-sm-5 text-center">Năm học</th>
              <th className="my-sm-5 text-center">Ngày cấp phát</th>
              <th className="my-sm-5 text-center">Số trang A4 cấp phát</th>
              <th className="my-sm-5 text-center">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {DisplayData}
          </tbody>
        </Table>
      </div>
      <Pagination className="justify-content-end mt-3" style={{ marginRight: '3rem' }}>
        <Pagination.Prev
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {paginationItems}
        <Pagination.Next
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>
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
    <div className="allocation" style={{ width: '179vh', height: '80vh' }}>
      <AllocationBody />
    </div>
  );
}

export default Allocation;