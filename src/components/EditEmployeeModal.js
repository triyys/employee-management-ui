import { useEffect, useState } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import PhotoPreview from "./PhotoPreview";

function EditEmployeeModal({ show, onHide, id, name, departmentId, dateOfJoining, photoFileName }) {
    const [departments, setDepartments] = useState([]);
    const [photoFile, setPhotoFile] = useState({});
    
    // anti-pattern can cause some problems:
    // https://vhudyma-blog.eu/react-antipatterns-props-in-initial-state/
    useEffect(() => {
        setPhotoFile({ preview: process.env.REACT_APP_PHOTOPATH + photoFileName });
    }, [photoFileName]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API + 'department')
            .then(res => res.json())
            .then(data => setDepartments(data))
            .catch(err => console.log(err));
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
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Id: e.target.Id.value,
                    Name: e.target.Name.value,
                    DepartmentId: e.target.Department.value,
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
                        Sửa thông tin nhân viên
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
                                        defaultValue={departmentId}
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
                                        defaultValue={dateOfJoining}
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
                            {photoFileName && <PhotoPreview photoFile={photoFile} setPhotoFile={setPhotoFile}/>}
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