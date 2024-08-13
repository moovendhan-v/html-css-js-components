import React from 'react';
import { FieldProps } from 'formik';
import { useCreateComponentsStore } from '@/store/createComponents/create.components'; // Adjust import path as needed

interface Option {
  value: string;
  label: string;
}

interface MultiSelectFieldProps extends FieldProps {
  options: Option[];
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({ field, form, options }) => {
  const setTags = useCreateComponentsStore((state) => state.setTags);

  // Helper function to handle tag selection/deselection
  const handleChange = (value: string) => {
    // Update Zustand store
    setTags(field.value.includes(value)
      ? field.value.filter((v: string) => v !== value) // Remove tag if already selected
      : [...field.value, value] // Add tag if not selected
    );

    // Update Formik field value
    const newValue = field.value.includes(value)
      ? field.value.filter((v: string) => v !== value)
      : [...field.value, value];

    form.setFieldValue(field.name, newValue);
  };

  return (
    <div>
      {options.map((option) => (
        <div key={option.value}>
          <label>
            <input
              type="checkbox"
              checked={field.value.includes(option.value)}
              onChange={() => handleChange(option.value)}
            />
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default MultiSelectField;
