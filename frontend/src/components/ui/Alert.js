import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const variants = {
  success: {
    icon: CheckCircleIcon,
    bg: 'bg-green-100 dark:bg-green-900/20',
    text: 'text-green-800 dark:text-green-400',
    border: 'border-green-400 dark:border-green-500',
  },
  error: {
    icon: XCircleIcon,
    bg: 'bg-red-100 dark:bg-red-900/20',
    text: 'text-red-800 dark:text-red-400',
    border: 'border-red-400 dark:border-red-500',
  },
  warning: {
    icon: ExclamationTriangleIcon,
    bg: 'bg-yellow-100 dark:bg-yellow-900/20',
    text: 'text-yellow-800 dark:text-yellow-400',
    border: 'border-yellow-400 dark:border-yellow-500',
  },
  info: {
    icon: InformationCircleIcon,
    bg: 'bg-blue-100 dark:bg-blue-900/20',
    text: 'text-blue-800 dark:text-blue-400',
    border: 'border-blue-400 dark:border-blue-500',
  },
};

const Alert = ({
  variant = 'info',
  message,
  description,
  onClose,
  className = '',
  show = true,
}) => {
  const style = variants[variant];
  const Icon = style.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`
            rounded-lg border ${style.bg} ${style.border} p-4
            ${className}
          `}
          role="alert"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <Icon className={`h-5 w-5 ${style.text}`} />
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${style.text}`}>
                {message}
              </p>
              {description && (
                <p className={`mt-2 text-sm ${style.text} opacity-90`}>
                  {description}
                </p>
              )}
            </div>
            {onClose && (
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    onClick={onClose}
                    className={`
                      inline-flex rounded-md p-1.5
                      ${style.bg} ${style.text}
                      hover:opacity-80
                      focus:outline-none focus:ring-2 focus:ring-offset-2
                      focus:ring-offset-${variant}-50 focus:ring-${variant}-600
                    `}
                  >
                    <span className="sr-only">Dismiss</span>
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert; 