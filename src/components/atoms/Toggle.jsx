import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Toggle = ({ onToggle, isToggled, iconOn, iconOff, className = '', iconClassName = '', ...props }) => {
  const iconProps = { size: 18, className: `transition-colors ${iconClassName}` };
  
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors ${className}`}
      {...props}
    >
      {isToggled ? (
        <ApperIcon name={iconOn} {...iconProps} />
      ) : (
        <ApperIcon name={iconOff} {...iconProps} />
      )}
    </button>
  );
};

export default Toggle;