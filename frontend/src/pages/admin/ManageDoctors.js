import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form } from 'react-bootstrap';

const ManageDoctors = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  // Placeholder data - in a real implementation, this would be fetched from the API
  const doctors = {
    all: [
      {
        id: 1,
        name: 'Dr. John Smith',
        email: 'john.smith@example.com',
        specialization: 'Cardiology',
        experience: 15,
        isApproved: true
      },
      {
        id: 2,
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@example.com',
        specialization: 'Dermatology',
        experience: 10,
        isApproved: true
      },
      {
        id: 3,
        name: 'Dr. Michael Brown',
        email: 'michael.brown@example.com',
        specialization: 'Neurology',
        experience: 20,
        isApproved: true
      }
    ],
    pending: [
      {
        id: 4,
        name: 'Dr. Emily Davis',
        email: 'emily.davis@example.com',
        specialization: 'Pediatrics',
        experience: 8,
        isApproved: false
      },
      {
        id: 5,
        name: 'Dr. Robert Wilson',
        email: 'robert.wilson@example.com',
        specialization: 'Orthopedics',
        experience: 12,
        isApproved: false
      }
    ]
  };
  
  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetailsModal(true);
  };
  
  const handleApprove = (doctorId) => {
    // In a real implementation, this would call the API to approve the doctor
    console.log(`Approving doctor with ID: ${doctorId}`);
    // Update local state to reflect the change
  };
  
  const handleReject = (doctorId) => {
    // In a real implementation, this would call the API to reject the doctor
    console.log(`Rejecting doctor with ID: ${doctorId}`);
    // Update local state to reflect the change
  };
  
  const handleDelete = (doctorId) => {
    // In a real implementation, this would call the API to delete the doctor
    console.log(`Deleting doctor with ID: ${doctorId}`);
    // Update local state to reflect the change
  };
  
  const getApprovalBadge = (isApproved) => {
    return isApproved ? 
      <Badge bg="success">Approved</Badge> : 
      <Badge bg="warning">Pending</Badge>;
  };
  
  const displayDoctors = (doctorsList) => {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctorsList.map(doctor => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.email}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.experience} years</td>
              <td>{getApprovalBadge(doctor.isApproved)}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  className="me-2"
                  onClick={() => handleViewDetails(doctor)}
                >
                  Details
                </Button>
                {!doctor.isApproved && (
                  <>
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      className="me-2"
                      onClick={() => handleApprove(doctor.id)}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleReject(doctor.id)}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {doctor.isApproved && (
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleDelete(doctor.id)}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
          {doctorsList.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">No doctors found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  };

  return (
    <Container>
      <h2 className="mb-4">Manage Doctors</h2>
      
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                  >
                    All Doctors
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pending')}
                  >
                    Pending Approvals
                  </button>
                </li>
              </ul>
            </Card.Header>
            <Card.Body>
              {activeTab === 'all' ? 
                displayDoctors(doctors.all.concat(doctors.pending)) : 
                displayDoctors(doctors.pending)
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Doctor Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Doctor Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDoctor && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedDoctor.name} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      value={selectedDoctor.email} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Specialization</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedDoctor.specialization} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Experience</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={`${selectedDoctor.experience} years`} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <div>
                  {getApprovalBadge(selectedDoctor.isApproved)}
                </div>
              </Form.Group>
              
              {/* Additional doctor details would go here in a real implementation */}
              
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          {selectedDoctor && !selectedDoctor.isApproved && (
            <>
              <Button 
                variant="success"
                onClick={() => {
                  handleApprove(selectedDoctor.id);
                  setShowDetailsModal(false);
                }}
              >
                Approve
              </Button>
              <Button 
                variant="danger"
                onClick={() => {
                  handleReject(selectedDoctor.id);
                  setShowDetailsModal(false);
                }}
              >
                Reject
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageDoctors; 