import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './studentAccount.css';
import Avatar from '../../../../assets/user.png';
import InforTransition from './inforTransition';


// api 
import { getInFoStudent, getAllOrderOfUser } from '../../../../api';
const studentAccount = () => {
    const [infoStudent, setinfoStudent] = useState({});
    const [infoOrder, setinfoOrder] = useState([])
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const fetchUser = async () => {
            try {
                // taoj cart tuwj nhieen truocs khi render toi trả về kết quả
                const response = await getInFoStudent()
                const responseOrder = await getAllOrderOfUser()
                const result = response.metaData
                const resultOrder = responseOrder.metaData
                setinfoStudent(result)
                setinfoOrder(resultOrder)
            } catch (error) {
                // ở đây nên làm cái allert error message
                console.error('Error fetching user:', error.message);
            } finally {
                setLoading(false); // Kết thúc loading
            }
        };
        fetchUser();
    }, []);
    if (loading) {
        return <div>Loading...</div>; // Hiển thị màn hình loading trong khi chờ
    }
    return (
        <div>
            <div className='main-page-detail'>
                <img src={Avatar} className="avatar" alt="User Avatar" />
                <div className='info-block2'>
                    <span className='info2'>
                        {/* <div className='avatar' >/user.name/</div> */}
                        <h1 className='m-2'>  Thông tin sinh viên</h1>
                        <div>
                            <Container className='container_student_info'>
                                <div className='disp-info'>
                                    <Row  >
                                        <Col className='student-info student-label'>
                                            <span>MSSV</span>
                                            {/* <span>{infoStudent.studentCode}</span> */}
                                        </Col>
                                        <Col className='student-info student-value' xs={7}>
                                            {/* <span >{user.role}</span> */}
                                            {/* <span>2212432</span> */}
                                            <span>{infoStudent.studentCode}</span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='student-info student-label'>
                                            <span>Họ và tên </span>

                                        </Col>
                                        <Col className='student-info student-value' xs={7}>
                                            {/* <span >{user.name}</span> */}
                                            {/* <span>Le Nguyen Yen Nhi</span> */}
                                            <span>{infoStudent.firstName + " " + infoStudent.givenName}</span>
                                        </Col>
                                    </Row>
                                    <Row  >
                                        <Col className='student-info student-label'>
                                            <span>Email </span>
                                        </Col>
                                        <Col className='student-info student-value' xs={7}>
                                            <span >{infoStudent.email}</span>
                                            {/* <span>nhi.lenguyenyen@hcmut.edu.vn</span> */}
                                        </Col>
                                    </Row>
                                    <Row  >
                                        <Col className='student-info student-label'>
                                            <span>Số điện thoại</span>
                                        </Col>
                                        <Col className='student-info student-value' xs={7}>
                                            <span >{infoStudent.phoneNumber}</span>
                                            {/* <span>123x233x33</span> */}

                                        </Col>
                                    </Row>

                                </div>
                            </Container>
                        </div>
                        <h1 className='m-2'>  Thông tin giao dịch</h1>
                    </span>
                </div>
            </div>
            <InforTransition infoOrder={infoOrder} />
        </div>
    )
}

export default studentAccount
