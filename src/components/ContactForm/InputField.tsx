import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  className?: string;
}

export const InputField = ({ label, name, className = '', ...props }: InputFieldProps) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...props}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 
                 focus:border-transparent outline-none transition-all duration-200"
      />
    </div>
  );
};