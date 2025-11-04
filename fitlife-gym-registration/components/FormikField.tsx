
import React from 'react';
import { Field, ErrorMessage, useField } from 'formik';

interface FormikFieldProps {
  name: string;
  label: string;
  type?: string;
  as?: string;
  placeholder?: string;
  children?: React.ReactNode;
}

export const FormikField: React.FC<FormikFieldProps> = ({ label, ...props }) => {
  const [, meta] = useField(props.name);
  const isError = meta.touched && meta.error;

  return (
    <div className="mb-4">
      <label htmlFor={props.name} className="block text-sm font-medium text-slate-300 mb-1">
        {label}
      </label>
      <Field
        id={props.name}
        className={`w-full p-3 bg-slate-700/50 rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 ${isError ? 'border-red-500' : 'border-slate-600 focus:border-teal-500'}`}
        {...props}
      />
      <ErrorMessage name={props.name} component="div" className="text-red-400 text-xs mt-1" />
    </div>
  );
};
