import { useEffect, useState } from "react";
import { Modal, Row, Col, Form, Button, Image } from "react-bootstrap";

function AddEmployeeModal({ show, onHide }) {
    const [departments, setDepartments] = useState([]);
    const [photoFileName, setPhotoFileName] = useState('anonymous.png');

    useEffect(() => {
        fetch(process.env.REACT_APP_API + 'department')
            .then(res => res.json())
            .then(data => setDepartments(data))
            .catch(err => console.log('ERROR'));
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
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
                PhotoFileName: photoFileName,
            })
        })
        .then(res => res.json())
        .then(result => {
            alert(result);
            onHide();
        })
        .catch(error => alert(error));
    }
    
    const handleFileSelected = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            'myFile',
            e.target.files[0],
            e.target.files[0].name
        );

        fetch(process.env.REACT_APP_API + 'employee/savefile', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            setPhotoFileName(data);
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
                            <Image width="200px" height="200px" src={process.env.REACT_APP_PHOTOPATH + photoFileName}/>
                            <input className="mt-3" onChange={handleFileSelected} type="File"/>
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