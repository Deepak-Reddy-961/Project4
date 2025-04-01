import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartIcon, 
  ClockIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  BriefcaseIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content text-center">
          <h1 className="hero-title">We Care About Your Health</h1>
          <p className="hero-subtitle">Your trusted platform for managing healthcare appointments and connecting with medical professionals.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link to="/register" className="btn-accent">
              Get Started
            </Link>
            <Link to="/login" className="btn-outline bg-transparent border-white text-white hover:bg-white hover:text-secondary-600">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-white dark:bg-secondary-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">About Our Healthcare Platform</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Welcome to HealthCare</h3>
              <p className="text-secondary-600 dark:text-secondary-300 mb-6">
                Our platform provides comprehensive healthcare management services to streamline the connection between patients and healthcare providers. We aim to make quality healthcare accessible to all.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-secondary-600 dark:text-secondary-300">
                    Online appointment scheduling with preferred healthcare providers
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-secondary-600 dark:text-secondary-300">
                    Secure storage of medical records and health information
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-secondary-600 dark:text-secondary-300">
                    Seamless communication with healthcare professionals
                  </p>
                </div>
              </div>
              <Link to="/about" className="btn-accent mt-8 inline-block">
                Learn More
              </Link>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg" 
                alt="Healthcare Professional" 
                className="rounded-lg shadow-medical max-w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-secondary-50 dark:bg-secondary-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Medical Services</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="department-item group">
              <HeartIcon className="w-12 h-12 text-accent-500 mb-4 group-hover:text-white" />
              <h3 className="text-xl font-bold mb-2">Cardiology</h3>
              <p className="text-secondary-600 dark:text-secondary-300 group-hover:text-white">
                Comprehensive heart care and treatment for cardiovascular conditions.
              </p>
            </div>
            <div className="department-item group">
              <BriefcaseIcon className="w-12 h-12 text-accent-500 mb-4 group-hover:text-white" />
              <h3 className="text-xl font-bold mb-2">Dental Care</h3>
              <p className="text-secondary-600 dark:text-secondary-300 group-hover:text-white">
                Complete dental services from routine check-ups to advanced procedures.
              </p>
            </div>
            <div className="department-item group">
              <BeakerIcon className="w-12 h-12 text-accent-500 mb-4 group-hover:text-white" />
              <h3 className="text-xl font-bold mb-2">Laboratory</h3>
              <p className="text-secondary-600 dark:text-secondary-300 group-hover:text-white">
                State-of-the-art diagnostic and testing services for accurate results.
              </p>
            </div>
            <div className="department-item group">
              <ClockIcon className="w-12 h-12 text-accent-500 mb-4 group-hover:text-white" />
              <h3 className="text-xl font-bold mb-2">Emergency</h3>
              <p className="text-secondary-600 dark:text-secondary-300 group-hover:text-white">
                24/7 emergency care services with rapid response for critical situations.
              </p>
            </div>
            <div className="department-item group">
              <UserGroupIcon className="w-12 h-12 text-accent-500 mb-4 group-hover:text-white" />
              <h3 className="text-xl font-bold mb-2">Pediatrics</h3>
              <p className="text-secondary-600 dark:text-secondary-300 group-hover:text-white">
                Specialized healthcare for infants, children, and adolescents.
              </p>
            </div>
            <div className="department-item group">
              <ShieldCheckIcon className="w-12 h-12 text-accent-500 mb-4 group-hover:text-white" />
              <h3 className="text-xl font-bold mb-2">Preventive Care</h3>
              <p className="text-secondary-600 dark:text-secondary-300 group-hover:text-white">
                Preventive health services to maintain wellbeing and detect issues early.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white dark:bg-secondary-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Us</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 items-center">
            <div className="flex justify-center">
              <img 
                src="https://img.freepik.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21202.jpg" 
                alt="Medical Team" 
                className="rounded-lg shadow-medical max-w-full h-auto" 
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Expert Medical Team</h3>
              <p className="text-secondary-600 dark:text-secondary-300 mb-6">
                Our platform connects you with highly qualified medical professionals dedicated to providing excellent healthcare services. With years of experience and specialization in various fields, our doctors ensure that you receive the best possible care.
              </p>
              <Link to="/doctors" className="btn-accent inline-block">
                Meet Our Doctors
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="rounded-full bg-accent-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Easy Appointments</h3>
              <p className="text-center text-secondary-600 dark:text-secondary-300">
                Book appointments with your preferred healthcare providers in just a few clicks.
              </p>
            </div>
            <div className="card">
              <div className="rounded-full bg-accent-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserGroupIcon className="w-8 h-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Track Records</h3>
              <p className="text-center text-secondary-600 dark:text-secondary-300">
                Access your medical history and appointment records anytime, anywhere.
              </p>
            </div>
            <div className="card">
              <div className="rounded-full bg-accent-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-accent-500" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Secure Platform</h3>
              <p className="text-center text-secondary-600 dark:text-secondary-300">
                Your health information is protected with industry-standard security measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary-600 text-white relative">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://img.freepik.com/free-photo/doctor-nurses-special-equipment_23-2148980721.jpg" 
            alt="Medical Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for their healthcare management needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="btn-accent">
              Register Now
            </Link>
            <Link to="/contact" className="btn-outline bg-transparent border-white text-white hover:bg-white hover:text-secondary-600">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 