const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create user
    user = new User({
      name,
      email,
      password,
      role,
      phone,
      address
    });
    
    await user.save();
    
    // Create patient or doctor profile
    if (role === 'patient') {
      const patient = new Patient({
        user: user._id
      });
      
      await patient.save();
    } else if (role === 'doctor') {
      // Additional doctor data
      const { specialization, qualifications, experience, bio, consultationFee } = req.body;
      
      const doctor = new Doctor({
        user: user._id,
        specialization,
        qualifications: qualifications || [],
        experience,
        bio,
        consultationFee
      });
      
      await doctor.save();
    }
    
    // Generate JWT token
    const payload = {
      id: user._id,
      role: user.role
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Verify password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check if doctor is approved
    if (user.role === 'doctor' && !user.isApproved) {
      return res.status(403).json({ message: 'Your account is pending approval' });
    }
    
    // Generate JWT token
    const payload = {
      id: user._id,
      role: user.role
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; 