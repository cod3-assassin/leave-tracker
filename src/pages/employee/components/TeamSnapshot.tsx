import { useNavigate } from 'react-router-dom';
import { User } from '../../../lib/dummyData';
import React, { useMemo } from 'react';
import { ScrollableCard } from '../../../components/ui/ScrollableCard';

interface TeamSnapshotProps {
  colleagues: User[];
  selectedMonth: number;
}

const daysInMonth = (month: number, year: number) => new Date(year, month, 0).getDate();
const getDayName = (day: number) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][day];

// Generate statuses for each day, memoized by month and year
const generateStatuses = (days: number) => {
  const statuses = ['working', 'leave', 'holiday', 'empty'];
  return Array.from({ length: days }, () =>
    statuses[Math.floor(Math.random() * statuses.length)]
  );
};

export default function TeamSnapshot({ colleagues, selectedMonth }: TeamSnapshotProps) {
  const navigate = useNavigate();
  const year = new Date().getFullYear();
  const days = daysInMonth(selectedMonth, year);
  const today = new Date(); // Current date: April 27, 2025

  // Memoize statuses for the current month
  const statuses = useMemo(() => generateStatuses(days), [selectedMonth, year]);

  const generateDaySquares = () => {
    const squares = [];
    for (let day = 1; day <= days; day++) {
      const status = statuses[day - 1];
      const colorClass =
        status === 'working'
          ? 'border-green-400'
          : status === 'leave'
          ? 'border-orange-400'
          : status === 'holiday'
          ? 'border-red-400'
          : 'border-gray-300';
      const isToday =
        day === today.getDate() &&
        selectedMonth === today.getMonth() + 1 &&
        year === today.getFullYear();

      squares.push(
        <div
          key={day}
          className={`w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center border ${colorClass} rounded-[4px] text-[6px] sm:text-[7px] text-gray-500 hover:bg-gray-100 transition ${
            'max-[639px]:w-[calc(100%/15)] max-[639px]:h-[calc(100%/15)]'
          } ${
            isToday ? 'relative after:content-[""] after:absolute after:w-1 sm:after:w-1.5 after:h-1 sm:after:h-1.5 after:bg-green-500 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2' : ''
          }`}
          title={`Day ${day}: ${status}`}
          style={{ minWidth: '16px', minHeight: '16px' }}
        >
          {getDayName(new Date(year, selectedMonth - 1, day).getDay())}
        </div>
      );
    }
    return squares;
  };

  // Split days into rows for mobile: 15 days per line, third line for 31st day
  const getRows = () => {
    const allSquares = generateDaySquares();
    const firstRow = allSquares.slice(0, 15); // Days 1-15
    const secondRow = allSquares.slice(15, 30); // Days 16-30
    const thirdRow = allSquares.slice(30); // Day 31 (if exists)
    return { firstRow, secondRow, thirdRow };
  };

  const { firstRow, secondRow, thirdRow } = getRows();

  return (
    <ScrollableCard className="w-full" maxHeight="max-h-[340px]">
      <div className="divide-y divide-gray-200">
        {colleagues.length > 0 ? (
          colleagues.map((colleague) => (
            <div
              key={colleague.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 py-4 hover:bg-indigo-50 px-2 sm:px-4 rounded-lg transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/employee/colleagues/${colleague.id}`)}
            >
              {/* Profile */}
              <div className="flex items-center gap-3 sm:w-48">
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={colleague.avatar || '/default-avatar.png'}
                    alt={colleague.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{colleague.name}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500">{colleague.role || 'Employee'}</span>
                </div>
              </div>

              {/* Days - Single line on desktop, three lines on mobile */}
              <div className="flex-1 w-full">
                <div className="hidden sm:flex flex-wrap gap-[2px] w-full">
                  {generateDaySquares().map((square, index) => (
                    <React.Fragment key={index}>
                      {square}
                      {(index + 1) % 7 === 0 && index < days - 1 && <div className="w-px h-5 bg-gray-300 mx-1" />}
                    </React.Fragment>
                  ))}
                </div>
                <div className="flex sm:hidden flex-col gap-1 w-full max-w-full">
                  {/* First Row: Days 1-15 */}
                  <div className="flex flex-nowrap gap-[2px] w-full">
                    {firstRow.map((square, index) => (
                      <React.Fragment key={index}>
                        {square}
                        {(index + 1) % 7 === 0 && index < firstRow.length - 1 && <div className="w-px h-[calc(100%/15)] bg-gray-300 mx-1" />}
                      </React.Fragment>
                    ))}
                  </div>
                  {/* Second Row: Days 16-30 */}
                  <div className="flex flex-nowrap gap-[2px] w-full">
                    {secondRow.map((square, index) => (
                      <React.Fragment key={index}>
                        {square}
                        {(index + 1) % 7 === 0 && index < secondRow.length - 1 && <div className="w-px h-[calc(100%/15)] bg-gray-300 mx-1" />}
                      </React.Fragment>
                    ))}
                  </div>
                  {/* Third Row: Day 31 (if exists) */}
                  {thirdRow.length > 0 && (
                    <div className="flex flex-nowrap gap-[2px] w-full">
                      {thirdRow.map((square, index) => (
                        <React.Fragment key={index}>
                          {square}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-[10px] text-gray-500 py-6">No team members found.</p>
        )}
        {colleagues.length > 5 && (
          <div className="text-center py-3">
            <button
              onClick={() => navigate('/employee/team')}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </ScrollableCard>
  );
}