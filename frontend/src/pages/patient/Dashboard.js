import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PatientDashboard = () => {
  const { user } = useAuth();

  return (
    <Container>
      <h2 className="mb-4">Patient Dashboard</h2>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Welcome, {user?.name}</Card.Title>
              <Card.Text>
                This is your patient dashboard. From here, you can manage all your healthcare needs.
              </Card.Text>
            </Card.Body>
          </Card>

          <Row>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Find a Doctor</Card.Title>
                  <Card.Text>
                    Search for specialists and book appointments.
                  </Card.Text>
                  <Link to="/patient/doctors" className="btn btn-primary">Find Doctors</Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>My Appointments</Card.Title>
                  <Card.Text>
                    View your upcoming and past appointments.
                  </Card.Text>
                  <Link to="/patient/appointments" className="btn btn-primary">View Appointments</Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Quick Actions</Card.Title>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/patient/doctors" className="text-decoration-none">Find Doctors</Link>
                </li>
                <li className="mb-2">
                  <Link to="/patient/appointments" className="text-decoration-none">View Appointments</Link>
                </li>
                <li className="mb-2">
                  <Link to="/patient/profile" className="text-decoration-none">Update Profile</Link>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientDashboard; 