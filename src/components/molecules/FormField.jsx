import React from 'react';
import Label from '@/components/atoms/Label';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';

const FormField = ({ label, type = 'text', value, onChange, placeholder, required = false, options = [], rows, ...props }) => {
  const inputProps = { value, onChange, placeholder, required, ...props };
  const labelText = label + (required ? ' *' : '');

  return (
    <div>
      <Label>{labelText}</Label>
      {type === 'select' ? (
        <Select {...inputProps}>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : type === 'textarea' ? (
        <Input type="textarea" rows={rows} {...inputProps} />
      ) : (
        <Input type={type} {...inputProps} />
      )}
    </div>
  );
};

export default FormField;