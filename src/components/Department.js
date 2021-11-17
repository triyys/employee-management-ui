import { useEffect } from "react";
import { useState } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import AddDepartmentModal from "./AddDepartmentModal";

function Department() {
    const [departments, setDepartment] = useState([]);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        refreshList();
    }

    useEffect(() => {
        refreshList();
    }, []);

    const refreshList = () => {
        fetch(process.env.REACT_APP_API + 'department')
            .then(res => res.json())
            .then(data => setDepartment(data))
            .catch(err => {console.log("ERROR")});
    };

    return (
        <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <td>Mã số</td>
                        <td>Tên phòng ban</td>
                        <td>Lựa chọn</td>
                    </tr>
                </thead>

                <tbody>
                    {departments.map(department => (
                        <tr key={department.Id}>
                            <td>{department.Id}</td>
                            <td>{department.Name}</td>
                            <td>Sửa / Xóa</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button variant="primary" onClick={handleShow}>Thêm</Button>

                <AddDepartmentModal show={show} onHide={handleClose}/>
            </ButtonToolbar>
        </div>
    );
}

export default Department;