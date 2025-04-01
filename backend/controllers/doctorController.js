const Doctor = require('../models/Doctor');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

// Get all doctors
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

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate({
        path: 'user',
        select: 'name email phone address isApproved'
      });
      
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.json(doctor);
  } catch (err) {
    console.error(err);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// Get doctors by specialization
exports.getDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization } = req.params;
    
    const doctors = await Doctor.find({ specialization })
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

// Update doctor profile (for logged in doctor)
exports.updateDoctorProfile = async (req, res) => {
  try {
    const { specialization, qualifications, experience, bio, consultationFee } = req.body;
    
    // Get doctor by user ID
    let doctor = await Doctor.findOne({ user: req.user.id });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    // Update fields
    if (specialization) doctor.specialization = specialization;
    if (qualifications) doctor.qualifications = qualifications;
    if (experience) doctor.experience = experience;
    if (bio) doctor.bio = bio;
    if (consultationFee) doctor.consultationFee = consultationFee;
    
    await doctor.save();
    
    res.json(doctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add available time slots
exports.addTimeSlots = async (req, res) => {
  try {
    const { timeSlots } = req.body;
    
    if (!timeSlots || !Array.isArray(timeSlots) || timeSlots.length === 0) {
      return res.status(400).json({ message: 'Please provide valid time slots' });
    }
    
    // Get doctor by user ID
    let doctor = await Doctor.findOne({ user: req.user.id });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    // Add new time slots
    doctor.availableTimeSlots.push(...timeSlots);
    
    await doctor.save();
    
    res.json(doctor.availableTimeSlots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove available time slot
exports.removeTimeSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    
    // Get doctor by user ID
    let doctor = await Doctor.findOne({ user: req.user.id });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    // Find index of slot to remove
    const slotIndex = doctor.availableTimeSlots.findIndex(slot => slot._id.toString() === slotId);
    
    if (slotIndex === -1) {
      return res.status(404).json({ message: 'Time slot not found' });
    }
    
    // Remove slot
    doctor.availableTimeSlots.splice(slotIndex, 1);
    
    await doctor.save();
    
    res.json({ message: 'Time slot removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get doctor's appointments
exports.getDoctorAppointments = async (req, res) => {
  try {
    // Get doctor by user ID
    const doctor = await Doctor.findOne({ user: req.user.id });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    // Get appointments
    const appointments = await Appointment.find({ doctor: doctor._id })
      .populate({
        path: 'patient',
        populate: {
          path: 'user',
          select: 'name email phone'
        }
      })
      .sort({ appointmentDate: 1 });
      
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update appointment status (for doctor)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status, notes } = req.body;
    
    // Get doctor by user ID
    const doctor = await Doctor.findOne({ user: req.user.id });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }
    
    // Find appointment
    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if appointment belongs to this doctor
    if (appointment.doctor.toString() !== doctor._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }
    
    // Update status
    appointment.status = status;
    
    // Update notes if provided
    if (notes) {
      appointment.notes = notes;
    }
    
    await appointment.save();
    
    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 