const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticate, isPatient } = require('../middleware/auth');

// @route   GET /api/patients/profile
// @desc    Get patient profile
// @access  Private (patient only)
router.get('/profile', authenticate, isPatient, patientController.getPatientProfile);

// @route   PUT /api/patients/profile
// @desc    Update patient profile
// @access  Private (patient only)
router.put('/profile', authenticate, isPatient, patientController.updatePatientProfile);

// @route   POST /api/patients/appointments
// @desc    Book an appointment
// @access  Private (patient only)
router.post('/appointments', authenticate, isPatient, patientController.bookAppointment);

// @route   GET /api/patients/appointments
// @desc    Get patient's appointments
// @access  Private (patient only)
router.get('/appointments', authenticate, isPatient, patientController.getPatientAppointments);

// @route   PUT /api/patients/appointments/:appointmentId/cancel
// @desc    Cancel appointment
// @access  Private (patient only)
router.put('/appointments/:appointmentId/cancel', authenticate, isPatient, patientController.cancelAppointment);

module.exports = router; 