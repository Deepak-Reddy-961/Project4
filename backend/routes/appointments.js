const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { authenticate, isAdmin } = require('../middleware/auth');

// @route   GET /api/appointments
// @desc    Get all appointments
// @access  Private (admin only)
router.get('/', authenticate, isAdmin, appointmentController.getAllAppointments);

// @route   GET /api/appointments/:id
// @desc    Get appointment by ID
// @access  Private (authenticated users, but with authorization checks in controller)
router.get('/:id', authenticate, appointmentController.getAppointmentById);

// @route   PUT /api/appointments/:id
// @desc    Update appointment
// @access  Private (admin only)
router.put('/:id', authenticate, isAdmin, appointmentController.updateAppointment);

// @route   DELETE /api/appointments/:id
// @desc    Delete appointment
// @access  Private (admin only)
router.delete('/:id', authenticate, isAdmin, appointmentController.deleteAppointment);

module.exports = router; 