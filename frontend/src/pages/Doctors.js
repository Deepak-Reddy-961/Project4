import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { appointmentsApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Doctors = () => {
  // Doctor data with specialties, experience, and availability
  const doctorsData = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      image: 'https://randomuser.me/api/portraits/women/45.jpg',
      specialty: 'Cardiology',
      experience: '15 years',
      education: 'MD, Stanford University',
      certifications: 'American Board of Internal Medicine, Cardiovascular Disease',
      languages: 'English, Spanish',
      description: 'Dr. Johnson specializes in preventive cardiology and heart failure management.',
      availability: [
        { day: 'Monday', slots: ['9:00 AM - 12:00 PM', '2:00 PM - 5:00 PM'] },
        { day: 'Wednesday', slots: ['10:00 AM - 3:00 PM'] },
        { day: 'Friday', slots: ['9:00 AM - 1:00 PM'] }
      ]
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      specialty: 'Neurology',
      experience: '12 years',
      education: 'MD, Johns Hopkins University',
      certifications: 'American Board of Psychiatry and Neurology',
      languages: 'English, Mandarin',
      description: 'Dr. Chen focuses on stroke prevention and treatment of neurological disorders.',
      availability: [
        { day: 'Tuesday', slots: ['8:00 AM - 1:00 PM'] },
        { day: 'Thursday', slots: ['10:00 AM - 2:00 PM', '3:00 PM - 6:00 PM'] },
        { day: 'Saturday', slots: ['9:00 AM - 12:00 PM'] }
      ]
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      image: 'https://randomuser.me/api/portraits/women/22.jpg',
      specialty: 'Pediatrics',
      experience: '10 years',
      education: 'MD, Columbia University',
      certifications: 'American Board of Pediatrics',
      languages: 'English, Spanish',
      description: 'Dr. Rodriguez provides compassionate care for children of all ages, specializing in developmental pediatrics.',
      availability: [
        { day: 'Monday', slots: ['8:00 AM - 12:00 PM'] },
        { day: 'Wednesday', slots: ['1:00 PM - 5:00 PM'] },
        { day: 'Thursday', slots: ['9:00 AM - 3:00 PM'] }
      ]
    },
    {
      id: 4,
      name: 'Dr. Robert Williams',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      specialty: 'Orthopedic Surgery',
      experience: '18 years',
      education: 'MD, Harvard Medical School',
      certifications: 'American Board of Orthopedic Surgery',
      languages: 'English',
      description: 'Dr. Williams specializes in joint replacements and sports medicine with minimally invasive techniques.',
      availability: [
        { day: 'Tuesday', slots: ['10:00 AM - 4:00 PM'] },
        { day: 'Friday', slots: ['8:00 AM - 12:00 PM', '1:00 PM - 3:00 PM'] }
      ]
    },
    {
      id: 5,
      name: 'Dr. Amina Patel',
      image: 'https://randomuser.me/api/portraits/women/37.jpg',
      specialty: 'Dermatology',
      experience: '8 years',
      education: 'MD, University of California, San Francisco',
      certifications: 'American Board of Dermatology',
      languages: 'English, Hindi, Gujarati',
      description: 'Dr. Patel offers comprehensive dermatological care including skin cancer screenings and cosmetic procedures.',
      availability: [
        { day: 'Monday', slots: ['1:00 PM - 6:00 PM'] },
        { day: 'Wednesday', slots: ['9:00 AM - 1:00 PM'] },
        { day: 'Thursday', slots: ['2:00 PM - 5:00 PM'] }
      ]
    }
  ];

  const { user } = useAuth(); // Get current user from auth context
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingReason, setBookingReason] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDayChange = (day) => {
    setSelectedDay(day);
    if (selectedDoctor) {
      const selectedDayAvailability = selectedDoctor.availability.find(
        avail => avail.day === day
      );
      setAvailableTimeSlots(selectedDayAvailability ? selectedDayAvailability.slots : []);
      setBookingTime(""); // Reset time when day changes
    }
  };

  const handleBookAppointment = async () => {
    if (bookingDate && bookingTime && bookingReason && selectedDoctor) {
      try {
        setIsLoading(true);
        
        // Create appointment data object with user info
        const appointmentData = {
          patientName: user?.name || "Current User", // Use actual user name if available
          patientId: user?.id || "guest",
          doctorName: selectedDoctor.name,
          doctorId: selectedDoctor.id,
          specialty: selectedDoctor.specialty,
          date: bookingDate,
          time: bookingTime,
          type: "Consultation",
          notes: bookingReason
        };
        
        // Call the API to create the appointment
        const response = await appointmentsApi.create(appointmentData);
        
        if (response.success) {
          alert(`Appointment booked successfully with ${selectedDoctor.name} on ${bookingDate} at ${bookingTime}`);
          setShowBookingModal(false);
          setBookingDate("");
          setBookingTime("");
          setBookingReason("");
          setSelectedDay("");
          setAvailableTimeSlots([]);
        } else {
          alert("Failed to book appointment. Please try again.");
        }
      } catch (error) {
        console.error("Error booking appointment:", error);
        alert("An error occurred while booking the appointment.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Get all unique days from the selected doctor's availability
  const getAvailableDays = () => {
    if (!selectedDoctor) return [];
    return selectedDoctor.availability.map(avail => avail.day);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Our Doctors</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doctors list */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            {doctorsData.map((doctor) => (
              <Card 
                key={doctor.id} 
                className={`cursor-pointer transition-all ${selectedDoctor?.id === doctor.id ? 'ring-2 ring-primary-500' : 'hover:bg-secondary-50 dark:hover:bg-secondary-800'}`}
                onClick={() => setSelectedDoctor(doctor)}
              >
                <div className="flex items-center p-4">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400">{doctor.specialty}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{doctor.experience} experience</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Doctor details */}
        <div className="lg:col-span-2">
          {selectedDoctor ? (
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-start">
                <img 
                  src={selectedDoctor.image} 
                  alt={selectedDoctor.name} 
                  className="w-32 h-32 rounded-full object-cover mb-4 md:mb-0 md:mr-6"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedDoctor.name}</h2>
                  <p className="text-lg text-primary-600 dark:text-primary-400 mb-2">{selectedDoctor.specialty}</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedDoctor.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Details</h3>
                      <div className="space-y-2">
                        <p className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Experience:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedDoctor.experience}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Education:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedDoctor.education}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Languages:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedDoctor.languages}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Certifications</h3>
                      <p className="text-gray-900 dark:text-white">{selectedDoctor.certifications}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Availability</h3>
                    <div className="space-y-3">
                      {selectedDoctor.availability.map((avail, index) => (
                        <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-0">
                          <p className="font-medium text-gray-900 dark:text-white mb-1">{avail.day}</p>
                          <div className="flex flex-wrap gap-2">
                            {avail.slots.map((slot, idx) => (
                              <span 
                                key={idx} 
                                className="inline-block bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs px-2 py-1 rounded"
                              >
                                {slot}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    className="mt-6 w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                    onClick={() => setShowBookingModal(true)}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-6 flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400 text-center">Select a doctor to view details</p>
            </Card>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Book Appointment with {selectedDoctor.name}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Day
                </label>
                <select 
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-secondary-900 text-gray-900 dark:text-white p-2"
                  value={selectedDay}
                  onChange={(e) => handleDayChange(e.target.value)}
                >
                  <option value="">Select a day</option>
                  {getAvailableDays().map((day, index) => (
                    <option key={index} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Time
                </label>
                <select 
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-secondary-900 text-gray-900 dark:text-white p-2"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  disabled={!selectedDay}
                >
                  <option value="">Select a time</option>
                  {availableTimeSlots.map((slot, index) => (
                    <option key={index} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input 
                  type="date" 
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-secondary-900 text-gray-900 dark:text-white p-2"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reason for Visit
                </label>
                <textarea 
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-secondary-900 text-gray-900 dark:text-white p-2"
                  value={bookingReason}
                  onChange={(e) => setBookingReason(e.target.value)}
                  rows="3"
                  placeholder="Brief description of your symptoms or reason for appointment"
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium"
                  onClick={() => setShowBookingModal(false)}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button 
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  onClick={handleBookAppointment}
                  disabled={!bookingDate || !bookingTime || !bookingReason || !selectedDay || isLoading}
                >
                  {isLoading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors; 