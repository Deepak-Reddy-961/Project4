// API Service for the Healthcare Application
// Currently using mock data, but can be easily connected to a real backend

// Local storage keys
const STORAGE_KEYS = {
  APPOINTMENTS: 'healthcare_appointments',
  AUTH: 'healthcare_auth',
};

// Mock delay function to simulate network requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Base URLs for different environments
const API_URLS = {
  development: "https://healthapp-backend-42n8.onrender.com",
  production: 'https://api.healthcareapp.com/api',
  test: "https://healthapp-backend-42n8.onrender.com",
};

// Get the current environment
const ENV = process.env.NODE_ENV || 'development';

// Base URL based on environment
const BASE_URL = API_URLS[ENV];

// Helper function for HTTP requests
const request = async (endpoint, method = 'GET', data = null) => {
  try {
    // In a real application, this would make actual HTTP requests
    // For demo purposes, we're just simulating network delay and returning mock data
    await delay(500); // Simulate network delay
    
    // Log the request (for development purposes)
    console.log(`API ${method} Request:`, endpoint, data);
    
    // Special case for appointment creation to save to localStorage
    if (endpoint === 'appointments' && method === 'POST' && data) {
      return saveAppointment(data);
    }
    
    // Special case for getting all appointments to include localStorage data
    if (endpoint === 'appointments' && method === 'GET') {
      return getAllAppointments();
    }
    
    // Return the appropriate mock data based on endpoint and method
    return getMockResponse(endpoint, method, data);
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Get mock response based on endpoint and method
const getMockResponse = (endpoint, method, data) => {
  // Split the endpoint to get the resource type
  const parts = endpoint.split('/').filter(Boolean);
  const resourceType = parts[0];
  
  // Return mock data based on resource type
  switch (resourceType) {
    case 'doctors':
      return mockDoctorsData(parts.slice(1), method, data);
    case 'appointments':
      return mockAppointmentsData(parts.slice(1), method, data);
    case 'patients':
      return mockPatientsData(parts.slice(1), method, data);
    case 'auth':
      return mockAuthData(parts.slice(1), method, data);
    default:
      throw new Error(`Unknown resource type: ${resourceType}`);
  }
};

// Helper function to get stored appointments
const getStoredAppointments = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
  return stored ? JSON.parse(stored) : [];
};

// Helper function to save appointment to localStorage
const saveAppointment = (appointmentData) => {
  const appointments = getStoredAppointments();
  
  // Create a new appointment with an ID and default status
  const newAppointment = {
    id: Date.now(), // Use timestamp as a simple ID
    ...appointmentData,
    status: 'Scheduled',
  };
  
  // Add to local appointments
  appointments.push(newAppointment);
  
  // Save back to localStorage
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  
  // Trigger a custom event to notify other tabs/components
  if (typeof window !== 'undefined') {
    // Create a custom event for same-tab communication
    const appointmentEvent = new CustomEvent('appointmentCreated', { 
      detail: { appointment: newAppointment } 
    });
    window.dispatchEvent(appointmentEvent);
    
    // For cross-tab communication, we can manually dispatch a storage event
    // This is a workaround since localStorage events don't fire in the same tab that made the change
    const storageEvent = new StorageEvent('storage', {
      key: STORAGE_KEYS.APPOINTMENTS,
      newValue: localStorage.getItem(STORAGE_KEYS.APPOINTMENTS),
      storageArea: localStorage
    });
    window.dispatchEvent(storageEvent);
  }
  
  return { 
    success: true, 
    message: 'Appointment booked successfully',
    data: newAppointment
  };
};

// Helper function to get all appointments (mock + localStorage)
const getAllAppointments = () => {
  // Get stored appointments
  const storedAppointments = getStoredAppointments();
  
  // If there are stored appointments, return them
  return { 
    success: true,
    data: storedAppointments
  };
};

// Mock data functions based on resource type
const mockDoctorsData = (pathParts, method, data) => {
  // Implementation would return mock doctors data
  // In a real app, this would be replaced with actual API calls
  return { success: true, message: 'Mock doctors data retrieved' };
};

const mockAppointmentsData = (pathParts, method, data) => {
  // Implementation would return mock appointments data
  return { success: true, message: 'Mock appointments data retrieved' };
};

const mockPatientsData = (pathParts, method, data) => {
  // Implementation would return mock patients data
  return { success: true, message: 'Mock patients data retrieved' };
};

const mockAuthData = (pathParts, method, data) => {
  // Implementation would handle auth requests
  if (method === 'POST' && pathParts[0] === 'login') {
    // Mock login response
    return { 
      success: true, 
      token: 'mock-jwt-token', 
      user: { 
        id: 1, 
        name: 'Test User', 
        email: data.email, 
        role: 'patient' 
      } 
    };
  }
  return { success: false, message: 'Unknown auth endpoint' };
};

// Exported API functions for different resources
export const doctorsApi = {
  getAll: () => request('doctors'),
  getById: (id) => request(`doctors/${id}`),
  create: (data) => request('doctors', 'POST', data),
  update: (id, data) => request(`doctors/${id}`, 'PUT', data),
  delete: (id) => request(`doctors/${id}`, 'DELETE'),
};

export const appointmentsApi = {
  getAll: () => request('appointments'),
  getById: (id) => request(`appointments/${id}`),
  create: (data) => request('appointments', 'POST', data),
  update: (id, data) => request(`appointments/${id}`, 'PUT', data),
  cancel: (id) => request(`appointments/${id}/cancel`, 'PUT'),
};

export const patientsApi = {
  getAll: () => request('patients'),
  getById: (id) => request(`patients/${id}`),
  update: (id, data) => request(`patients/${id}`, 'PUT', data),
};

export const authApi = {
  login: (credentials) => request('auth/login', 'POST', credentials),
  register: (userData) => request('auth/register', 'POST', userData),
  logout: () => request('auth/logout', 'POST'),
  getCurrentUser: () => request('auth/me'),
};

export default {
  doctors: doctorsApi,
  appointments: appointmentsApi,
  patients: patientsApi,
  auth: authApi,
}; 
