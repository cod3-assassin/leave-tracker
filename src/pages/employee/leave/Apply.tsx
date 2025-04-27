import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiCalendar } from 'react-icons/fi';
import { Card } from '../../../components/ui/Card';

interface LeaveForm {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export default function ApplyLeave() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LeaveForm>({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [errors, setErrors] = useState<Partial<LeaveForm>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const leaveTypes = ['Annual', 'Sick', 'Casual', 'Maternity/Paternity'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<LeaveForm> = {};
    if (!form.leaveType) newErrors.leaveType = 'Leave type is required';
    if (!form.startDate) newErrors.startDate = 'Start date is required';
    if (!form.endDate) newErrors.endDate = 'End date is required';
    if (!form.reason) newErrors.reason = 'Reason is required';
    if (form.startDate && form.endDate && new Date(form.startDate) > new Date(form.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Leave Application:', form);
      toast.success('Leave application submitted successfully!', {
        style: {
          background: 'linear-gradient(to right, #6366f1, #9333ea)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          fontWeight: '600',
          fontSize: window.innerWidth < 640 ? '14px' : '16px',
        },
      });
      setTimeout(() => navigate('/employee/dashboard'), 1000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LeaveForm]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectLeaveType = (type: string) => {
    setForm((prev) => ({ ...prev, leaveType: type }));
    setIsDropdownOpen(false);
    if (errors.leaveType) {
      setErrors((prev) => ({ ...prev, leaveType: '' }));
    }
  };

  return (
    <div className="flex items-start sm:items-center justify-center bg-gradient-to-b from-gray-100 to-indigo-100/50 px-3 sm:px-4 pt-4 sm:pt-6">
      <Card className="bg-white/20 backdrop-blur-[16px] rounded-xl shadow-md p-4 sm:p-5 lg:p-6 w-full max-w-xl lg:max-w-3xl transition-all duration-300">
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          <FiCalendar className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 relative">
            Apply Leave
            <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          <div className="col-span-1 lg:col-span-2">
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
              Leave Type
            </label>
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 border border-gray-300 rounded-md bg-white flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:border-indigo-200"
                aria-expanded={isDropdownOpen}
                aria-haspopup="listbox"
              >
                <span>{form.leaveType || 'Select leave type'}</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto custom-scrollbar">
                  {leaveTypes.map((type) => (
                    <div
                      key={type}
                      onClick={() => handleSelectLeaveType(type)}
                      className="px-3 py-2 text-sm sm:text-base text-gray-800 hover:bg-indigo-50 cursor-pointer transition-colors duration-200"
                      role="option"
                      aria-selected={form.leaveType === type}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.leaveType && <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.leaveType}</p>}
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
            />
            {errors.startDate && <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.startDate}</p>}
          </div>
          <div>
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
            />
            {errors.endDate && <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.endDate}</p>}
          </div>
          <div className="col-span-1 lg:col-span-2">
            <label className="block text-sm sm:text-base font-semibold text-gray-800 mb-1">
              Reason
            </label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 text-sm sm:text-base text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm resize-none"
              placeholder="Enter reason for leave"
            />
            {errors.reason && <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.reason}</p>}
          </div>
          <div className="col-span-1 lg:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base font-semibold shadow-sm hover:shadow-md hover:scale-105"
            >
              Submit Application
            </button>
          </div>
        </form>
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #d1d5db, #6b7280);
            border-radius: 3px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #9ca3af, #4b5563);
          }
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #6b7280 #f1f1f1;
          }
        `}</style>
      </Card>
    </div>
  );
}