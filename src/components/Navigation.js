import { NavLink, Navbar, Nav } from "react-bootstrap";

function Navigation() {
    return (
        <div>
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id ="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white" href="/">
                            Home
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" href="/department">
                            Department
                        </NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white" href="/employee">
                            Employee
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Navigation;