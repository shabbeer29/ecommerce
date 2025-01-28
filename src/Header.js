import Container from "react-bootstrap/Container";
import { Nav, Navbar, NavDropdown, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown title="Electronics" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#mobiles">Mobiles</NavDropdown.Item>
                <NavDropdown.Item href="#tvs">TV's</NavDropdown.Item>
                <NavDropdown.Item href="#appliences">
                  Home Appliences
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#fruits">Fruits</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
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
