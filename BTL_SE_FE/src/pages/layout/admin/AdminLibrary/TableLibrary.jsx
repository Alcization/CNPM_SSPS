import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// import 'font-awesome/css/font-awesome.min.css';
import Search from '../../blank/PrintingLog/search';
import FilterForm from './FilterLibrary';

// Dữ liệu mẫu
const documents = [
  { id: "0356", courseCode: "MT1003", courseName: "Giải tích 1", semester: "241", docName: "Đề thi cuối kỳ" },
  { id: "0355", courseCode: "MT1003", courseName: "Giải tích 1", semester: "241", docName: "Đề thi giữa kỳ" },
  { id: "0354", courseCode: "PH1003", courseName: "Vật lý 1", semester: "241", docName: "Đề thi cuối kỳ" },
  { id: "0353", courseCode: "PH1003", courseName: "Vật lý 1", semester: "241", docName: "Đề thi giữa kỳ" },
  { id: "0352", courseCode: "CH1002", courseName: "Hóa học cơ bản", semester: "241", docName: "Bài tập thực hành" },
  { id: "0351", courseCode: "CH1002", courseName: "Hóa học cơ bản", semester: "241", docName: "Bài tập về nhà" },
  { id: "0", courseCode: "CH1002", courseName: "Hóa học cơ bản", semester: "241", docName: "Bài tập thực hành" },
  { id: "03156", courseCode: "MT1003", courseName: "Giải tích 1", semester: "241", docName: "Đề thi cuối kỳ" },
  { id: "03525", courseCode: "MT1003", courseName: "Giải tích 1", semester: "241", docName: "Đề thi giữa kỳ" },
  { id: "03542", courseCode: "PH1003", courseName: "Vật lý 1", semester: "241", docName: "Đề thi cuối kỳ" },
  { id: "03532", courseCode: "PH1003", courseName: "Vật lý 1", semester: "241", docName: "Đề thi giữa kỳ" },
  { id: "03522", courseCode: "CH1002", courseName: "Hóa học cơ bản", semester: "241", docName: "Bài tập thực hành" },
  { id: "03512", courseCode: "CH1002", courseName: "Hóa học cơ bản", semester: "241", docName: "Bài tập về nhà" },
  { id: "02", courseCode: "CH1002", courseName: "Hóa học cơ bản", semester: "241", docName: "Bài tập thực hành" },
];

// Hàm chính
function MyTable() {
  const navigate = useNavigate();
  const [documentsList, setDocumentsList] = useState(documents); // Manage the documents state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [showFilter, setShowFilter] = useState(false);

  const handleShowFilter = () => setShowFilter(true);
  const handleCloseFilter = () => setShowFilter(false);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = documentsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(documentsList.length / itemsPerPage);

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const handleAddClick = () => {
    navigate('add_document');
  };

  const handleUpdateClick = () => {
    navigate('update_document');
  };

  const handleRemoveClick = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa tài liệu này?')) {
      setDocumentsList((prevDocuments) => prevDocuments.filter((doc) => doc.id !== id));
      // Reset to the first page if the current page becomes empty after deletion
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  const DisplayData = currentItems.map((info) => (
    <tr key={info.id}>
      <td className="text-center">{info.id}</td>
      <td className="text-center">{info.courseCode}</td>
      <td className="text-center">{info.courseName}</td>
      <td className="text-center">{info.semester}</td>
      <td className="text-center">{info.docName}</td>
      <td className="text-center">
        <Button variant="primary" className="me-2" onClick={handleUpdateClick}>
          <i className="bi bi-pencil"></i>
        </Button>
        <Button variant="danger" className="me-2" onClick={() => handleRemoveClick(info.id)}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  ));

  return (
    <div>
      <div className='d-flex justify-content-start align-items-center p-3 border 
      border-start-0  border-dark rounded-end-3' style={{ width: '60vh'}}>
        <h1>Thông tin thư viện tài liệu</h1> 
      </div>
      <div className="d-flex align-items-center justify-content-end" style={{ width: '175vh'}}>
          <Button variant="info" onClick={handleShowFilter}>
            <i className="bi bi-funnel"></i> Lọc kết quả
          </Button>
          <Button variant="primary" style={{marginLeft:'1rem'}} onClick={handleAddClick}>
            <i class="bi bi-file-earmark-plus-fill"></i> Thêm tài liệu
          </Button>
      </div>
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center p-2" style={{ height: '50vh', width: '175vh' }}>
          <Table bordered hover className="mb-0" style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem' }}>
            <thead>
              <tr>
                <th className="my-sm-3 bg-info text-center">ID</th>
                <th className="my-sm-3 bg-info text-center">Mã môn học</th>
                <th className="my-sm-3 bg-info text-center">Tên môn học</th>
                <th className="my-sm-3 bg-info text-center">Học kỳ</th>
                <th className="my-sm-3 bg-info text-center">Tên tài liệu</th>
                <th className="my-sm-3 bg-info text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>{DisplayData}</tbody>
          </Table>

          <Pagination className="d-flex justify-content-end mt-3">
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {paginationItems}
            <Pagination.Next
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>

        <Modal show={showFilter} onHide={handleCloseFilter} centered>
          <Modal.Header closeButton>
            <Modal.Title>Lọc kết quả</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FilterForm />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default MyTable;