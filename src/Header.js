import Container from "react-bootstrap/Container";
import { Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <Image src="/logo/jusya-logo.png" style={{ width: "180px" }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <NavDropdown title="Electronics" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#mobiles" to="/mobiles">
                  Mobiles
                </NavDropdown.Item>
                <NavDropdown.Item href="#tvs" to="/tvs">
                  TV's
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/homeappliences">
                  Home Appliences
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/gadgets">
                Gadgets
              </Nav.Link>
              <Nav.Link eventKey={2} href="#cart">
                Cart
              </Nav.Link>
              <NavDropdown title="Admin" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Admin</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Login</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
