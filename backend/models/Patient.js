const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  bloodGroup: {
    type: String,
    trim: true
  },
  allergies: [{
    type: String,
    trim: true
  }],
  medicalHistory: [{
    condition: {
      type: String,
      trim: true
    },
    diagnosedYear: {
      type: Number
    },
    notes: {
      type: String,
      trim: true
    }
  }],
  emergencyContact: {
    name: {
      type: String,
      trim: true
    },
    relationship: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    }
  }
}, { timestamps: true });

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient; 