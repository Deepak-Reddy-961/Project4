import React from 'react';
import { Container } from 'react-bootstrap';
import AppNavbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <AppNavbar />
      <Container className="py-4">
        {children}
      </Container>
    </>
  );
};

export default Layout; 