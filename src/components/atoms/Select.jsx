import React from 'react';

const Select = ({ children, value, onChange, className = '', required = false, ...props }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-900 dark:text-white ${className}`}
      required={required}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;