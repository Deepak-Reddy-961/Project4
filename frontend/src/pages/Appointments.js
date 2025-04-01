import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import { appointmentsApi } from '../services/api';

const Appointments = () => {
  // Sample appointment data
  const sampleAppointmentsData = [
    {
      id: 1,
      patientName: 'John Smith',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2023-09-15',
      time: '10:00 AM',
      status: 'Completed',
      type: 'Check-up',
      notes: 'Patient reported chest pain. EKG performed, results normal. Follow-up in 3 months.'
    },
    {
      id: 2,
      patientName: 'Maria Garcia',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Neurology',
      date: '2023-09-17',
      time: '11:30 AM',
      status: 'Scheduled',
      type: 'Consultation',
      notes: 'Initial consultation for recurring headaches.'
    },
    {
      id: 3,
      patientName: 'Robert Johnson',
      doctorName: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      date: '2023-09-18',
      time: '9:15 AM',
      status: 'Scheduled',
      type: 'Vaccination',
      notes: 'Scheduled for routine vaccinations.'
    },
    {
      id: 4,
      patientName: 'Linda Williams',
      doctorName: 'Dr. Robert Williams',
      specialty: 'Orthopedic Surgery',
      date: '2023-09-10',
      time: '2:00 PM',
      status: 'Completed',
      type: 'Follow-up',
      notes: 'Post-surgery follow-up. Recovery progressing well.'
    },
    {
      id: 5,
      patientName: 'James Wilson',
      doctorName: 'Dr. Amina Patel',
      specialty: 'Dermatology',
      date: '2023-09-20',
      time: '3:45 PM',
      status: 'Scheduled',
      type: 'Consultation',
      notes: 'Consultation for skin rash and allergic reactions.'
    },
    {
      id: 6,
      patientName: 'Emma Davis',
      doctorName: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      date: '2023-09-12',
      time: '11:00 AM',
      status: 'Cancelled',
      type: 'Check-up',
      notes: 'Patient cancelled due to scheduling conflict.'
    },
    {
      id: 7,
      patientName: 'Michael Brown',
      doctorName: 'Dr. Michael Chen',
      specialty: 'Neurology',
      date: '2023-09-22',
      time: '10:15 AM',
      status: 'Scheduled',
      type: 'Procedure',
      notes: 'Scheduled for nerve conduction study.'
    }
  ];

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch appointments
  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      // Get appointments from API (localStorage + mock data)
      const response = await appointmentsApi.getAll();
      
      if (response.success && response.data && response.data.length > 0) {
        // If we have stored appointments, use them
        setAppointmentsList([...sampleAppointmentsData, ...response.data]);
      } else {
        // Otherwise, use sample data
        setAppointmentsList(sampleAppointmentsData);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointmentsList(sampleAppointmentsData);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);
  
  // Setup localStorage listener for real-time updates
  useEffect(() => {
    // Function to handle storage events
    const handleStorageChange = (e) => {
      if (e.key === 'healthcare_appointments') {
        // If the appointments in localStorage changed, refresh our list
        fetchAppointments();
      }
    };
    
    // Function to handle custom appointment created event
    const handleAppointmentCreated = (e) => {
      // Refresh appointments when a new one is created
      fetchAppointments();
      
      // Show a notification
      const appointment = e.detail.appointment;
      const notificationMessage = `New appointment booked with ${appointment.doctorName} on ${appointment.date} at ${appointment.time}`;
      
      // Use the browser's notification API if available, otherwise use an alert
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('New Appointment', { body: notificationMessage });
      } else {
        // Optional: Show a toast or in-app notification instead
        console.info('New appointment notification:', notificationMessage);
      }
    };
    
    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('appointmentCreated', handleAppointmentCreated);
    
    // Cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('appointmentCreated', handleAppointmentCreated);
    };
  }, []);
  
  // Poll for updates every 30 seconds (as a backup)
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchAppointments();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Filter appointments based on status
  const filteredAppointments = filterStatus === 'All' 
    ? appointmentsList 
    : appointmentsList.filter(apt => apt.status === filterStatus);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleReschedule = async () => {
    if (rescheduleDate && rescheduleTime && selectedAppointment) {
      try {
        setIsLoading(true);
        
        // Prepare updated appointment data
        const updatedData = {
          date: rescheduleDate,
          time: rescheduleTime
        };
        
        // In a real app, this would make an API call to update the appointment
        // Here we'll just update the local state
        const updatedAppointments = appointmentsList.map(apt => {
          if (apt.id === selectedAppointment.id) {
            return {
              ...apt,
              ...updatedData
            };
          }
          return apt;
        });
        
        setAppointmentsList(updatedAppointments);
        setSelectedAppointment({
          ...selectedAppointment,
          ...updatedData
        });
        setShowRescheduleModal(false);
        setRescheduleDate("");
        setRescheduleTime("");
        
        alert("Appointment rescheduled successfully!");
      } catch (error) {
        console.error("Error rescheduling appointment:", error);
        alert("Failed to reschedule appointment. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = async () => {
    if (selectedAppointment) {
      if (window.confirm("Are you sure you want to cancel this appointment?")) {
        try {
          setIsLoading(true);
          
          // In a real app, this would make an API call to cancel the appointment
          const updatedAppointments = appointmentsList.map(apt => {
            if (apt.id === selectedAppointment.id) {
              return {
                ...apt,
                status: 'Cancelled'
              };
            }
            return apt;
          });
          
          setAppointmentsList(updatedAppointments);
          setSelectedAppointment({
            ...selectedAppointment,
            status: 'Cancelled'
          });
          
          alert("Appointment cancelled successfully!");
        } catch (error) {
          console.error("Error canceling appointment:", error);
          alert("Failed to cancel appointment. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>
        <div className="flex space-x-2">
          <button 
            className={`px-3 py-1 text-sm rounded-md ${filterStatus === 'All' ? 'bg-primary-600 text-white' : 'bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300'}`}
            onClick={() => setFilterStatus('All')}
          >
            All
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${filterStatus === 'Scheduled' ? 'bg-primary-600 text-white' : 'bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300'}`}
            onClick={() => setFilterStatus('Scheduled')}
          >
            Scheduled
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${filterStatus === 'Completed' ? 'bg-primary-600 text-white' : 'bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300'}`}
            onClick={() => setFilterStatus('Completed')}
          >
            Completed
          </button>
          <button 
            className={`px-3 py-1 text-sm rounded-md ${filterStatus === 'Cancelled' ? 'bg-primary-600 text-white' : 'bg-secondary-100 text-secondary-700 dark:bg-secondary-800 dark:text-secondary-300'}`}
            onClick={() => setFilterStatus('Cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointments list */}
          <div className="lg:col-span-2">
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary-50 dark:bg-secondary-800 border-b border-secondary-200 dark:border-secondary-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">Doctor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-200 dark:divide-secondary-700">
                    {filteredAppointments.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-secondary-500 dark:text-secondary-400">
                          No appointments found
                        </td>
                      </tr>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <tr 
                          key={appointment.id} 
                          className={`hover:bg-secondary-50 dark:hover:bg-secondary-800 cursor-pointer ${selectedAppointment?.id === appointment.id ? 'bg-primary-50 dark:bg-primary-900/10' : ''}`}
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{appointment.patientName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{appointment.doctorName}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{appointment.specialty}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{appointment.date}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{appointment.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{appointment.type}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                              {appointment.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Appointment details */}
          <div className="lg:col-span-1">
            <Card className="p-6 h-full">
              {selectedAppointment ? (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Appointment Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Patient</h3>
                      <p className="mt-1 text-gray-900 dark:text-white">{selectedAppointment.patientName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Doctor</h3>
                      <p className="mt-1 text-gray-900 dark:text-white">{selectedAppointment.doctorName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{selectedAppointment.specialty}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</h3>
                        <p className="mt-1 text-gray-900 dark:text-white">{selectedAppointment.date}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</h3>
                        <p className="mt-1 text-gray-900 dark:text-white">{selectedAppointment.time}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</h3>
                      <p className="mt-1 text-gray-900 dark:text-white">{selectedAppointment.type}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h3>
                      <p className="mt-1">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                          {selectedAppointment.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Notes</h3>
                      <p className="mt-1 text-gray-900 dark:text-white">{selectedAppointment.notes}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3">
                    {selectedAppointment.status === 'Scheduled' && (
                      <>
                        <button 
                          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                          onClick={() => setShowRescheduleModal(true)}
                        >
                          Reschedule
                        </button>
                        <button 
                          className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/30 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {selectedAppointment.status === 'Completed' && (
                      <button className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/30 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                        View Report
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-center">Select an appointment to view details</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-secondary-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Reschedule Appointment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Date</label>
                <input 
                  type="date" 
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-secondary-900 text-gray-900 dark:text-white p-2"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Time</label>
                <input 
                  type="time" 
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-secondary-900 text-gray-900 dark:text-white p-2"
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 rounded-md text-sm font-medium"
                  onClick={() => setShowRescheduleModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  onClick={handleReschedule}
                  disabled={!rescheduleDate || !rescheduleTime}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments; 