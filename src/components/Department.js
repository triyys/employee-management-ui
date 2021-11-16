import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";

function Department() {
    const [departments, setDepartment] = useState([]);

    useEffect(() => {
        refreshList();
    }, [])

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
        </div>
    );
}

export default Department;