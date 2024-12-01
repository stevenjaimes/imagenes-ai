import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  className?: string;
}

export const TextArea = ({ label, name, className = '', ...props }: TextAreaProps) => {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={4}
        {...props}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 
                 focus:border-transparent outline-none transition-all duration-200 resize-y"
      />
    </div>
  );
};