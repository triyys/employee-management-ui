import { useEffect, useState } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import AddEmployeeModal from "./AddEmployeeModal";

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);

    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => {
        setShowAddModal(false);
        refreshList();
    }

    useEffect(() => {
        refreshList();
    }, []);

    const refreshList = () => {
        fetch(process.env.REACT_APP_API + 'employee')
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(err => {console.log("ERROR")});
    };

    return (
        <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <td>Mã số</td>
                        <td>Tên nhân viên</td>
                        <td>Mã phòng ban</td>
                        <td>Ngày gia nhập</td>
                        <td>Ảnh</td>
                    </tr>
                </thead>

                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.Id}>
                            <td>{employee.Id}</td>
                            <td>{employee.Name}</td>
                            <td>{employee.DepartmentId}</td>
                            <td>{employee.DateOfJoining}</td>
                            <td>{employee.PhotoFileName}</td>
                            <td>Sửa / Xóa</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            <ButtonToolbar>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={handleShowAddModal}
                >Thêm nhân viên</Button>
                <AddEmployeeModal show={showAddModal} onHide={handleCloseAddModal}/>
            </ButtonToolbar>
        </div>
    );
}

export default Employee;