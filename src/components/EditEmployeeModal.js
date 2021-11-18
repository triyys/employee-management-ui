import { useEffect, useState } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";

function EditEmployeeModal({ show, onHide, id, name, department }) {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API + 'department')
            .then(res => res.json())
            .then(data => setDepartments(data))
            .catch(err => console.log('ERROR'));
    }, [])

    const handleSubmit = e => {
        e.preventDefault();
        fetch(process.env.REACT_APP_API + 'employee', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: e.target.Id.value,
                Name: e.target.Name.value,
            })
        })
        .then(res => res.json())
        .then(result => {
            alert(result);
            onHide();
        })
        .catch(error => alert(error));
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
                        Sửa tên phòng ban
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="Id" className="mb-3">
                                    <Form.Label>Mã số:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Id"
                                        required
                                        disabled
                                        defaultValue={id}
                                    />
                                </Form.Group>
                                <Form.Group controlId="Name" className="mb-3">
                                    <Form.Label>Họ và tên:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Name"
                                        required
                                        defaultValue={name}
                                        placeholder="Nguyễn Văn A"
                                    />
                                </Form.Group>
                                <Form.Group controlId="Department" className="mb-3">
                                    <Form.Label>Phòng ban:</Form.Label>
                                    <Form.Select
                                        name="Department"
                                        aria-label="Default select example"
                                        required
                                        defaultValue={department}
                                    >
                                        {departments.map(department => (
                                            <option value={department.Id}>{department.Name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Đồng ý
                                    </Button>
                                </Form.Group>
                            </Form>
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

export default EditEmployeeModal;