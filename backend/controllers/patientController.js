const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// Get patient profile
exports.getPatientProfile = async (req, res) => {
  try {
    // Get patient by user ID
    const patient = await Patient.findOne({ user: req.user.id })
      .populate({
        path: 'user',
        select: 'name email phone address'
      });
      
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update patient profile
exports.updatePatientProfile = async (req, res) => {
  try {
    const { dateOfBirth, gender, bloodGroup, allergies, medicalHistory, emergencyContact } = req.body;
    
    // Get patient by user ID
    let patient = await Patient.findOne({ user: req.user.id });
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    
    // Update fields
    if (dateOfBirth) patient.dateOfBirth = dateOfBirth;
    if (gender) patient.gender = gender;
    if (bloodGroup) patient.bloodGroup = bloodGroup;
    if (allergies) patient.allergies = allergies;
    if (medicalHistory) patient.medicalHistory = medicalHistory;
    if (emergencyContact) patient.emergencyContact = emergencyContact;
    
    await patient.save();
    
    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Book an appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, startTime, endTime, reason } = req.body;
    
    // Get patient
    const patient = await Patient.findOne({ user: req.user.id });
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    
    // Get doctor
    const doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Check if doctor is approved
    const doctorUser = await User.findById(doctor.user);
    if (!doctorUser.isApproved) {
      return res.status(400).json({ message: 'Doctor is not approved yet' });
    }
    
    // Convert date string to Date object
    const appDate = new Date(appointmentDate);
    
    // Get day name
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[appDate.getDay()];
    
    // Check if the doctor has an available slot for the given day and time
    const availableSlot = doctor.availableTimeSlots.find(
      slot => slot.day === dayName && 
      slot.startTime === startTime && 
      slot.endTime === endTime &&
      slot.isAvailable
    );
    
    if (!availableSlot) {
      return res.status(400).json({ message: 'Selected time slot is not available' });
    }
    
    // Check if the slot is already booked
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate,
      startTime
    });
    
    if (existingAppointment) {
      return res.status(400).json({ message: 'This appointment slot is already booked' });
    }
    
    // Create new appointment
    const appointment = new Appointment({
      patient: patient._id,
      doctor: doctor._id,
      appointmentDate,
      startTime,
      endTime,
      reason
    });
    
    await appointment.save();
    
    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get patient's appointments
exports.getPatientAppointments = async (req, res) => {
  try {
    // Get patient
    const patient = await Patient.findOne({ user: req.user.id });
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    
    // Get appointments
    const appointments = await Appointment.find({ patient: patient._id })
      .populate({
        path: 'doctor',
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

// Cancel appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    
    // Get patient
    const patient = await Patient.findOne({ user: req.user.id });
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    
    // Find appointment
    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if appointment belongs to this patient
    if (appointment.patient.toString() !== patient._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this appointment' });
    }
    
    // Check if appointment can be cancelled (not completed or already cancelled)
    if (appointment.status === 'completed' || appointment.status === 'cancelled') {
      return res.status(400).json({ 
        message: `Cannot cancel appointment that is already ${appointment.status}` 
      });
    }
    
    // Update status to cancelled
    appointment.status = 'cancelled';
    
    await appointment.save();
    
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};