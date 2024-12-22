import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import PrintingContent from './printingContent.json';
import 'bootstrap/dist/css/bootstrap.min.css';

// eslint-disable-next-line react/prop-types
function InforTransition({ infoOrder }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Calculate the indices of the first and last items on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Get the items for the current page
    // const currentItems = PrintingContent.slice(indexOfFirstItem, indexOfLastItem);
    // eslint-disable-next-line react/prop-types
    const currentItems = infoOrder.slice(indexOfFirstItem, indexOfLastItem);
    // Calculate the total number of pages
    // eslint-disable-next-line react/prop-types
    const totalPages = Math.ceil(infoOrder.length / itemsPerPage);


    // Create the pagination items
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    // Map the currentItems to table rows
    const DisplayData = currentItems.map((info) => {
        return (
            <tr key={info.id}>
                <td className="my-sm-4 text-center">{info.order_payment.date_transcation}</td>
                <td className="my-sm-4 text-center">{info.quantity}</td>
                <td className="my-sm-4 text-center">{info.order_payment.order_checkout}</td>
            </tr>
        );
    });

    return (
        <div style={{ height: '30vh', width: '90vh', marginLeft: '700px' }}>
            <div className="w-100 m-2 bg-white rounded" style={{ overflow: 'hidden' }}>
                <Table bordered hover className="mb-0" style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem' }}>
                    <thead>
                        <tr>
                            <th className="my-sm-5 bg-info text-center">Thời gian giao dịch</th>
                            <th className="my-sm-5 bg-info text-center">Số trang</th>
                            <th className="my-sm-5 bg-info text-center">Tổng tiền</th>
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

export default InforTransition;
