import React, { useState } from 'react';
import Card from '../components/ui/Card';

const Patients = () => {
  // Sample patient data
  const patientsData = [
    {
      id: 1,
      name: 'John Smith',
      age: 45,
      gender: 'Male',
      contact: '(555) 123-4567',
      email: 'john.smith@example.com',
      address: '123 Main St, Anytown, CA 12345',
      bloodType: 'O+',
      registeredDate: '2020-03-15',
      recentVisit: '2023-09-15',
      medicalHistory: [
        { condition: 'Hypertension', diagnosedDate: '2018-06-10', status: 'Ongoing' },
        { condition: 'Type 2 Diabetes', diagnosedDate: '2019-11-22', status: 'Ongoing' }
      ],
      upcomingAppointments: [
        { id: 101, doctorName: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2023-10-20', time: '10:00 AM' }
      ],
      medication: [
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Daily', startDate: '2018-06-15' },
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2019-11-25' }
      ]
    },
    {
      id: 2,
      name: 'Maria Garcia',
      age: 32,
      gender: 'Female',
      contact: '(555) 234-5678',
      email: 'maria.garcia@example.com',
      address: '456 Oak Ave, Anytown, CA 12345',
      bloodType: 'A-',
      registeredDate: '2021-01-10',
      recentVisit: '2023-09-17',
      medicalHistory: [
        { condition: 'Migraine', diagnosedDate: '2019-03-12', status: 'Ongoing' },
        { condition: 'Allergic Rhinitis', diagnosedDate: '2020-05-18', status: 'Seasonal' }
      ],
      upcomingAppointments: [
        { id: 102, doctorName: 'Dr. Michael Chen', specialty: 'Neurology', date: '2023-09-28', time: '11:30 AM' }
      ],
      medication: [
        { name: 'Sumatriptan', dosage: '50mg', frequency: 'As needed', startDate: '2019-03-20' },
        { name: 'Loratadine', dosage: '10mg', frequency: 'Daily', startDate: '2020-05-20' }
      ]
    },
    {
      id: 3,
      name: 'Robert Johnson',
      age: 7,
      gender: 'Male',
      contact: '(555) 345-6789',
      email: 'r.johnson.parent@example.com',
      address: '789 Pine St, Anytown, CA 12345',
      bloodType: 'B+',
      registeredDate: '2022-02-05',
      recentVisit: '2023-09-18',
      medicalHistory: [
        { condition: 'Asthma', diagnosedDate: '2022-02-10', status: 'Ongoing' }
      ],
      upcomingAppointments: [
        { id: 103, doctorName: 'Dr. Emily Rodriguez', specialty: 'Pediatrics', date: '2023-10-05', time: '9:15 AM' }
      ],
      medication: [
        { name: 'Albuterol', dosage: '2.5mg', frequency: 'As needed', startDate: '2022-02-12' }
      ]
    },
    {
      id: 4,
      name: 'Linda Williams',
      age: 58,
      gender: 'Female',
      contact: '(555) 456-7890',
      email: 'linda.williams@example.com',
      address: '101 Maple Dr, Anytown, CA 12345',
      bloodType: 'AB+',
      registeredDate: '2019-07-20',
      recentVisit: '2023-09-10',
      medicalHistory: [
        { condition: 'Osteoarthritis', diagnosedDate: '2019-08-15', status: 'Ongoing' },
        { condition: 'Knee Replacement Surgery', diagnosedDate: '2023-08-01', status: 'Recovery' }
      ],
      upcomingAppointments: [
        { id: 104, doctorName: 'Dr. Robert Williams', specialty: 'Orthopedic Surgery', date: '2023-09-25', time: '2:00 PM' }
      ],
      medication: [
        { name: 'Acetaminophen', dosage: '500mg', frequency: 'As needed', startDate: '2023-08-02' },
        { name: 'Meloxicam', dosage: '15mg', frequency: 'Daily', startDate: '2019-08-20' }
      ]
    },
    {
      id: 5,
      name: 'James Wilson',
      age: 41,
      gender: 'Male',
      contact: '(555) 567-8901',
      email: 'james.wilson@example.com',
      address: '222 Elm St, Anytown, CA 12345',
      bloodType: 'A+',
      registeredDate: '2021-05-10',
      recentVisit: '2023-09-20',
      medicalHistory: [
        { condition: 'Eczema', diagnosedDate: '2021-05-15', status: 'Ongoing' },
        { condition: 'Contact Dermatitis', diagnosedDate: '2022-07-10', status: 'Resolved' }
      ],
      upcomingAppointments: [
        { id: 105, doctorName: 'Dr. Amina Patel', specialty: 'Dermatology', date: '2023-10-02', time: '3:45 PM' }
      ],
      medication: [
        { name: 'Hydrocortisone Cream', dosage: '1%', frequency: 'Twice daily', startDate: '2021-05-17' }
      ]
    }
  ];

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter patients based on search term
  const filteredPatients = patientsData.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patients</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients..."
            className="px-4 py-2 pl-10 border border-secondary-300 dark:border-secondary-700 rounded-lg bg-white dark:bg-secondary-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-500 dark:text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patients list */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
              {filteredPatients.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No patients found
                </div>
              ) : (
                <ul className="divide-y divide-secondary-200 dark:divide-secondary-700">
                  {filteredPatients.map((patient) => (
                    <li
                      key={patient.id}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedPatient?.id === patient.id
                          ? 'bg-primary-50 dark:bg-primary-900/10'
                          : 'hover:bg-secondary-50 dark:hover:bg-secondary-800'
                      }`}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mr-3">
                          <span className="text-primary-700 dark:text-primary-300 font-semibold">
                            {patient.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{patient.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {patient.age} years • {patient.gender}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Card>
        </div>

        {/* Patient details */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <div className="space-y-6">
              {/* Basic information */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedPatient.name}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedPatient.age} years • {selectedPatient.gender} • Blood Type: {selectedPatient.bloodType}
                    </p>
                  </div>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm transition-colors duration-200">
                    Edit Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      <p className="flex items-start">
                        <span className="text-gray-500 dark:text-gray-400 w-20">Email:</span>
                        <span className="text-gray-900 dark:text-white">{selectedPatient.email}</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-gray-500 dark:text-gray-400 w-20">Phone:</span>
                        <span className="text-gray-900 dark:text-white">{selectedPatient.contact}</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-gray-500 dark:text-gray-400 w-20">Address:</span>
                        <span className="text-gray-900 dark:text-white">{selectedPatient.address}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                      Patient History
                    </h3>
                    <div className="space-y-2">
                      <p className="flex items-start">
                        <span className="text-gray-500 dark:text-gray-400 w-40">Registered Date:</span>
                        <span className="text-gray-900 dark:text-white">{selectedPatient.registeredDate}</span>
                      </p>
                      <p className="flex items-start">
                        <span className="text-gray-500 dark:text-gray-400 w-40">Recent Visit:</span>
                        <span className="text-gray-900 dark:text-white">{selectedPatient.recentVisit}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Medical History */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Medical History</h3>
                {selectedPatient.medicalHistory.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No medical history recorded</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
                      <thead className="bg-secondary-50 dark:bg-secondary-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                            Condition
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                            Diagnosed Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-secondary-900 divide-y divide-secondary-200 dark:divide-secondary-700">
                        {selectedPatient.medicalHistory.map((history, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {history.condition}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {history.diagnosedDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${
                                  history.status === 'Ongoing'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                    : history.status === 'Resolved'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                    : history.status === 'Recovery'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                                }`}
                              >
                                {history.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>

              {/* Medication */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Medication</h3>
                {selectedPatient.medication.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No medication prescribed</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-secondary-200 dark:divide-secondary-700">
                      <thead className="bg-secondary-50 dark:bg-secondary-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                            Medication
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                            Dosage
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                            Frequency
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 dark:text-secondary-400 uppercase tracking-wider">
                            Start Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-secondary-900 divide-y divide-secondary-200 dark:divide-secondary-700">
                        {selectedPatient.medication.map((med, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {med.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {med.dosage}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {med.frequency}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                              {med.startDate}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>

              {/* Upcoming Appointments */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Appointments</h3>
                {selectedPatient.upcomingAppointments.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No upcoming appointments</p>
                ) : (
                  <div className="space-y-3">
                    {selectedPatient.upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="border border-secondary-200 dark:border-secondary-700 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">{appointment.doctorName}</h4>
                            <p className="text-sm text-primary-600 dark:text-primary-400">
                              {appointment.specialty}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {appointment.date} • {appointment.time}
                            </p>
                          </div>
                          <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
                            Reschedule
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          ) : (
            <Card className="p-6 flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400 text-center">Select a patient to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Patients; 