import React from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const HeaderActionButton = ({ onClick, iconName, label }) => {
  return (
    <Button
      onClick={onClick}
      className="flex items-center space-x-2"
    >
      <ApperIcon name={iconName} size={16} />
      <span className="hidden sm:inline">{label}</span>
    </Button>
  );
};

export default HeaderActionButton;