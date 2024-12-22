import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
// import Contentjson from './contentjson.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import Search from './search';
import { getDocumentOfUser } from '../../../../api';
function MyTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const [Contentjson, setContentjson] = useState([]);
    const fetchData = async () => {
        try {
            const response = await getDocumentOfUser(); // Gọi API
            console.log(response.metaData)
            setContentjson(response.metaData); // Lưu giá trị vào state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        // 2 times
        fetchData(); // Gọi hàm khi component mount
    }, []); // Chỉ chạy 1 lần khi component render

    const itemsPerPage = 10;

    // Calculate the indices of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Get the items for the current page
    const currentItems = Contentjson.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the total number of pages
    const totalPages = Math.ceil(Contentjson.length / itemsPerPage);

    // Create the pagination items
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    const DisplayData = currentItems.map((info, index) => {
        return (
            // <tr key={info.id}>
            //     <td className="my-sm-3 text-center">{info.id}</td>
            //     <td className="my-sm-5 text-center">{info.studentName}</td>
            //     <td className="my-sm-3 text-center">{info.printingID}</td>
            //     <td className="my-sm-5 text-center">{info.printingTime}</td>
            //     <td className="my-sm-5 text-center">{info.fileName}</td>
            //     <td className="my-sm-5 text-center">{info.numberPage}</td>
            //     <td className="my-sm-5 text-center">{info.paperSize}</td>
            // </tr>
            <tr key={info.id}>
                <td className="my-sm-3 text-center">{index + 1}</td>
                {/* <td className="my-sm-5 text-center">{info.name}</td> */}
                <td className="my-sm-3 text-center">{info.printerId}</td>
                <td className="my-sm-5 text-center">{info.printTime}</td>
                <td className="my-sm-5 text-center">{info.fileName}</td>
                <td className="my-sm-5 text-center">{info.pageBefore}</td>
                <td className="my-sm-5 text-center">{info.pageType}</td>
            </tr>
        );
    });

    return (
        <div className='d-flex flex-column justify-content-center align-items-center m-2 p-2' style={{ height: '84vh', width: '198vh' }}>
            <div> <h1 className='text-primary'>Printing Log</h1></div>
            <Search />
            <div className='w-100 bg-white p-4 rounded ' style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <Table bordered hover className='mb-0 ' style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem' }}>
                    <thead>
                        <tr>
                            <th className="my-sm-3 bg-info text-center">STT</th>
                            {/* <th className="my-sm-5 bg-info text-center">Tên sinh viên</th> */}
                            <th className="my-sm-3 bg-info text-center">Mã máy in</th>
                            <th className="my-sm-5 bg-info text-center">Thời gian in</th>
                            <th className="my-sm-5 bg-info text-center">Tên file</th>
                            <th className="my-sm-5 bg-info text-center">Số trang</th>
                            <th className="my-sm-5 bg-info text-center">Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DisplayData}
                    </tbody>
                </Table>
                <Pagination className="justify-content-end mt-3">
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
        </div>
    );
}

export default MyTable;