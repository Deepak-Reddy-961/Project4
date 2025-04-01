const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all doctors (including pending approval)
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate({
        path: 'user',
        select: 'name email phone address isApproved'
      });
      
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate({
        path: 'user',
        select: 'name email phone address'
      });
      
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate({
        path: 'doctor',
        populate: {
          path: 'user',
          select: 'name email'
        }
      })
      .populate({
        path: 'patient',
        populate: {
          path: 'user',
          select: 'name email'
        }
      })
      .sort({ appointmentDate: 1 });
      
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve or reject doctor
exports.updateDoctorApproval = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isApproved } = req.body;
    
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user is a doctor
    if (user.role !== 'doctor') {
      return res.status(400).json({ message: 'User is not a doctor' });
    }
    
    // Update approval status
    user.isApproved = isApproved;
    
    await user.save();
    
    res.json({ message: `Doctor ${isApproved ? 'approved' : 'rejected'} successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user (and associated doctor/patient profile)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Delete associated profile
    if (user.role === 'doctor') {
      // Find doctor
      const doctor = await Doctor.findOne({ user: userId });
      
      if (doctor) {
        // Delete doctor's appointments
        await Appointment.deleteMany({ doctor: doctor._id });
        
        // Delete doctor profile
        await Doctor.findByIdAndDelete(doctor._id);
      }
    } else if (user.role === 'patient') {
      // Find patient
      const patient = await Patient.findOne({ user: userId });
      
      if (patient) {
        // Delete patient's appointments
        await Appointment.deleteMany({ patient: patient._id });
        
        // Delete patient profile
        await Patient.findByIdAndDelete(patient._id);
      }
    }
    
    // Delete user
    await User.findByIdAndDelete(userId);
    
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 