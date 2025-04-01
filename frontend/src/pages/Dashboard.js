import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HeartIcon, 
  AcademicCapIcon, 
  UserIcon,
  BeakerIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

const Dashboard = () => {
  const navigate = useNavigate();

  // Hospital statistics
  const stats = [
    { id: 1, name: 'Patient Satisfaction', value: '98%', description: 'Based on 5000+ reviews', icon: UserIcon },
    { id: 2, name: 'Successful Treatments', value: '15,000+', description: 'In the last year', icon: ChartBarIcon },
    { id: 3, name: 'Board Certified Doctors', value: '50+', description: 'In 20+ specialties', icon: UserIcon },
    { id: 4, name: 'Years of Service', value: '25', description: 'In the community', icon: ChartBarIcon },
  ];

  // Hospital specialties
  const specialties = [
    { id: 1, name: 'Cardiology', description: 'State-of-the-art cardiac care with advanced procedures and diagnostics', icon: HeartIcon },
    { id: 2, name: 'Orthopedics', description: 'Comprehensive joint and bone care including replacements and sports medicine', icon: UserIcon },
    { id: 3, name: 'Neurology', description: 'Advanced neurological treatments with cutting-edge technology', icon: AcademicCapIcon },
    { id: 4, name: 'Pediatrics', description: 'Compassionate care for children of all ages with specialized pediatric services', icon: UserIcon },
    { id: 5, name: 'Oncology', description: 'Comprehensive cancer care with the latest treatment protocols', icon: BeakerIcon },
  ];

  // Top doctors - now with real photos from the doctors list
  const topDoctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiology', rating: 4.9, image: 'https://randomuser.me/api/portraits/women/45.jpg' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Neurology', rating: 4.8, image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', rating: 5.0, image: 'https://randomuser.me/api/portraits/women/22.jpg' },
  ];

  // Function to navigate to doctor details
  const handleViewDoctorProfile = (doctorId) => {
    navigate(`/doctors`, { state: { selectedDoctorId: doctorId } });
  };

  // Function to navigate to appointments page
  const handleBookAppointment = () => {
    navigate('/appointments', { state: { openBookingModal: true } });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary-600 dark:text-white mb-2">Welcome to HealthCare</h1>
        <p className="text-secondary-500 dark:text-secondary-300">Your trusted partner for comprehensive healthcare services</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => {
          const StatIcon = stat.icon;
          return (
            <div key={stat.id} className="card flex flex-col items-center text-center">
              <div className="rounded-full bg-accent-100 dark:bg-accent-900/20 w-14 h-14 flex items-center justify-center mb-4">
                <StatIcon className="w-8 h-8 text-accent-500" />
              </div>
              <span className="text-3xl font-bold text-secondary-700 dark:text-white">{stat.value}</span>
              <span className="text-lg font-medium mt-2 text-secondary-600 dark:text-secondary-300">{stat.name}</span>
              <span className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">{stat.description}</span>
            </div>
          );
        })}
      </div>

      {/* Hospital Highlights */}
      <h2 className="section-title">Our Specialties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {specialties.map((specialty) => {
          const SpecialtyIcon = specialty.icon;
          return (
            <div key={specialty.id} className="department-item group">
              <SpecialtyIcon className="w-12 h-12 text-accent-500 mb-4 group-hover:text-white" />
              <h3 className="text-xl font-semibold mb-2">{specialty.name}</h3>
              <p className="text-secondary-600 dark:text-secondary-300 group-hover:text-white">{specialty.description}</p>
            </div>
          );
        })}
      </div>

      {/* Top Doctors */}
      <h2 className="section-title">Featured Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {topDoctors.map((doctor) => (
          <div key={doctor.id} className="card doctor-card">
            <img src={doctor.image} alt={doctor.name} className="doctor-img" />
            <h3 className="doctor-name">{doctor.name}</h3>
            <p className="doctor-specialty">{doctor.specialty}</p>
            <div className="flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(doctor.rating) ? 'text-yellow-500' : 'text-gray-300'}`} 
                />
              ))}
              <span className="text-sm ml-2 text-secondary-600 dark:text-secondary-400">{doctor.rating}/5.0</span>
            </div>
            <button 
              className="btn-outline mt-4 w-full"
              onClick={() => handleViewDoctorProfile(doctor.id)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
      
      {/* Upcoming Appointments */}
      <div className="card mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-secondary-600 dark:text-white">Upcoming Appointments</h2>
          <Link to="/appointments" className="text-accent-500 hover:text-accent-600">View All</Link>
        </div>
        <div className="bg-secondary-50 dark:bg-secondary-700/30 p-6 rounded-md text-center">
          <p className="text-secondary-600 dark:text-secondary-300">No upcoming appointments scheduled.</p>
          <button className="btn-accent mt-4" onClick={handleBookAppointment}>Book an Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 