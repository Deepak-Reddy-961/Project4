import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  HomeIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  Cog6ToothIcon, 
  MoonIcon, 
  SunIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Appointments', href: '/appointments', icon: CalendarIcon },
    { name: 'Doctors', href: '/doctors', icon: UserGroupIcon },
    { name: 'Patients', href: '/patients', icon: UserIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900">
      {/* Header */}
      <header className="bg-white dark:bg-secondary-800 shadow-sm border-b border-secondary-100 dark:border-secondary-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center">
              <h1 className="text-2xl font-display font-bold text-secondary-600 dark:text-white">
                <span className="text-accent-500">Health</span>Care
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-secondary-600 dark:text-secondary-200">
                <PhoneIcon className="w-5 h-5 text-accent-500" />
                <span className="text-sm">1-800-HEALTH</span>
              </div>
              
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link ${
                    location.pathname === item.href ? 'text-accent-500 font-medium' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Dark mode toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <SunIcon className="w-5 h-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-secondary-600" />
                )}
              </button>
              
              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="btn-accent"
              >
                Logout
              </button>
            </nav>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-secondary-600 dark:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                )}
              </svg>
            </button>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-secondary-100 dark:border-secondary-700">
              <div className="pt-4 space-y-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center py-2 text-secondary-600 dark:text-secondary-200 hover:text-accent-500 ${
                        location.pathname === item.href ? 'text-accent-500 font-medium' : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  );
                })}
                
                <div className="pt-4 flex flex-col space-y-3">
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="flex items-center py-2 text-secondary-600 dark:text-secondary-200"
                  >
                    {isDarkMode ? (
                      <SunIcon className="w-5 h-5 mr-3 text-yellow-400" />
                    ) : (
                      <MoonIcon className="w-5 h-5 mr-3" />
                    )}
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </button>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center py-2 text-accent-500"
                  >
                    <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-secondary-800 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">HealthCare</h4>
              <p className="text-secondary-300 mb-4">
                Providing quality healthcare services for you and your family.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Departments</h4>
              <ul className="space-y-2">
                <li><Link to="/doctors" className="footer-link">Cardiology</Link></li>
                <li><Link to="/doctors" className="footer-link">Neurology</Link></li>
                <li><Link to="/doctors" className="footer-link">Orthopedics</Link></li>
                <li><Link to="/doctors" className="footer-link">Pediatrics</Link></li>
                <li><Link to="/doctors" className="footer-link">Dental</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="footer-link">Dashboard</Link></li>
                <li><Link to="/doctors" className="footer-link">Our Doctors</Link></li>
                <li><Link to="/appointments" className="footer-link">Appointments</Link></li>
                <li><Link to="/patients" className="footer-link">Patients</Link></li>
                <li><Link to="/settings" className="footer-link">Settings</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-secondary-300">
                <li className="flex items-start">
                  <span className="inline-block mr-2 mt-1">📍</span>
                  <span>123 Medical Center Dr, Healthcare City, 12345</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block mr-2">📞</span>
                  <span>1-800-HEALTH</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block mr-2">✉️</span>
                  <span>info@healthcare.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-secondary-700 text-center text-secondary-400 text-sm">
            <p>&copy; {new Date().getFullYear()} HealthCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 