import React from 'react';
import { Container, Row, Col, Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

const DoctorDetails = () => {
  const { id } = useParams();
  
  // Placeholder data - in a real implementation, this would be fetched from the API
  const doctor = {
    id: id,
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    experience: 15,
    qualifications: ['MBBS', 'MD - Cardiology', 'DM - Cardiology'],
    bio: 'Dr. John Smith is a highly experienced cardiologist with over 15 years of clinical experience. He specializes in interventional cardiology and has performed over 1000 cardiac procedures.',
    rating: 4.8,
    fee: 150,
    availableTimeSlots: [
      { id: 1, day: 'Monday', startTime: '09:00', endTime: '12:00' },
      { id: 2, day: 'Monday', startTime: '14:00', endTime: '17:00' },
      { id: 3, day: 'Wednesday', startTime: '09:00', endTime: '12:00' },
      { id: 4, day: 'Friday', startTime: '14:00', endTime: '17:00' }
    ]
  };

  return (
    <Container>
      <Link to="/patient/doctors" className="btn btn-link mb-3">
        &larr; Back to Doctors List
      </Link>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title as="h2">{doctor.name}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">{doctor.specialization}</Card.Subtitle>
              
              <Row className="mb-3">
                <Col md={4}>
                  <Badge bg="primary" className="me-2">Experience: {doctor.experience} years</Badge>
                </Col>
                <Col md={4}>
                  <Badge bg="info" className="me-2">Rating: {doctor.rating}/5</Badge>
                </Col>
                <Col md={4}>
                  <Badge bg="secondary">Fee: ${doctor.fee}</Badge>
                </Col>
              </Row>
              
              <h5>About</h5>
              <p>{doctor.bio}</p>
              
              <h5>Qualifications</h5>
              <ul>
                {doctor.qualifications.map((qualification, index) => (
                  <li key={index}>{qualification}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="mb-4">
            <Card.Header as="h5">Available Time Slots</Card.Header>
            <ListGroup variant="flush">
              {doctor.availableTimeSlots.map(slot => (
                <ListGroup.Item key={slot.id}>
                  <div className="fw-bold">{slot.day}</div>
                  <div>{slot.startTime} - {slot.endTime}</div>
                  <Link to={`/patient/book-appointment/${doctor.id}?slot=${slot.id}`} className="btn btn-sm btn-primary mt-2">
                    Book Appointment
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDetails; 