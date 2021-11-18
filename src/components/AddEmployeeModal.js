import { Modal, Row, Col, Form, Button } from "react-bootstrap";

function AddEmployeeModal({ show, onHide }) {
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
                DepartmentId: e.target.DepartmentId.value,
                DateOfJoining: e.target.DateOfJoining.value,
                PhotoFileName: e.target.PhotoFileName.value,
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
                        Thêm nhân viên
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="Name" className="mb-3">
                                    <Form.Label>Tên nhân viên:</Form.Label>
                                    <Form.Control type="text" name="Name" required placeholder="Nguyễn Văn A"/>
                                </Form.Group>
                                <Form.Group controlId="DepartmentId" className="mb-3">
                                    <Form.Label>Mã phòng ban:</Form.Label>
                                    <Form.Control type="text" name="DepartmentId" required placeholder="1, 2, 3,..."/>
                                </Form.Group>
                                <Form.Group controlId="DateOfJoining" className="mb-3">
                                    <Form.Label>Ngày gia nhập:</Form.Label>
                                    <Form.Control type="text" name="DateOfJoining" required placeholder="2021/11/11"/>
                                </Form.Group>
                                <Form.Group controlId="PhotoFileName" className="mb-3">
                                    <Form.Label>Ảnh:</Form.Label>
                                    <Form.Control type="text" name="PhotoFileName" required placeholder=".jpg .png"/>
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

export default AddEmployeeModal;