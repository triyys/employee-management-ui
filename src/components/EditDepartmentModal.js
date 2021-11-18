import { Modal, Row, Col, Form, Button } from "react-bootstrap";

function EditDepartmentModal({ show, onHide, departmentId, departmentName }) {
    const handleSubmit = e => {
        e.preventDefault();
        fetch(process.env.REACT_APP_API + 'department', {
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
                                    <Form.Label>Mã phòng ban:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Id"
                                        required
                                        disabled
                                        defaultValue={departmentId}
                                    />
                                </Form.Group>
                                <Form.Group controlId="Name" className="mb-3">
                                    <Form.Label>Tên phòng ban:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Name"
                                        required
                                        defaultValue={departmentName}
                                        placeholder="Tên phòng ban"
                                    />
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

export default EditDepartmentModal;