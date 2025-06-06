import React from 'react';
import Button from '@/components/atoms/Button';

const FilterButton = ({ label, count, onClick, isActive }) => {
  return (
    <Button
      onClick={onClick}
      className={`w-full flex justify-between items-center px-3 py-2 text-left ${
        isActive ? 'bg-primary text-white' : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
      }`}
      variant={isActive ? 'primary' : 'secondary'}
      size="small"
    >
      <span>{label}</span>
      <span className="text-sm">{count}</span>
    </Button>
  );
};

export default FilterButton;