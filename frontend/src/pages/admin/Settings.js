import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  ClockIcon, 
  UserGroupIcon,
  BellIcon,
  Cog6ToothIcon,
  TrashIcon,
  CircleStackIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import Alert from '../../components/ui/Alert';

const AdminSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  // Site settings
  const [siteName, setSiteName] = useState("Healthcare Booking System");
  const [siteDescription, setSiteDescription] = useState("Book appointments with healthcare professionals online");
  const [contactEmail, setContactEmail] = useState("support@healthcarebooking.com");
  const [contactPhone, setContactPhone] = useState("1-800-HEALTH");
  
  // System settings
  const [appointmentBuffer, setAppointmentBuffer] = useState(30);
  const [maxAppointmentsPerDay, setMaxAppointmentsPerDay] = useState(8);
  const [allowSameDay, setAllowSameDay] = useState(true);
  const [requireApproval, setRequireApproval] = useState(true);
  
  const handleSaveGeneralSettings = (e) => {
    e.preventDefault();
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };
  
  const handleSaveSystemSettings = (e) => {
    e.preventDefault();
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };
  
  const handleSaveNotificationSettings = (e) => {
    e.preventDefault();
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold text-secondary-900 dark:text-white">
          System Settings
        </h1>
        {showSuccessAlert && (
          <Alert
            variant="success"
            message="Settings saved successfully!"
            onClose={() => setShowSuccessAlert(false)}
          />
        )}
      </div>

      <Card className="space-y-6">
        <div className="flex items-center space-x-2 text-secondary-900 dark:text-white">
          <Cog6ToothIcon className="w-5 h-5" />
          <h2 className="text-xl font-semibold">General Settings</h2>
        </div>

        <form onSubmit={handleSaveGeneralSettings} className="space-y-4">
          <Input
            label="Site Name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            required
          />
          
          <Input
            label="Site Description"
            value={siteDescription}
            onChange={(e) => setSiteDescription(e.target.value)}
            type="textarea"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Contact Email"
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              icon={EnvelopeIcon}
              required
            />
            
            <Input
              label="Contact Phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              icon={PhoneIcon}
            />
          </div>
          
          <Button type="submit">
            Save General Settings
          </Button>
        </form>
      </Card>

      <Card className="space-y-6">
        <div className="flex items-center space-x-2 text-secondary-900 dark:text-white">
          <ClockIcon className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Appointment Settings</h2>
        </div>

        <form onSubmit={handleSaveSystemSettings} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Appointment Buffer (minutes)"
              type="number"
              value={appointmentBuffer}
              onChange={(e) => setAppointmentBuffer(e.target.value)}
              helper="Minimum time between appointments"
              required
            />
            
            <Input
              label="Max Appointments Per Day"
              type="number"
              value={maxAppointmentsPerDay}
              onChange={(e) => setMaxAppointmentsPerDay(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary-600 rounded border-secondary-300 focus:ring-primary-500"
                checked={allowSameDay}
                onChange={(e) => setAllowSameDay(e.target.checked)}
              />
              <span className="text-secondary-700 dark:text-secondary-300">
                Allow Same Day Appointments
              </span>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary-600 rounded border-secondary-300 focus:ring-primary-500"
                checked={requireApproval}
                onChange={(e) => setRequireApproval(e.target.checked)}
              />
              <span className="text-secondary-700 dark:text-secondary-300">
                Require Admin Approval for New Doctors
              </span>
            </label>
          </div>
          
          <Button type="submit">
            Save Appointment Settings
          </Button>
        </form>
      </Card>

      <Card className="space-y-6">
        <div className="flex items-center space-x-2 text-secondary-900 dark:text-white">
          <BellIcon className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Notification Settings</h2>
        </div>

        <form onSubmit={handleSaveNotificationSettings} className="space-y-4">
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary-600 rounded border-secondary-300 focus:ring-primary-500"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
              <div>
                <span className="text-secondary-700 dark:text-secondary-300">
                  Email Notifications
                </span>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">
                  Send email notifications for appointment confirmations, reminders, and updates
                </p>
              </div>
            </label>
            
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-primary-600 rounded border-secondary-300 focus:ring-primary-500"
                checked={smsNotifications}
                onChange={(e) => setSmsNotifications(e.target.checked)}
              />
              <div>
                <span className="text-secondary-700 dark:text-secondary-300">
                  SMS Notifications
                </span>
                <p className="text-sm text-secondary-500 dark:text-secondary-400">
                  Send SMS notifications for appointment reminders (additional charges may apply)
                </p>
              </div>
            </label>
          </div>
          
          <Button type="submit">
            Save Notification Settings
          </Button>
        </form>
      </Card>

      <Card className="space-y-6">
        <div className="flex items-center space-x-2 text-secondary-900 dark:text-white">
          <Cog6ToothIcon className="w-5 h-5" />
          <h2 className="text-xl font-semibold">System Maintenance</h2>
        </div>

        <p className="text-secondary-600 dark:text-secondary-400">
          These actions affect the entire system. Use with caution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <Button
              variant="secondary"
              icon={TrashIcon}
              onClick={() => window.confirm("Are you sure you want to clear all logs? This cannot be undone.")}
              fullWidth
            >
              Clear System Logs
            </Button>
            
            <Button
              variant="secondary"
              icon={CircleStackIcon}
              onClick={() => window.confirm("Are you sure you want to backup the database?")}
              fullWidth
            >
              Backup Database
            </Button>
          </div>
          
          <div className="space-y-4">
            <Button
              variant="secondary"
              icon={ArrowPathIcon}
              onClick={() => window.confirm("Are you sure you want to optimize the database? This may take some time.")}
              fullWidth
            >
              Optimize Database
            </Button>
            
            <Button
              variant="secondary"
              icon={ArrowPathIcon}
              onClick={() => window.confirm("Are you sure you want to reset all settings to default? This cannot be undone.")}
              fullWidth
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminSettings; 