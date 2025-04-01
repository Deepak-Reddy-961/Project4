const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { authenticate, isDoctor, isAdminOrDoctor } = require('../middleware/auth');

// @route   GET /api/doctors
// @desc    Get all approved doctors
// @access  Public
router.get('/', doctorController.getAllDoctors);

// @route   GET /api/doctors/specialization/:specialization
// @desc    Get doctors by specialization
// @access  Public
router.get('/specialization/:specialization', doctorController.getDoctorsBySpecialization);

// @route   GET /api/doctors/:id
// @desc    Get doctor by ID
// @access  Public
router.get('/:id', doctorController.getDoctorById);

// @route   PUT /api/doctors/profile
// @desc    Update doctor profile
// @access  Private (doctor only)
router.put('/profile', authenticate, isDoctor, doctorController.updateDoctorProfile);

// @route   POST /api/doctors/timeslots
// @desc    Add available time slots
// @access  Private (doctor only)
router.post('/timeslots', authenticate, isDoctor, doctorController.addTimeSlots);

// @route   DELETE /api/doctors/timeslots/:slotId
// @desc    Remove available time slot
// @access  Private (doctor only)
router.delete('/timeslots/:slotId', authenticate, isDoctor, doctorController.removeTimeSlot);

// @route   GET /api/doctors/appointments
// @desc    Get doctor's appointments
// @access  Private (doctor only)
router.get('/appointments', authenticate, isDoctor, doctorController.getDoctorAppointments);

// @route   PUT /api/doctors/appointments/:appointmentId
// @desc    Update appointment status
// @access  Private (doctor only)
router.put('/appointments/:appointmentId', authenticate, isDoctor, doctorController.updateAppointmentStatus);

module.exports = router; 