const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

// Get all appointments (admin only)
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

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate({
        path: 'doctor',
        populate: {
          path: 'user',
          select: 'name email phone'
        }
      })
      .populate({
        path: 'patient',
        populate: {
          path: 'user',
          select: 'name email phone'
        }
      });
      
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check authorization - only admin, doctor of appointment, or patient of appointment can view
    const isAdmin = req.user.role === 'admin';
    const isAppointmentDoctor = req.user.role === 'doctor' && 
      appointment.doctor.user._id.toString() === req.user.id;
    const isAppointmentPatient = req.user.role === 'patient' && 
      appointment.patient.user._id.toString() === req.user.id;
      
    if (!isAdmin && !isAppointmentDoctor && !isAppointmentPatient) {
      return res.status(403).json({ message: 'Not authorized to view this appointment' });
    }
    
    res.json(appointment);
  } catch (err) {
    console.error(err);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// Update appointment (admin only)
exports.updateAppointment = async (req, res) => {
  try {
    const { appointmentDate, startTime, endTime, status, notes, paymentStatus } = req.body;
    
    // Find appointment
    let appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Update fields
    if (appointmentDate) appointment.appointmentDate = appointmentDate;
    if (startTime) appointment.startTime = startTime;
    if (endTime) appointment.endTime = endTime;
    if (status) appointment.status = status;
    if (notes) appointment.notes = notes;
    if (paymentStatus) appointment.paymentStatus = paymentStatus;
    
    await appointment.save();
    
    res.json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete appointment (admin only)
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    await Appointment.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Appointment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 