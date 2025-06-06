import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-surface-800 rounded-xl shadow-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;