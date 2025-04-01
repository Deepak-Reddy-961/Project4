import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const DoctorProfile = () => {
  const { user, updateUserData } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // Placeholder doctor profile data - in a real implementation, this would be fetched from the API
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialization: 'Cardiology',
    qualifications: 'MBBS, MD - Cardiology, DM - Cardiology',
    experience: '15',
    bio: 'Dr. John Smith is a highly experienced cardiologist with over 15 years of clinical experience. He specializes in interventional cardiology and has performed over 1000 cardiac procedures.',
    consultationFee: '150',
    address: user?.address || ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    // In a real implementation, this would call the API to update the doctor's profile
    
    // Simulate successful update
    setMessage('Profile updated successfully');
    
    // Update auth context
    updateUserData();
  };

  return (
    <Container>
      <h2 className="mb-4">Doctor Profile</h2>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Professional Information</Card.Title>
              
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                      />
                      <Form.Text className="text-muted">
                        Email cannot be changed
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Specialization</Form.Label>
                      <Form.Control
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Qualifications (comma-separated)</Form.Label>
                  <Form.Control
                    type="text"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Years of Experience</Form.Label>
                      <Form.Control
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Consultation Fee ($)</Form.Label>
                      <Form.Control
                        type="number"
                        name="consultationFee"
                        value={formData.consultationFee}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Professional Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Account Information</Card.Title>
              <p>
                <strong>Account Type:</strong> Doctor<br />
                <strong>Member Since:</strong> {new Date().toLocaleDateString()}<br />
                <strong>Approval Status:</strong> {user?.isApproved ? 'Approved' : 'Pending'}
              </p>
              <hr />
              <Card.Title>Profile Completion</Card.Title>
              <p>Complete your profile to attract more patients.</p>
              <div className="progress mb-2">
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: '85%' }}
                  aria-valuenow="85"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  85%
                </div>
              </div>
              <small>
                <ul className="ps-3 mb-0">
                  <li>Add your clinic address</li>
                  <li>Upload profile picture</li>
                </ul>
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorProfile; 