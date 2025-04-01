import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DoctorDashboard = () => {
  const { user } = useAuth();
  
  // Placeholder data - in a real implementation, this would be fetched from the API
  const stats = {
    todayAppointments: 5,
    upcomingAppointments: 12,
    totalPatients: 45,
    pendingAppointments: 3
  };

  return (
    <Container>
      <h2 className="mb-4">Doctor Dashboard</h2>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Welcome, Dr. {user?.name}</Card.Title>
              <Card.Text>
                This is your doctor dashboard. From here, you can manage your schedule and appointments.
              </Card.Text>
            </Card.Body>
          </Card>
          
          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Today's Appointments</Card.Title>
                  <h3 className="display-4 text-center">{stats.todayAppointments}</h3>
                  <div className="text-center mt-3">
                    <Link to="/doctor/appointments" className="btn btn-primary">
                      View Appointments
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Upcoming Appointments</Card.Title>
                  <h3 className="display-4 text-center">{stats.upcomingAppointments}</h3>
                  <div className="text-center mt-3">
                    <Link to="/doctor/appointments" className="btn btn-primary">
                      View All
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Total Patients</Card.Title>
                  <h3 className="display-4 text-center">{stats.totalPatients}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Pending Appointments</Card.Title>
                  <h3 className="display-4 text-center">{stats.pendingAppointments}</h3>
                  <div className="text-center mt-3">
                    <Link to="/doctor/appointments" className="btn btn-primary">
                      Review
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Quick Actions</Card.Title>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/doctor/schedule" className="text-decoration-none">
                    Set Availability
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/doctor/profile" className="text-decoration-none">
                    Update Profile
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/doctor/appointments" className="text-decoration-none">
                    Manage Appointments
                  </Link>
                </li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>Today's Schedule</Card.Title>
              <Card.Text>
                <small>
                  <p><strong>9:00 AM - 9:30 AM:</strong> John Doe (Check-up)</p>
                  <p><strong>10:00 AM - 10:30 AM:</strong> Jane Smith (Consultation)</p>
                  <p><strong>11:00 AM - 11:30 AM:</strong> Robert Johnson (Follow-up)</p>
                  <p><strong>2:00 PM - 2:30 PM:</strong> Emily Davis (New Patient)</p>
                  <p><strong>3:00 PM - 3:30 PM:</strong> Michael Wilson (Results Review)</p>
                </small>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDashboard; 