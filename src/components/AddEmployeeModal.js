import { useEffect, useState } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import PhotoPreview from "./PhotoPreview";

function AddEmployeeModal({ show, onHide }) {
    const [departments, setDepartments] = useState([]);
    const [photoFile, setPhotoFile] = useState({ preview: process.env.REACT_APP_PHOTOPATH + 'anonymous.png'});

    useEffect(() => {
        fetch(process.env.REACT_APP_API + 'department')
            .then(res => res.json())
            .then(data => setDepartments(data))
            .catch(err => console.log('ERROR'));
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            'myFile',
            photoFile,
            photoFile.name
        );

        fetch(process.env.REACT_APP_API + 'employee/savefile', {
            method: 'POST',
            body: formData,
        })
        .then(res => {
            fetch(process.env.REACT_APP_API + 'employee', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Name: e.target.Name.value,
                    DepartmentId: e.target.DepartmentId.value,
                    DateOfJoining: e.target.DateOfJoining.value,
                    PhotoFileName: photoFile.name,
                })
            })
            .then(res => res.json())
            .then(result => {
                alert(result);
                onHide();
            })
            .catch(error => alert(error));
        })
        .catch(err => alert('Failed'));

    }

    return (
        <div className="container">
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Thêm nhân viên
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="Name" className="mb-3">
                                    <Form.Label>Họ và tên:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Name"
                                        required
                                        placeholder="Nguyễn Văn A"
                                    />
                                </Form.Group>
                                <Form.Group controlId="DepartmentId" className="mb-3">
                                    <Form.Label>Phòng ban:</Form.Label>
                                    <Form.Select
                                        name="DepartmentId"
                                        aria-label="Default select example"
                                        required
                                    >
                                        {departments.map(department => (
                                            <option
                                                key={department.Id}
                                                value={department.Id}
                                            >
                                                {department.Name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId="DateOfJoining" className="mb-3">
                                    <Form.Label>Ngày gia nhập:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="DateOfJoining"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Đồng ý
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>

                        <Col sm={6}>
                            <PhotoPreview photoFile={photoFile} setPhotoFile={setPhotoFile}/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={onHide}>Đóng</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddEmployeeModal;