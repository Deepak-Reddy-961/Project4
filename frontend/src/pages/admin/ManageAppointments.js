import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Form } from 'react-bootstrap';

const ManageAppointments = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');
  
  // Placeholder data - in a real implementation, this would be fetched from the API
  const appointments = {
    all: [
      {
        id: 1,
        patientName: 'Alice Williams',
        patientEmail: 'alice.williams@example.com',
        doctorName: 'Dr. John Smith',
        doctorSpecialization: 'Cardiology',
        date: '2023-09-25',
        time: '10:00 AM',
        status: 'completed',
        reason: 'Heart checkup',
        notes: 'Regular checkup completed. Blood pressure normal.'
      },
      {
        id: 2,
        patientName: 'Bob Johnson',
        patientEmail: 'bob.johnson@example.com',
        doctorName: 'Dr. Sarah Johnson',
        doctorSpecialization: 'Dermatology',
        date: '2023-09-30',
        time: '2:30 PM',
        status: 'confirmed',
        reason: 'Skin rash',
        notes: ''
      },
      {
        id: 3,
        patientName: 'Carol Martinez',
        patientEmail: 'carol.martinez@example.com',
        doctorName: 'Dr. Michael Brown',
        doctorSpecialization: 'Neurology',
        date: '2023-09-28',
        time: '11:15 AM',
        status: 'cancelled',
        reason: 'Headache consultation',
        notes: 'Patient cancelled due to personal reasons.'
      }
    ],
    today: [
      {
        id: 4,
        patientName: 'David Thompson',
        patientEmail: 'david.thompson@example.com',
        doctorName: 'Dr. John Smith',
        doctorSpecialization: 'Cardiology',
        date: new Date().toISOString().split('T')[0],
        time: '9:00 AM',
        status: 'confirmed',
        reason: 'Annual checkup',
        notes: ''
      }
    ],
    pending: [
      {
        id: 5,
        patientName: 'Eva Garcia',
        patientEmail: 'eva.garcia@example.com',
        doctorName: 'Dr. Sarah Johnson',
        doctorSpecialization: 'Dermatology',
        date: '2023-10-05',
        time: '3:45 PM',
        status: 'pending',
        reason: 'Acne treatment follow-up',
        notes: ''
      }
    ]
  };
  
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setStatusUpdate(appointment.status);
    setShowDetailsModal(true);
  };
  
  const handleUpdateStatus = () => {
    // In a real implementation, this would call the API to update the appointment status
    console.log(`Updating appointment ${selectedAppointment.id} status to ${statusUpdate}`);
    // Update local state to reflect the change
    setShowDetailsModal(false);
  };
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      case 'confirmed':
        return <Badge bg="primary">Confirmed</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getAppointmentsForTab = (tabKey) => {
    if (tabKey === 'all') {
      return [
        ...appointments.all,
        ...appointments.today,
        ...appointments.pending
      ];
    }
    return appointments[tabKey] || [];
  };

  return (
    <Container>
      <h2 className="mb-4">Manage Appointments</h2>
      
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
                    All Appointments
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'today' ? 'active' : ''}`}
                    onClick={() => setActiveTab('today')}
                  >
                    Today
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pending')}
                  >
                    Pending
                  </button>
                </li>
              </ul>
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Specialization</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getAppointmentsForTab(activeTab).map(appointment => (
                    <tr key={appointment.id}>
                      <td>{appointment.patientName}</td>
                      <td>{appointment.doctorName}</td>
                      <td>{appointment.doctorSpecialization}</td>
                      <td>{formatDate(appointment.date)}</td>
                      <td>{appointment.time}</td>
                      <td>{getStatusBadge(appointment.status)}</td>
                      <td>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleViewDetails(appointment)}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {getAppointmentsForTab(activeTab).length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center">No appointments found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Appointment Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedAppointment.patientName} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Patient Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      value={selectedAppointment.patientEmail} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Doctor Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedAppointment.doctorName} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Specialization</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedAppointment.doctorSpecialization} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={formatDate(selectedAppointment.date)} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Time</Form.Label>
                    <Form.Control 
                      type="text" 
                      value={selectedAppointment.time} 
                      readOnly 
                    />
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3">
                <Form.Label>Reason for Visit</Form.Label>
                <Form.Control 
                  type="text" 
                  value={selectedAppointment.reason} 
                  readOnly 
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={statusUpdate}
                  onChange={(e) => setStatusUpdate(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  defaultValue={selectedAppointment.notes}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          <Button 
            variant="primary"
            onClick={handleUpdateStatus}
          >
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageAppointments; 