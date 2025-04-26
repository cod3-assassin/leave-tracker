import { useState } from 'react';

interface CustomDropdownProps {
  selectedValue: number;
  onChange: (value: number) => void;
  options: { value: number; label: string }[];
}

const CustomDropdown = ({ selectedValue, onChange, options }: CustomDropdownProps) => {
  return (
    <div className="relative inline-flex">
      <select
        value={selectedValue}
        onChange={(e) => onChange(Number(e.target.value))}
        className="appearance-none w-32 pl-3 pr-8 py-2 text-sm font-medium text-gray-700 bg-white border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-400 transition-all duration-200"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-white text-gray-800 hover:bg-indigo-50 py-1.5 border-b border-gray-100 last:border-b-0"
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="w-4 h-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.655a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
        </svg>
      </div>
      <style>
        {`
          select {
            height: auto;
          }
          select:focus {
            height: auto;
          }
          option {
            max-height: 6rem;
            overflow-y: auto;
          }
        `}
      </style>
    </div>
  );
};

export default CustomDropdown;