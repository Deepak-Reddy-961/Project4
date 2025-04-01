import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DoctorsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('');
  
  // Placeholder data - in a real implementation, this would be fetched from the API
  const doctors = [
    {
      id: 1,
      name: 'Dr. John Smith',
      specialization: 'Cardiology',
      experience: 15,
      rating: 4.8,
      fee: 150
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      specialization: 'Dermatology',
      experience: 10,
      rating: 4.6,
      fee: 120
    },
    {
      id: 3,
      name: 'Dr. Michael Brown',
      specialization: 'Neurology',
      experience: 20,
      rating: 4.9,
      fee: 180
    }
  ];
  
  // Filter doctors based on search term and specialization
  const filteredDoctors = doctors.filter(doctor => {
    return (
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (specialization === '' || doctor.specialization === specialization)
    );
  });
  
  // Mock list of specializations
  const specializations = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Psychiatry'
  ];

  return (
    <Container>
      <h2 className="mb-4">Find a Doctor</h2>
      
      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder="Search doctors by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary">
              Search
            </Button>
          </InputGroup>
        </Col>
        <Col md={6}>
          <Form.Select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
          >
            <option value="">All Specializations</option>
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      
      <Row>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map(doctor => (
            <Col md={4} key={doctor.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{doctor.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{doctor.specialization}</Card.Subtitle>
                  <Card.Text>
                    <small>
                      <strong>Experience:</strong> {doctor.experience} years<br />
                      <strong>Rating:</strong> {doctor.rating}/5<br />
                      <strong>Consultation Fee:</strong> ${doctor.fee}
                    </small>
                  </Card.Text>
                  <Link to={`/patient/doctors/${doctor.id}`} className="btn btn-primary">
                    View Profile
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No doctors found matching your search criteria.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default DoctorsList; 