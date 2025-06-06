import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className = '', required = false, ...props }) => {
  const baseStyle = "w-full px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-surface-900 dark:text-white";

  if (type === 'textarea') {
    return (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${baseStyle} ${className}`}
        required={required}
        {...props}
      />
    );
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${baseStyle} ${className}`}
      required={required}
      {...props}
    />
  );
};

export default Input;