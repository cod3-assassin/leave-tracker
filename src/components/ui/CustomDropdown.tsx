import { useState, useRef, useEffect } from 'react';

interface CustomDropdownProps {
  selectedValue: number;
  onChange: (value: number) => void;
  options: { value: number; label: string }[];
}

const CustomDropdown = ({ selectedValue, onChange, options }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  // Track dropdown open/close state
  useEffect(() => {
    const handleFocus = () => setIsOpen(true);
    const handleBlur = () => setIsOpen(false);
    const select = selectRef.current;
    if (select) {
      select.addEventListener('focus', handleFocus);
      select.addEventListener('blur', handleBlur);
    }
    return () => {
      if (select) {
        select.removeEventListener('focus', handleFocus);
        select.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  return (
    <div className="relative inline-flex w-36 sm:w-40">
      <select
        ref={selectRef}
        value={selectedValue}
        onChange={(e) => onChange(Number(e.target.value))}
        className="appearance-none w-full pl-4 pr-10 py-2 text-sm sm:text-base font-medium text-gray-800 bg-white/20 backdrop-blur-[16px] border border-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:shadow-lg"
        style={{
          maxHeight: '10rem', // Approx. 5 options (2rem each)
          overflowY: 'auto',
        }}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-white text-gray-800 hover:bg-indigo-50 py-2 pl-4 pr-10 text-sm sm:text-base transition-colors duration-200"
            style={{ minHeight: '2rem' }}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className={`w-5 h-5 text-indigo-600 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.655a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
        </svg>
      </div>
      <style>{`
        select::-webkit-scrollbar {
          width: 6px;
        }
        select::-webkit-scrollbar-track {
          background: transparent;
        }
        select::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.5);
          border-radius: 3px;
        }
        select::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.7);
        }
        select:focus {
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
        }
        select option {
          padding: 0.5rem 1rem;
        }
        select::-ms-expand {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CustomDropdown;