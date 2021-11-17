import { useEffect } from "react";
import { useState } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import AddDepartmentModal from "./AddDepartmentModal";
import EditDepartmentModal from "./EditDepartmentModal";

function Department() {
    const [departments, setDepartment] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState({show: false});

    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => {
        setShowAddModal(false);
        refreshList();
    }

    const handleCloseEditModal = () => {
        setShowEditModal({show: false});
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

    const deleteDepartment = id => {
        if (window.confirm(`Bạn có chắc muốn xóa phòng ban ${id}?`)) {
            fetch(`${process.env.REACT_APP_API}department/${id}`,{
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
                        <td>Tên phòng ban</td>
                        <td>Lựa chọn</td>
                    </tr>
                </thead>

                <tbody>
                    {departments.map(department => (
                        <tr key={department.Id}>
                            <td>{department.Id}</td>
                            <td>{department.Name}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                        className="mt-2"
                                        variant="info"
                                        onClick={() => setShowEditModal({
                                            show: true,
                                            id: department.Id,
                                            name: department.Name,
                                        })}
                                    >Sửa</Button>
                                    <Button
                                        className="mt-2"
                                        variant="danger"
                                        onClick={() => deleteDepartment(department.Id)}
                                    >Xóa</Button>
                                    <EditDepartmentModal
                                        show={showEditModal.show}
                                        onHide={handleCloseEditModal}
                                        departmentId={showEditModal.id}
                                        departmentName={showEditModal.name}
                                    />
                                </ButtonToolbar>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <ButtonToolbar>
                <Button variant="primary" onClick={handleShowAddModal}>Thêm</Button>
                <AddDepartmentModal show={showAddModal} onHide={handleCloseAddModal}/>
            </ButtonToolbar>
        </div>
    );
}

export default Department;