import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Appointments from './Appointments';
import Doctors from './Doctors';
import Patients from './Patients';
import '../App.css';

const NavHeader = () => {
  return (
    <Router>
      <Navbar bg="secondary" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/appointments" className="text-dark fw-bold me-5" id="btn">Appointments</Nav.Link>
            <Nav.Link as={Link} to="/doctors" className='text-dark fw-bold me-5' id="btn">Doctors</Nav.Link>
            <Nav.Link as={Link} to="/patients" className='text-dark fw-bold' id="btn">Patients</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/patients" element={<Patients />} />
      </Routes>
    </Router>
  );
}

export default NavHeader;
