import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, Modal } from 'react-bootstrap';

const DoctorAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [notes, setNotes] = useState('');
  
  // Placeholder data - in a real implementation, this would be fetched from the API
  const appointments = {
    upcoming: [
      {
        id: 1,
        patient: {
          id: 1,
          name: 'John Doe',
          age: 45,
          phone: '555-123-4567'
        },
        date: '2023-06-15',
        startTime: '09:00',
        endTime: '09:30',
        status: 'confirmed',
        reason: 'Regular check-up'
      },
      {
        id: 2,
        patient: {
          id: 2,
          name: 'Jane Smith',
          age: 32,
          phone: '555-987-6543'
        },
        date: '2023-06-15',
        startTime: '10:00',
        endTime: '10:30',
        status: 'scheduled',
        reason: 'Consultation for skin condition'
      }
    ],
    past: [
      {
        id: 3,
        patient: {
          id: 3,
          name: 'Robert Johnson',
          age: 58,
          phone: '555-456-7890'
        },
        date: '2023-05-10',
        startTime: '14:00',
        endTime: '14:30',
        status: 'completed',
        reason: 'Follow-up for heart condition',
        notes: 'Patient\'s condition has improved. Medication adjusted.'
      },
      {
        id: 4,
        patient: {
          id: 4,
          name: 'Sarah Williams',
          age: 27,
          phone: '555-234-5678'
        },
        date: '2023-05-05',
        startTime: '11:00',
        endTime: '11:30',
        status: 'no-show',
        reason: 'Annual check-up'
      }
    ]
  };
  
  const handleUpdateClick = (appointment) => {
    setSelectedAppointment(appointment);
    setStatusUpdate(appointment.status);
    setNotes(appointment.notes || '');
    setShowUpdateModal(true);
  };
  
  const handleStatusUpdate = () => {
    // In a real implementation, this would call the API to update the appointment
    console.log({
      appointmentId: selectedAppointment.id,
      status: statusUpdate,
      notes
    });
    
    // Close modal
    setShowUpdateModal(false);
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return <Badge bg="warning">Scheduled</Badge>;
      case 'confirmed':
        return <Badge bg="success">Confirmed</Badge>;
      case 'completed':
        return <Badge bg="primary">Completed</Badge>;
      case 'cancelled':
        return <Badge bg="danger">Cancelled</Badge>;
      case 'no-show':
        return <Badge bg="secondary">No Show</Badge>;
      default:
        return <Badge bg="info">{status}</Badge>;
    }
  };
  
  const displayAppointments = (appointmentsList) => {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsList.map(appointment => (
            <tr key={appointment.id}>
              <td>
                {appointment.patient.name}<br />
                <small className="text-muted">
                  Age: {appointment.patient.age} | Phone: {appointment.patient.phone}
                </small>
              </td>
              <td>{formatDate(appointment.date)}</td>
              <td>{appointment.startTime} - {appointment.endTime}</td>
              <td>{appointment.reason}</td>
              <td>{getStatusBadge(appointment.status)}</td>
              <td>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => handleUpdateClick(appointment)}
                >
                  Update
                </Button>
              </td>
            </tr>
          ))}
          {appointmentsList.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  };

  return (
    <Container>
      <h2 className="mb-4">Appointments</h2>
      
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header>
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upcoming')}
                  >
                    Upcoming Appointments
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'past' ? 'active' : ''}`}
                    onClick={() => setActiveTab('past')}
                  >
                    Past Appointments
                  </button>
                </li>
              </ul>
            </Card.Header>
            <Card.Body>
              {activeTab === 'upcoming' ? 
                displayAppointments(appointments.upcoming) : 
                displayAppointments(appointments.past)
              }
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Update Appointment Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p>
                <strong>Patient:</strong> {selectedAppointment.patient.name}<br />
                <strong>Date:</strong> {formatDate(selectedAppointment.date)}<br />
                <strong>Time:</strong> {selectedAppointment.startTime} - {selectedAppointment.endTime}<br />
                <strong>Reason:</strong> {selectedAppointment.reason}
              </p>
              
              <Form.Group className="mb-3">
                <Form.Label>Update Status</Form.Label>
                <Form.Select
                  value={statusUpdate}
                  onChange={(e) => setStatusUpdate(e.target.value)}
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no-show">No Show</option>
                </Form.Select>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add appointment notes here..."
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleStatusUpdate}>
            Update Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DoctorAppointments; 