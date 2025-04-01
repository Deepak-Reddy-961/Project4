import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API functions for authentication
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me')
};

// API functions for doctors
export const doctorAPI = {
  getAllDoctors: () => api.get('/doctors'),
  getDoctorById: (id) => api.get(`/doctors/${id}`),
  getDoctorsBySpecialization: (specialization) => api.get(`/doctors/specialization/${specialization}`),
  updateProfile: (profileData) => api.put('/doctors/profile', profileData),
  addTimeSlots: (timeSlots) => api.post('/doctors/timeslots', { timeSlots }),
  removeTimeSlot: (slotId) => api.delete(`/doctors/timeslots/${slotId}`),
  getDoctorAppointments: () => api.get('/doctors/appointments'),
  updateAppointmentStatus: (appointmentId, status, notes) => 
    api.put(`/doctors/appointments/${appointmentId}`, { status, notes })
};

// API functions for patients
export const patientAPI = {
  getProfile: () => api.get('/patients/profile'),
  updateProfile: (profileData) => api.put('/patients/profile', profileData),
  bookAppointment: (appointmentData) => api.post('/patients/appointments', appointmentData),
  getPatientAppointments: () => api.get('/patients/appointments'),
  cancelAppointment: (appointmentId) => api.put(`/patients/appointments/${appointmentId}/cancel`)
};

// API functions for admin
export const adminAPI = {
  getAllUsers: () => api.get('/admin/users'),
  getAllDoctors: () => api.get('/admin/doctors'),
  getAllPatients: () => api.get('/admin/patients'),
  getAllAppointments: () => api.get('/admin/appointments'),
  updateDoctorApproval: (userId, isApproved) => 
    api.put(`/admin/doctors/${userId}/approval`, { isApproved }),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`)
};

export default api; 