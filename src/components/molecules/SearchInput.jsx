import React from 'react';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';
import Card from '@/components/atoms/Card';

const SearchInput = ({ value, onChange, placeholder = 'Search tasks...' }) => {
  return (
    <Card className="p-4">
      <div className="relative">
        <ApperIcon name="Search" size={18} className="absolute left-3 top-3 text-surface-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pl-10 pr-4"
        />
      </div>
    </Card>
  );
};

export default SearchInput;