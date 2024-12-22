import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Contentjson from './contentjson.json';
import 'bootstrap/dist/css/bootstrap.min.css';
// api
import { getAllDocument } from '../../../../api';
function MyTable() {
    // const currentItems = Contentjson.slice(0, 8);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentItems = data.slice(0, 8);

    const DisplayData = currentItems.map((info, index) => {
        return (
            <tr key={index + 1}>
                <td className="my-sm-3 text-center">{index + 1}</td>
                <td className="my-sm-5 text-center">{info.studentId.givenName}</td>
                <td className="my-sm-3 text-center">{info.printerId}</td>
                <td className="my-sm-5 text-center">{info.printTime}</td>
                <td className="my-sm-5 text-center">{info.fileName}</td>
                {/* <td className="my-sm-5 text-center">{info.studentName}</td>
                <td className="my-sm-3 text-center">{info.printingID}</td>
                <td className="my-sm-5 text-center">{info.printingTime}</td>
                <td className="my-sm-5 text-center">{info.fileName}</td> */}
            </tr>
        );
    });
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true); // Bắt đầu loading
            try {
                const result = await getAllDocument(); // Chờ hàm getUser() trả về kết quả
                // const result = await logoutUser()
                console.log(result.metaData); // In kết quả
                if (result) {
                    setData(result.metaData)// Lưu thông tin user
                }
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
    if (loading) {
        return <div>Loading...</div>; // Hiển thị màn hình loading trong khi chờ
    }
    return (
        <div className='d-flex flex-column justify-content-center m-2 pl-2'>
            <div><h1 className='text-primary p-4'>Gần đây</h1></div>
            <div className='w-100 bg-white p-4 rounded' style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <Table bordered hover className='mb-0' style={{ borderRadius: '20px', overflow: 'hidden', fontSize: '1.3rem' }}>
                    <thead>
                        <tr>
                            <th className="my-sm-3 bg-info text-center">STT</th>
                            <th className="my-sm-3 bg-info text-center">Tên sinh viên</th>
                            <th className="my-sm-3 bg-info text-center">Mã máy in</th>
                            <th className="my-sm-5 bg-info text-center">Thời gian in</th>
                            <th className="my-sm-5 bg-info text-center">Tên file</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DisplayData}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default MyTable;