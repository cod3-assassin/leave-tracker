import { useMemo, useState, useEffect } from 'react';
import { users, leaveSchedules } from '../../../lib/dummyData';
import { FiChevronLeft, FiChevronRight, FiUmbrella, FiSun, FiCalendar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function EmployeeLeaveCalendar() {
  const [selectedLeave, setSelectedLeave] = useState<{ date: string; type: string } | null>(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const currentUser = users[0]; // Assuming the first user is the current user
  const navigate = useNavigate();

  const dates = useMemo(() => {
    const startDate = new Date('2025-04-01');
    const firstDayOfMonth = startDate.getDay(); // Day of the week for April 1st (0 = Sun, 1 = Mon, etc.)
    const daysInMonth = 30; // April 2025 has 30 days

    // Create an array of dates with empty placeholders for days before the 1st
    const calendarDays = Array.from({ length: firstDayOfMonth }, () => ({
      date: '',
      label: '',
      isWeekend: false,
      isPlaceholder: true,
    }));

    // Add actual days
    for (let i = 0; i < daysInMonth; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      calendarDays.push({
        date: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { day: 'numeric' }),
        isWeekend: date.getDay() === 0 || date.getDay() === 6,
        isPlaceholder: false,
      });
    }

    // Split into weeks (rows of 7 days)
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    return weeks;
  }, []);

  const publicHolidays = ['2025-04-15'];

  const getLeaveInfo = (userId: string, date: string, isWeekend: boolean) => {
    if (!date) return { isOnLeave: false, bgClass: 'bg-gray-100', icon: null };
    if (publicHolidays.includes(date)) {
      return { isOnLeave: true, isPublicHoliday: true, bgClass: 'bg-green-200', icon: <FiSun className="w-3 h-3 text-green-700" /> };
    }
    if (isWeekend) {
      return { isOnLeave: true, isWeekend: true, bgClass: 'bg-yellow-200', icon: <FiCalendar className="w-3 h-3 text-yellow-700" /> };
    }
    const schedule = leaveSchedules.find((schedule) => {
      const start = new Date(schedule.startDate);
      const end = new Date(schedule.endDate);
      const current = new Date(date);
      return schedule.userId === userId && current >= start && current <= end;
    });
    return schedule
      ? { isOnLeave: true, isPersonalLeave: true, bgClass: 'bg-red-200', icon: <FiUmbrella className="w-3 h-3 text-red-700" /> }
      : { isOnLeave: false, bgClass: 'bg-white hover:bg-indigo-50', icon: null };
  };

  const handleDayClick = (date: string, type: string, isOnLeave: boolean) => {
    if (!date) return;
    if (isOnLeave) {
      setSelectedLeave({ date, type: type || 'Personal Leave' });
    } else {
      navigate(`/employee/leave/apply?date=${date}`);
    }
  };

  useEffect(() => {
    if (selectedLeave) {
      console.log('Leave selected:', selectedLeave); // Replace with context or prop to update RecentActivity
    }
  }, [selectedLeave]);

  const visibleWeeks = dates.slice(currentWeek, currentWeek + (window.innerWidth < 640 ? 1 : dates.length));

  return (
    <div className="w-full max-w-full">
      <div className="w-full rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] bg-white border border-gray-200 p-4">
        {/* Navigation for Mobile */}
        <div className="flex items-center justify-between mb-4 sm:hidden">
          <button
            onClick={() => setCurrentWeek((prev) => Math.max(prev - 1, 0))}
            disabled={currentWeek === 0}
            className="p-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-semibold text-gray-800">
            Week {currentWeek + 1} of {dates.length}
          </span>
          <button
            onClick={() => setCurrentWeek((prev) => Math.min(prev + 1, dates.length - 1))}
            disabled={currentWeek === dates.length - 1}
            className="p-1 text-gray-600 hover:text-gray-800 disabled:opacity-50"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="w-full">
          {/* Day Names Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div
                key={day}
                className="p-2 text-center text-xs font-semibold text-gray-800 bg-gradient-to-b from-indigo-50 to-white rounded-t-lg"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Weeks */}
          {visibleWeeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-1">
              {week.map((date, dateIndex) => {
                const { isOnLeave, bgClass, icon, isPublicHoliday, isWeekend, isPersonalLeave } = getLeaveInfo(
                  currentUser.id,
                  date.date,
                  date.isWeekend
                );
                const leaveType = isPublicHoliday ? 'Public Holiday' : isWeekend ? 'Weekend' : isPersonalLeave ? 'Personal Leave' : '';
                return (
                  <div
                    key={date.date || `placeholder-${weekIndex}-${dateIndex}`}
                    className={`p-2 aspect-square flex flex-col items-center justify-center ${bgClass} border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      !date.date ? 'pointer-events-none' : ''
                    }`}
                    onClick={() => handleDayClick(date.date, leaveType, isOnLeave)}
                  >
                    <span className={`text-xs font-medium ${isOnLeave ? 'text-gray-900' : 'text-gray-600'}`}>
                      {date.label}
                    </span>
                    {icon}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}