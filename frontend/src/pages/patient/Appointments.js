import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal } from 'react-bootstrap';

const PatientAppointments = () => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  // Placeholder data - in a real implementation, this would be fetched from the API
  const appointments = [
    {
      id: 1,
      doctor: {
        id: 1,
        name: 'Dr. John Smith',
        specialization: 'Cardiology'
      },
      date: '2023-06-15',
      startTime: '09:00',
      endTime: '09:30',
      status: 'confirmed',
      reason: 'Regular check-up'
    },
    {
      id: 2,
      doctor: {
        id: 2,
        name: 'Dr. Sarah Johnson',
        specialization: 'Dermatology'
      },
      date: '2023-06-20',
      startTime: '14:00',
      endTime: '14:30',
      status: 'scheduled',
      reason: 'Skin consultation'
    },
    {
      id: 3,
      doctor: {
        id: 3,
        name: 'Dr. Michael Brown',
        specialization: 'Neurology'
      },
      date: '2023-05-10',
      startTime: '10:00',
      endTime: '10:30',
      status: 'completed',
      reason: 'Headache treatment'
    }
  ];
  
  const handleCancelClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };
  
  const handleCancelAppointment = () => {
    // In a real implementation, this would call the API to cancel the appointment
    setShowCancelModal(false);
    // Update appointment status to 'cancelled'
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
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <Container>
      <h2 className="mb-4">My Appointments</h2>
      
      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Specialization</th>
                <th>Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(appointment => (
                <tr key={appointment.id}>
                  <td>{appointment.doctor.name}</td>
                  <td>{appointment.doctor.specialization}</td>
                  <td>{formatDate(appointment.date)}</td>
                  <td>{appointment.startTime} - {appointment.endTime}</td>
                  <td>{appointment.reason}</td>
                  <td>{getStatusBadge(appointment.status)}</td>
                  <td>
                    {(appointment.status === 'scheduled' || appointment.status === 'confirmed') && (
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleCancelClick(appointment)}
                      >
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center">No appointments found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      
      {/* Cancel Appointment Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel your appointment with {selectedAppointment?.doctor.name} on {selectedAppointment && formatDate(selectedAppointment.date)} at {selectedAppointment?.startTime}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleCancelAppointment}>
            Cancel Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PatientAppointments; 