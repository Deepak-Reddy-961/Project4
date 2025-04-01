import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Alert } from 'react-bootstrap';

const DoctorSchedule = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Placeholder state for the form
  const [formData, setFormData] = useState({
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    isAvailable: true
  });
  
  // Placeholder data for existing time slots - in a real implementation, this would be fetched from the API
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, day: 'Monday', startTime: '09:00', endTime: '12:00', isAvailable: true },
    { id: 2, day: 'Monday', startTime: '14:00', endTime: '17:00', isAvailable: true },
    { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '12:00', isAvailable: true },
    { id: 4, day: 'Friday', startTime: '14:00', endTime: '17:00', isAvailable: true }
  ]);
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    // Basic validation
    if (formData.startTime >= formData.endTime) {
      setError('End time must be after start time');
      return;
    }
    
    // In a real implementation, this would call the API to add the time slot
    
    // Simulate adding a new time slot
    const newSlot = {
      id: timeSlots.length + 1,
      ...formData
    };
    
    setTimeSlots([...timeSlots, newSlot]);
    setMessage('Time slot added successfully');
    
    // Reset form to defaults
    setFormData({
      day: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      isAvailable: true
    });
  };
  
  const handleDelete = (id) => {
    // In a real implementation, this would call the API to delete the time slot
    
    // Simulate deleting a time slot
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
    setMessage('Time slot removed successfully');
  };
  
  const handleToggleAvailability = (id) => {
    // In a real implementation, this would call the API to update the time slot
    
    // Simulate toggling availability
    setTimeSlots(
      timeSlots.map(slot => 
        slot.id === id ? { ...slot, isAvailable: !slot.isAvailable } : slot
      )
    );
    setMessage('Availability updated successfully');
  };

  return (
    <Container>
      <h2 className="mb-4">Manage Schedule</h2>
      
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Add New Time Slot</Card.Title>
              
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Day</Form.Label>
                  <Form.Select
                    name="day"
                    value={formData.day}
                    onChange={handleChange}
                    required
                  >
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Start Time</Form.Label>
                      <Form.Control
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>End Time</Form.Label>
                      <Form.Control
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="isAvailable"
                    checked={formData.isAvailable}
                    onChange={handleChange}
                    label="Available for booking"
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                  Add Time Slot
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Schedule Information</Card.Title>
              <Card.Text>
                <p>Define your availability by adding time slots for each day. Patients will be able to book appointments during these times.</p>
                <p>You can also temporarily disable time slots without deleting them.</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card>
        <Card.Body>
          <Card.Title>Current Schedule</Card.Title>
          
          <Table responsive>
            <thead>
              <tr>
                <th>Day</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(slot => (
                <tr key={slot.id}>
                  <td>{slot.day}</td>
                  <td>{slot.startTime}</td>
                  <td>{slot.endTime}</td>
                  <td>
                    <span className={`badge bg-${slot.isAvailable ? 'success' : 'danger'}`}>
                      {slot.isAvailable ? 'Available' : 'Not Available'}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant={slot.isAvailable ? 'warning' : 'success'}
                      size="sm"
                      className="me-2"
                      onClick={() => handleToggleAvailability(slot.id)}
                    >
                      {slot.isAvailable ? 'Disable' : 'Enable'}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(slot.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
              {timeSlots.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No time slots added yet.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DoctorSchedule; 