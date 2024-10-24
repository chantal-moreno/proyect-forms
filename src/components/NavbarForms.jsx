import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import InputGroup from 'react-bootstrap/InputGroup';
import Logo from '../assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

function NavbarForms() {
  const { isAuthenticated, signout } = useAuth();
  const navigate = useNavigate();
  const handleUsersManagement = () => {
    navigate('/users-management');
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home-page">
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
              <Nav.Link href="#home-page">Home</Nav.Link>
              <Nav.Link href="#all-templates">Templates</Nav.Link>
            </Nav>
            <NavDropdown
              title={<i className="bi bi-gear-fill"></i>}
              id="basic-nav-dropdown"
            >
              {isAuthenticated && (
                <NavDropdown.Item onClick={handleUsersManagement}>
                  Users Managment
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              {isAuthenticated ? (
                <NavDropdown.Item
                  href="#sign-in"
                  onClick={() => {
                    signout();
                  }}
                >
                  Sign Out
                </NavDropdown.Item>
              ) : (
                <>
                  <NavDropdown.Item href="#sign-up">Sign Up</NavDropdown.Item>
                  <NavDropdown.Item href="#sign-in">Sign In</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarForms;
