import { useState } from 'react';
import { Button, ListGroup, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from 'react-router-dom';
import LibraryContent from './libraryContent.json';

function Library() {
    const [openItems, setOpenItems] = useState({});
    const subjects = LibraryContent;

    const toggleOpen = (id) => {
        setOpenItems((prevState) => ({ ...prevState, [id]: !prevState[id] }));
    };

    return (
        <div className="container p-3" style={{height: "70vh", fontSize: '1.2rem', marginTop:'2vh'}}>
            <h4>Danh sách môn học</h4>
            <div className="row">
                {subjects.map((subject) => (
                    <div key={subject.id} className="col-md-6 mb-3">
                        <ListGroup variant="flush">
                            <ListGroup.Item
                                style={{ background: 'rgb(199, 206, 199'}}
                                action
                                onClick={() => toggleOpen(subject.id)}
                                aria-controls={`collapse-subtopics-${subject.id}`}
                                aria-expanded={openItems[subject.id] || false}
                            >
                                {subject.title}
                            </ListGroup.Item>
                            <Collapse in={openItems[subject.id]}>
                                <div id={`collapse-subtopics-${subject.id}`}>
                                    <ListGroup variant="flush" className="ml-3">
                                        {subject.subTopics.map((subTopic, index) => (
                                            <div key={index}>
                                                <ListGroup.Item
                                                 style={{ background: 'rgba(164, 217, 255, 1)', marginLeft:'3vh', width:'90%', marginTop: '0'}}
                                                    action
                                                    onClick={() => toggleOpen(`${subject.id}-${index}`)}
                                                    aria-controls={`collapse-files-${subject.id}-${index}`}
                                                    aria-expanded={openItems[`${subject.id}-${index}`] || false}
                                                >
                                                    {subTopic.name} - {subTopic.courseCode} ({subTopic.semester})
                                                </ListGroup.Item>
                                                <Collapse in={openItems[`${subject.id}-${index}`]}>
                                                    <div id={`collapse-files-${subject.id}-${index}`}>
                                                        <p className="m-0">{subTopic.description}</p>
                                                        <ListGroup variant="flush" className="ml-3">
                                                            {subTopic.subFiles.map((file, fileIndex) => (
                                                                <ListGroup.Item
                                                                style={{ background: 'rgb(160, 250, 160)', marginLeft:'8vh', width:'80%', marginTop: '0'}}
                                                                    key={fileIndex}
                                                                    className="d-flex justify-content-between align-items-center"
                                                                >
                                                                        {/* <Link to={`/watch_document`} className="text-decoration-none"> */}
                                                                         {file.name}: {file.description}
                                                                         {/* </Link> */}
                                                                    {file.pdfUrl && (
                                                                        <Button
                                                                            variant="link"
                                                                            href={file.pdfUrl}
                                                                            target="_blank"
                                                                            className="text-decoration-none"
                                                                        >
                                                                            Xem PDF
                                                                        </Button>
                                                                    )}
                                                                </ListGroup.Item>
                                                            ))}
                                                        </ListGroup>
                                                    </div>
                                                </Collapse>
                                            </div>
                                        ))}
                                    </ListGroup>
                                </div>
                            </Collapse>
                        </ListGroup>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Library;
