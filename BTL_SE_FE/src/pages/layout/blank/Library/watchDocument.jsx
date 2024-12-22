// import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
// import LibraryContent from './libraryContent.json';
// import { useHistory } from 'react-router-dom';

function watchDocument() {
    // const { fileId } = useParams();
    // const history = useHistory();

    // const handleBack = () => {
    //     history.push('/library');
    // };
    return (
        <Container fluid className="p-4" style={{ fontSize: '1.2rem', height:'70vh' }}>
            

            {/* Content */}
            <Row>
                {/* Document Preview */}
                <Col md={6}>
                    <Card>
                        <Card.Body className="text-center">
                            <img
                                src="https://drive.google.com/file/d/1mSB4AeaRjbjdhPG2dhf4FzcMiqcHKP5a/view?usp=sharing"
                                alt="Document Preview"
                                style={{ width: '100%', maxHeight: '600px', objectFit: 'contain' }}
                            />
                        </Card.Body>
                    </Card>
                </Col>

                {/* Document Details */}
                <Col md={6} style={{padding:'6vh'}}>
                    <h3>Đề thi giữa kỳ 241</h3>
                    <p><strong>Mã môn học:</strong> MT1003</p>
                    <p><strong>Môn học:</strong> Giải tích 1</p>
                    <p><strong>Mô tả:</strong> Đề siêu khó</p>

                    {/* Action Buttons */}
                    <div className="mt-4" style={{padding:"4vh"}}>
                        <Button variant="primary" className="me-2 p-2 " >Quay lại</Button>
                        <Button variant="success" className="me-2 p-2 ">Tải về</Button>
                        <Button variant="danger" className='p-2'>In</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default watchDocument;
