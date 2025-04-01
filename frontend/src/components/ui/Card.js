import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick = null,
  animate = true 
}) => {
  const baseClasses = 'card';
  const hoverClasses = hover ? 'hover:scale-105 cursor-pointer' : '';
  const combinedClasses = `${baseClasses} ${hoverClasses} ${className}`.trim();

  if (!animate) {
    return (
      <div 
        className={combinedClasses}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={combinedClasses}
      onClick={onClick}
      whileHover={hover ? { scale: 1.05 } : {}}
      whileTap={hover ? { scale: 0.95 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default Card; 