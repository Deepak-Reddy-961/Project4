const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Apply admin middleware to all routes
router.use(authenticate, isAdmin);

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private (admin only)
router.get('/users', adminController.getAllUsers);

// @route   GET /api/admin/doctors
// @desc    Get all doctors (including pending approval)
// @access  Private (admin only)
router.get('/doctors', adminController.getAllDoctors);

// @route   GET /api/admin/patients
// @desc    Get all patients
// @access  Private (admin only)
router.get('/patients', adminController.getAllPatients);

// @route   GET /api/admin/appointments
// @desc    Get all appointments
// @access  Private (admin only)
router.get('/appointments', adminController.getAllAppointments);

// @route   PUT /api/admin/doctors/:userId/approval
// @desc    Approve or reject doctor
// @access  Private (admin only)
router.put('/doctors/:userId/approval', adminController.updateDoctorApproval);

// @route   DELETE /api/admin/users/:userId
// @desc    Delete user
// @access  Private (admin only)
router.delete('/users/:userId', adminController.deleteUser);

module.exports = router; 