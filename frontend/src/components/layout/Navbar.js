import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AppNavbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderAuthLinks = () => {
    // Public links (not logged in)
    if (!isAuthenticated) {
      return (
        <>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Register</Nav.Link>
        </>
      );
    }

    // Patient links
    if (user.role === 'patient') {
      return (
        <>
          <Nav.Link as={Link} to="/patient/doctors">Find Doctors</Nav.Link>
          <Nav.Link as={Link} to="/patient/appointments">My Appointments</Nav.Link>
          <NavDropdown title={user.name} id="patient-dropdown">
            <NavDropdown.Item as={Link} to="/patient/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </>
      );
    }

    // Doctor links
    if (user.role === 'doctor') {
      return (
        <>
          <Nav.Link as={Link} to="/doctor/appointments">Appointments</Nav.Link>
          <Nav.Link as={Link} to="/doctor/schedule">My Schedule</Nav.Link>
          <NavDropdown title={user.name} id="doctor-dropdown">
            <NavDropdown.Item as={Link} to="/doctor/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </>
      );
    }

    // Admin links
    if (user.role === 'admin') {
      return (
        <>
          <NavDropdown title="Manage" id="admin-dropdown">
            <NavDropdown.Item as={Link} to="/admin/doctors">Doctors</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/patients">Patients</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/appointments">Appointments</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={user.name} id="admin-user-dropdown">
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </>
      );
    }

    return null;
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">HealthCare Booking</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {renderAuthLinks()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar; 