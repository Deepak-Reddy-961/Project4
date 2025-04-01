import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';
import Settings from './pages/admin/Settings';

// Route Protection
import PrivateRoute from './components/routes/PrivateRoute';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Home Page
import Home from './pages/Home';

// Patient Pages
import PatientDashboard from './pages/patient/Dashboard';
import PatientProfile from './pages/patient/Profile';
import DoctorsList from './pages/patient/DoctorsList';
import DoctorDetails from './pages/patient/DoctorDetails';
import PatientAppointments from './pages/patient/Appointments';
import BookAppointment from './pages/patient/BookAppointment';

// Doctor Pages
import DoctorDashboard from './pages/doctor/Dashboard';
import DoctorProfile from './pages/doctor/Profile';
import DoctorSchedule from './pages/doctor/Schedule';
import DoctorAppointments from './pages/doctor/Appointments';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import ManageDoctors from './pages/admin/ManageDoctors';
import ManagePatients from './pages/admin/ManagePatients';
import ManageAppointments from './pages/admin/ManageAppointments';

// 404 Page
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes with Layout */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <PrivateRoute>
                <Layout>
                  <Appointments />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/doctors"
            element={
              <PrivateRoute>
                <Layout>
                  <Doctors />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <PrivateRoute>
                <Layout>
                  <Patients />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Layout>
                  <Settings />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Patient Routes */}
          <Route
            path="/patient/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <PatientDashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/profile"
            element={
              <PrivateRoute>
                <Layout>
                  <PatientProfile />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/doctors"
            element={
              <PrivateRoute>
                <Layout>
                  <DoctorsList />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/doctors/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <DoctorDetails />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/appointments"
            element={
              <PrivateRoute>
                <Layout>
                  <PatientAppointments />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/book-appointment/:doctorId"
            element={
              <PrivateRoute>
                <Layout>
                  <BookAppointment />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Doctor Routes */}
          <Route
            path="/doctor/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <DoctorDashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/profile"
            element={
              <PrivateRoute>
                <Layout>
                  <DoctorProfile />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/schedule"
            element={
              <PrivateRoute>
                <Layout>
                  <DoctorSchedule />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <PrivateRoute>
                <Layout>
                  <DoctorAppointments />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <PrivateRoute>
                <Layout>
                  <ManageDoctors />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/patients"
            element={
              <PrivateRoute>
                <Layout>
                  <ManagePatients />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/appointments"
            element={
              <PrivateRoute>
                <Layout>
                  <ManageAppointments />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
