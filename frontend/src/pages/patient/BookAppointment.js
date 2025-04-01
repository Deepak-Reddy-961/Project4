import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    appointmentDate: '',
    startTime: '',
    endTime: '',
    reason: '',
    slotId: null
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Get slot ID from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const slotId = params.get('slot');
    if (slotId) {
      setFormData(prev => ({ ...prev, slotId }));
      // In a real app, we would fetch the slot details based on the slotId
      // and pre-fill the form
    }
  }, [location]);
  
  // Placeholder data - in a real implementation, this would be fetched from the API
  const doctor = {
    id: doctorId,
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    fee: 150,
    availableTimeSlots: [
      { id: 1, day: 'Monday', date: '2023-06-19', startTime: '09:00', endTime: '09:30' },
      { id: 2, day: 'Monday', date: '2023-06-19', startTime: '09:30', endTime: '10:00' },
      { id: 3, day: 'Monday', date: '2023-06-19', startTime: '10:00', endTime: '10:30' },
      { id: 4, day: 'Wednesday', date: '2023-06-21', startTime: '14:00', endTime: '14:30' },
      { id: 5, day: 'Wednesday', date: '2023-06-21', startTime: '14:30', endTime: '15:00' },
      { id: 6, day: 'Friday', date: '2023-06-23', startTime: '11:00', endTime: '11:30' }
    ]
  };
  
  // Group available slots by date
  const groupedSlots = {};
  doctor.availableTimeSlots.forEach(slot => {
    if (!groupedSlots[slot.date]) {
      groupedSlots[slot.date] = [];
    }
    groupedSlots[slot.date].push(slot);
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleDateChange = (e) => {
    const date = e.target.value;
    setFormData({
      ...formData,
      appointmentDate: date,
      startTime: '',
      endTime: ''
    });
  };
  
  const handleTimeSlotChange = (e) => {
    const slotId = parseInt(e.target.value);
    const selectedSlot = doctor.availableTimeSlots.find(slot => slot.id === slotId);
    
    if (selectedSlot) {
      setFormData({
        ...formData,
        slotId,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.appointmentDate || !formData.startTime || !formData.reason) {
      setError('Please fill out all required fields');
      return;
    }
    
    // In a real implementation, this would call the API to book the appointment
    
    // Simulate successful booking
    setSuccess(true);
    
    // Reset form
    setFormData({
      appointmentDate: '',
      startTime: '',
      endTime: '',
      reason: '',
      slotId: null
    });
    
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/patient/appointments');
    }, 2000);
  };

  return (
    <Container>
      <Link to={`/patient/doctors/${doctorId}`} className="btn btn-link mb-3">
        &larr; Back to Doctor Profile
      </Link>
      
      <h2 className="mb-4">Book an Appointment</h2>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Appointment with {doctor.name}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">{doctor.specialization}</Card.Subtitle>
              
              {success && (
                <Alert variant="success">
                  Appointment booked successfully! Redirecting to your appointments...
                </Alert>
              )}
              
              {error && (
                <Alert variant="danger">{error}</Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Select
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleDateChange}
                    required
                  >
                    <option value="">Choose a date</option>
                    {Object.keys(groupedSlots).map(date => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString(undefined, {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Select Time Slot</Form.Label>
                  <Form.Select
                    name="slotId"
                    value={formData.slotId || ''}
                    onChange={handleTimeSlotChange}
                    disabled={!formData.appointmentDate}
                    required
                  >
                    <option value="">Choose a time slot</option>
                    {formData.appointmentDate && groupedSlots[formData.appointmentDate]?.map(slot => (
                      <option key={slot.id} value={slot.id}>
                        {slot.startTime} - {slot.endTime}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Reason for Visit</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Please briefly describe your reason for this appointment"
                    rows={3}
                    required
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit" disabled={success}>
                  Book Appointment
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Appointment Summary</Card.Title>
              <Card.Text>
                <strong>Doctor:</strong> {doctor.name}<br />
                <strong>Specialization:</strong> {doctor.specialization}<br />
                <strong>Consultation Fee:</strong> ${doctor.fee}<br />
                {formData.appointmentDate && (
                  <>
                    <strong>Date:</strong> {new Date(formData.appointmentDate).toLocaleDateString()}<br />
                  </>
                )}
                {formData.startTime && (
                  <>
                    <strong>Time:</strong> {formData.startTime} - {formData.endTime}<br />
                  </>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookAppointment; 