import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  // Placeholder data - in a real implementation, this would be fetched from the API
  const stats = {
    totalDoctors: 25,
    pendingApprovals: 5,
    totalPatients: 150,
    totalAppointments: 320,
    appointmentsToday: 12
  };

  return (
    <Container>
      <h2 className="mb-4">Admin Dashboard</h2>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Welcome, {user?.name}</Card.Title>
              <Card.Text>
                This is your admin dashboard where you can manage all aspects of the healthcare booking system.
              </Card.Text>
            </Card.Body>
          </Card>
          
          <Row>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <Card.Title>Total Doctors</Card.Title>
                  <h3 className="display-4">{stats.totalDoctors}</h3>
                  <Link to="/admin/doctors" className="btn btn-primary mt-2">
                    Manage Doctors
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <Card.Title>Total Patients</Card.Title>
                  <h3 className="display-4">{stats.totalPatients}</h3>
                  <Link to="/admin/patients" className="btn btn-primary mt-2">
                    Manage Patients
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="h-100 text-center">
                <Card.Body>
                  <Card.Title>Total Appointments</Card.Title>
                  <h3 className="display-4">{stats.totalAppointments}</h3>
                  <Link to="/admin/appointments" className="btn btn-primary mt-2">
                    View All
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Pending Doctor Approvals</Card.Title>
                  <h3 className="display-4 text-center">{stats.pendingApprovals}</h3>
                  <div className="text-center mt-3">
                    <Link to="/admin/doctors" className="btn btn-warning">
                      Review Pending Approvals
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>Today's Appointments</Card.Title>
                  <h3 className="display-4 text-center">{stats.appointmentsToday}</h3>
                  <div className="text-center mt-3">
                    <Link to="/admin/appointments" className="btn btn-primary">
                      View Today's Schedule
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
                  <Link to="/admin/doctors" className="text-decoration-none">
                    Manage Doctors
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/patients" className="text-decoration-none">
                    Manage Patients
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/admin/appointments" className="text-decoration-none">
                    Manage Appointments
                  </Link>
                </li>
              </ul>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Body>
              <Card.Title>System Overview</Card.Title>
              <Card.Text>
                <p>
                  <strong>Server Status:</strong> <span className="text-success">Online</span><br />
                  <strong>Database Status:</strong> <span className="text-success">Connected</span><br />
                  <strong>Last Backup:</strong> {new Date().toLocaleDateString()}<br />
                </p>
                <p>
                  All systems are operating normally.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard; 