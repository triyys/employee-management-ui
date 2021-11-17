import { Modal, Row, Col, Form, Button } from "react-bootstrap";

function AddDepartmentModal({ show, onHide }) {
    const handleSubmit = e => {
        e.preventDefault();
        fetch(process.env.REACT_APP_API + 'department', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
                        Thêm phòng ban
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="Name" className="mb-3">
                                    <Form.Label>Hãy nhập tên phòng ban:</Form.Label>
                                    <Form.Control type="text" name="Name" required placeholder="Tên phòng ban"/>
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

export default AddDepartmentModal;