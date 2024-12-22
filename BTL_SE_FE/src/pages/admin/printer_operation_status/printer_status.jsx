import { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from "@ramonak/react-progress-bar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './printer_status.css';
import './color.js';
// api 
import { getAllPrinters, updatePrinter } from '../../../api/index.js';
function MyTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    // Calculate the indices of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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
    const fetchUser = async () => {
        setLoading(true); // Bắt đầu loading
        try {
            const result = await getAllPrinters(); // Chờ hàm getUser() trả về kết quả
            // const result = await logoutUser()
            console.log(result); // In kết quả
            if (result) {
                setData(result.metaData); // Lưu thông tin user
            }
        } catch (error) {
            // ở đây nên làm cái allert error message
            // alert(error.message);
            console.error('Error fetching user:', error.message);
        } finally {
            setLoading(false); // Kết thúc loading
        }
    };
    const colorMatch = (condition) => {
        if (condition === '0' || condition === 'Ngoại tuyến') {
            return '#D9D9D9';
        } else if (condition < 20 || condition === 'DISABLED') {
            return '#F5707A';
        } else if (condition < 60) {
            return '#FFD966';
        } else {
            return '#4BD396';
        }
    }
    const handleUpdatePrinter = async (ptinter_id, infoStatus) => {
        try {
            const response = await updatePrinter(ptinter_id, infoStatus); // Cập nhật trạng thái
            if (response.metaData) {
                await fetchUser(); // Gọi lại hàm fetch dữ liệu
            }
        } catch (error) {
            console.error('Error updating printer:', error.message);
            alert('Không thể cập nhật trạng thái máy in!');
        }
    }
    useEffect(() => {
        fetchUser();
        // setLoading(false);
    }, []);
    if (loading) {
        return <div>Loading...</div>; // Hiển thị màn hình loading trong khi chờ
    }
    return (
        <div>
            <div className='d-flex justify-content-start align-items-center p-3 border border-start-0  border-dark rounded-end-3' style={{ width: '36vh' }}>
                <h1>Trạng thái máy in</h1>
            </div>
            <div className='d-flex flex-column align-items-center m-2 p-2'
                style={{ height: '64vh', width: '175vh' }}>
                <Row>
                    {currentItems.map((info) => {
                        return (
                            <Col key={info.id}>
                                <Card border="dark" style={{ width: '22rem', height: '16rem', margin: '15px' }}>
                                    <Card.Header as="h5" style={{
                                        textAlign: 'center',
                                        backgroundColor: colorMatch(info.status),
                                        color: "white"
                                    }}>
                                        {info.printerName}</Card.Header>
                                    <Card.Body style={{ textAlign: 'center' }}>
                                        <Card.Title>Trạng thái: <span style={{ color: colorMatch(info.status) }}>{info.status}</span></Card.Title>
                                        <Card.Text>
                                            <Row>
                                                <Col>
                                                    <div style={{ fontSize: '15px' }}>Số lượng giấy còn lại</div>
                                                    {/* <h3>{info.printerPage}</h3> */}
                                                    <h3>Vô hạn</h3>
                                                </Col>
                                                <Col>
                                                    <div style={{ fontSize: '15px' }}>Hiệu suất</div>
                                                    {/* <h3>{info.printerEffcient}%</h3> */}
                                                    <h3>100</h3>
                                                </Col>
                                            </Row>
                                            <div className='ink-progress'><ProgressBar completed={100}
                                                bgColor={colorMatch(info.status)} baseBgColor='#D9D9D9' labelColor='black' width='15rem' animateOnRender='true'></ProgressBar></div>
                                        </Card.Text>
                                        <Button variant="outline-light" style={{ backgroundColor: info.status === 'DISABLED' ? '#4BD396' : '#F5707A' }} onClick={() => { handleUpdatePrinter(info._id, info.status) }}>{info.status === 'DISABLED' ? 'Bật' : 'Tắt'}</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>



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
}

export default MyTable;