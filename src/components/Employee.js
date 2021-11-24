import { useEffect, useState } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";

function Employee() {
    const [employees, setEmployees] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState({show: false});

    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => {
        setShowAddModal(false);
        refreshList();
    }

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        refreshList();
    }

    useEffect(() => {
        refreshList();
    }, []);

    const refreshList = () => {
        fetch(process.env.REACT_APP_API + 'employee')
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(err => {console.log('ERROR')});
    };

    const deleteEmployee = (id, name) => {
        if (window.confirm(`Bạn có chắc muốn xóa nhân viên ${name}?`)) {
            fetch(`${process.env.REACT_APP_API}employee/${id}`,{
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => refreshList());
        }
    }

    return (
        <div>
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <td>Mã số</td>
                        <td>Họ và tên</td>
                        <td>Phòng ban</td>
                        <td>Ngày gia nhập</td>
                    </tr>
                </thead>

                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.Id}>
                            <td>{employee.Id}</td>
                            <td>{employee.Name}</td>
                            <td>{employee.Department}</td>
                            <td>{employee.DateOfJoining}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                        className="mx-2"
                                        variant="info"
                                        size="sm"
                                        onClick={() => setShowEditModal({
                                            show: true,
                                            id: employee.Id,
                                            name: employee.Name,
                                            departmentId: employee.DepartmentId,
                                            dateOfJoining: employee.DateOfJoining,
                                            photoFileName: employee.PhotoFileName,
                                        })}
                                    >Sửa</Button>
                                    <Button
                                        className="mx-2"
                                        variant="danger"
                                        size="sm"
                                        onClick={() => deleteEmployee(employee.Id, employee.Name)}
                                    >Xóa</Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditEmployeeModal
                show={showEditModal.show}
                onHide={handleCloseEditModal}
                id={showEditModal.id}
                name={showEditModal.name}
                departmentId={showEditModal.departmentId}
                dateOfJoining={showEditModal.dateOfJoining}
                photoFileName={showEditModal.photoFileName}
            />

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