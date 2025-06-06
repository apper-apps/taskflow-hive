import React from 'react';

const Spinner = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: 'h-6 w-6 border-b-2',
    medium: 'h-12 w-12 border-b-2',
    large: 'h-16 w-16 border-b-4',
  };

  return (
    <div className={`animate-spin rounded-full ${sizes[size]} border-primary ${className}`}></div>
  );
};

export default Spinner;