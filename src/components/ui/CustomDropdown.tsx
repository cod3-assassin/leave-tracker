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
          className="appearance-none w-48 pl-4 pr-10 py-2 text-sm sm:text-base font-medium text-gray-800 bg-white border border-transparent rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:shadow-lg"
          style={{
            background: 'linear-gradient(90deg, #f3f4f6, #e5e7eb)',
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
          }}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-gradient-to-r from-white to-gray-50 text-gray-800 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 py-2.5 pl-4 pr-10 border-b border-gray-100 last:border-b-0 transition-colors duration-200"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-indigo-600 transform transition-transform duration-200"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.655a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
          </svg>
        </div>
        <style>{`
          select:focus {
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
          }
          select option {
            padding: 0.75rem 1rem;
          }
          select::-ms-expand {
            display: none;
          }
        `}</style>
      </div>
    );
  };
  
  export default CustomDropdown;