import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Contentjson from './contentjson.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import printer_img from '../../../assets/big-printer.png';

function Details() {
    const location = useLocation();
    const navigate = useNavigate();
    const handleViewClick = () => {
        navigate('/admin/printer_info');
    }
    const DisplayData = Contentjson.map((info) => {
        if (info.id === location.state.id) {
            return (
                <div className='d-flex flex-column justify-content-center align-items-center m-2 p-2' style={{ height: '80vh', width: '175vh'}}>
                    <Row>
                        <Col>
                            <div style={{marginRight: '10rem'}}>
                                <img src={printer_img} alt=""/>
                            </div>
                        </Col>
                        <Col>
                            <div style={{width: '75vh'}}>
                                <h1 style={{marginBottom: '2rem'}}>Máy in {info.manufacturer} {info.room}{info.building}</h1>
                                <Row>
                                    <Col>
                                        <h4>ID</h4>
                                        <div style={{fontSize: '1.5rem'}}>{info.id}</div>
                                    </Col>
                                    <Col>
                                        <h4>Hãng</h4>
                                        <div style={{fontSize: '1.5rem'}}>{info.manufacturer}</div>
                                    </Col>
                                    <Col>
                                        <h4>Mẫu mã</h4>
                                        <div style={{fontSize: '1.5rem'}}>{info.model}</div>
                                    </Col>
                                </Row>
                                <h4 style={{marginTop: '2rem'}}>Vị trí</h4>
                                <div style={{fontSize: '1.5rem'}}>Phòng {info.room}, tòa {info.building}, cơ sở 2 thành phố Dĩ An, tỉnh Bình Dương.</div>
                                <h4 style={{marginTop: '2rem'}}>Mô tả</h4>
                                <div style={{fontSize: '1.5rem'}}>{info.description}</div>
                                <div className='d-flex justify-content-center' style={{marginTop: '7rem'}}>
                                    <Button onClick={() => handleViewClick()}>
                                        Quay lại
                                    </Button>
                                </div>
                            </div>

                        </Col>
                    </Row>
                </div>
            )
        } 
    });
    return (
        <div>
            {DisplayData}
        </div>
    );
}
export default Details;