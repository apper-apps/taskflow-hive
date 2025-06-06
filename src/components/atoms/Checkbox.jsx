import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({ checked, onChange, className = '', ...props }) => {
  return (
    <div className={`custom-checkbox ${className}`} {...props}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <div className="checkmark">
        <ApperIcon name="Check" size={12} className="text-white" />
      </div>
    </div>
  );
};

export default Checkbox;