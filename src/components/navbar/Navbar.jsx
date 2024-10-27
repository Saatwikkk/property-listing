import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const CustomNavbar = ({ username }) => {
  return (
    <Navbar expand="lg" sticky="top" className="navbar-light-red" style={{ backgroundColor: '#ffcccc', marginBottom: 0 }}> 
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <b>Houzez</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="me-5">Home</Nav.Link>
            <Nav.Link as={Link} to="/properties" className="me-5">Properties</Nav.Link> 
            
            {username ? (
              <NavDropdown title={username} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link>
                <FaUserCircle size={24} /> Anonymous
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
