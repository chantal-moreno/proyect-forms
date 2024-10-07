import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Logo from '../assets/logo.svg';

function NavbarForms() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Templates</Nav.Link>
              <Nav.Link href="#link">Forms</Nav.Link>
            </Nav>
            <Nav className="me-auto">
              <InputGroup xs="auto">
                <Form.Control
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <Button
                  variant="outline-secondary"
                  type="submit"
                  id="button-addon2"
                >
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Nav>
            <NavDropdown
              title={<i className="bi bi-gear"></i>}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Language</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Dark Mode</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">
                Users Managment
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.5">Log out</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarForms;
