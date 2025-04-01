import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';

const ManagePatients = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Placeholder data - in a real implementation, this would be fetched from the API
  const patients = [
    {
      id: 1,
      name: 'Alice Williams',
      email: 'alice.williams@example.com',
      phone: '555-123-4567',
      age: 35,
      gender: 'Female',
      totalAppointments: 8,
      lastVisit: '2023-05-10'
    },
    {
      id: 2,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '555-234-5678',
      age: 42,
      gender: 'Male',
      totalAppointments: 5,
      lastVisit: '2023-06-15'
    },
    {
      id: 3,
      name: 'Carol Martinez',
      email: 'carol.martinez@example.com',
      phone: '555-345-6789',
      age: 28,
      gender: 'Female',
      totalAppointments: 3,
      lastVisit: '2023-07-22'
    },
    {
      id: 4,
      name: 'David Thompson',
      email: 'david.thompson@example.com',
      phone: '555-456-7890',
      age: 65,
      gender: 'Male',
      totalAppointments: 12,
      lastVisit: '2023-05-30'
    }
  ];
  
  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    setShowDetailsModal(true);
  };
  
  const handleDeletePatient = (patientId) => {
    // In a real implementation, this would call the API to delete the patient
    console.log(`Deleting patient with ID: ${patientId}`);
    // Update local state to reflect the change
  };
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm)
  );
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
      <h2 className="mb-4">Manage Patients</h2>
      
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="bg-white">
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Search by name, email, or phone"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Last Visit</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map(patient => (
                    <tr key={patient.id}>
                      <td>{patient.name}</td>
                      <td>{patient.email}</td>
                      <td>{patient.phone}</td>
                      <td>{patient.gender}</td>
                      <td>{patient.age}</td>
                      <td>{formatDate(patient.lastVisit)}</td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          className="me-2"
                          onClick={() => handleViewDetails(patient)}
                        >
                          Details
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDeletePatient(patient.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredPatients.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center">No patients found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Patient Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Patient Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPatient && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedPatient.name} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      value={selectedPatient.email} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedPatient.phone} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedPatient.age} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedPatient.gender} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Total Appointments</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedPatient.totalAppointments} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Visit</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={formatDate(selectedPatient.lastVisit)} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Card className="mt-3">
                <Card.Header>Patient History</Card.Header>
                <Card.Body>
                  <p className="text-muted">In a real implementation, this section would show the patient's medical history and appointment history.</p>
                </Card.Body>
              </Card>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          <Button 
            variant="primary"
            onClick={() => setShowDetailsModal(false)}
          >
            View Appointments
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManagePatients; 