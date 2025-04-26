import { useAuth } from '../../context/AuthContext';
import { leaveBalances, leaveRequests, users, hrActivities } from '../../lib/dummyData';
import LeaveBalanceCard from './components/LeaveBalanceCard';
import TeamSnapshot from './components/TeamSnapshot';
import LeaveRequestTable from './components/LeaveRequestTable';
import EmployeeLeaveCalendar from './components/EmployeeLeaveCalendar';
import RecentActivity from './components/RecentActivity';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiClock, FiUsers } from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import CustomDropdown from '../../components/ui/CustomDropdown';
import { months } from '../../lib/dummyData';
import { useState } from 'react';

// Mock Maternity Leave if not in dummyData
const updatedLeaveBalances = [
  ...leaveBalances,
  { type: 'Maternity Leave', balance: 60, total: 90 },
];

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const colleagues = users.filter((u) => u.id !== user?.id);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedLeave, setSelectedLeave] = useState<{ date: string; type: string } | null>(null);

  // Pie Chart Data
  const pieData = {
    labels: ['Remaining', 'Used'],
    datasets: [
      {
        data: [
          updatedLeaveBalances.reduce((sum, b) => sum + b.balance, 0),
          updatedLeaveBalances.reduce((sum, b) => sum + (b.total - b.balance), 0),
        ],
        backgroundColor: ['#3b82f6', '#f97316'],
        borderWidth: 0,
        hoverOffset: 20,
      },
    ],
  };

  // Bar Chart Data
  const barData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'This Week',
        data: [2, 1, 3, 0, 2],
        backgroundColor: '#3b82f6',
        borderRadius: 4,
      },
      {
        label: 'Last Week',
        data: [1, 2, 1, 1, 3],
        backgroundColor: '#93c5fd',
        borderRadius: 4,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#1f2937', font: { size: 12 } } },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#1f2937', font: { size: 12 } } },
      tooltip: {
        backgroundColor: '#1f2937',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#3b82f6',
        borderWidth: 1,
      },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#6b7280', stepSize: 1 } },
      x: { ticks: { color: '#6b7280' } },
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      <div className="flex flex-col gap-4 sm:gap-6">
        {/* Row 1: Leave Balances */}
        <div className="bg-white/20 backdrop-blur-[16px] rounded-xl p-3 sm:p-5 shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <FiClock className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
            <h2 className="text-sm sm:text-base font-semibold text-gray-800">Leave Balances</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {updatedLeaveBalances.map((balance) => (
              <LeaveBalanceCard key={balance.type} balance={balance} />
            ))}
          </div>
        </div>

        {/* Row 2: Charts */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          {/* Leave Breakdown */}
          <div className="flex-1 bg-white/20 backdrop-blur-[16px] rounded-xl p-3 sm:p-4 shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <FiClock className="text-gray-700 w-5 h-5" />
              <h2 className="text-sm sm:text-base font-semibold text-gray-800">Leave Breakdown</h2>
            </div>
            <div className="h-32 sm:h-48">
              <Pie data={pieData} options={pieOptions} />
            </div>
            <button
              onClick={() => navigate('/employee/leave/apply')}
              className="mt-2 sm:mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-xs sm:text-sm"
            >
              Apply Leave
            </button>
          </div>

          {/* Timings */}
          <div className="flex-1 bg-white/20 backdrop-blur-[16px] rounded-xl p-3 sm:p-4 shadow-md transition-all duration-300">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <FiClock className="text-gray-700 w-5 h-5" />
              <h2 className="text-sm sm:text-base font-semibold text-gray-800">Timings</h2>
            </div>
            <div className="h-32 sm:h-48">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>

        {/* Row 3: Leave Requests + Recent Activity */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 h-fit max-[h-fit]">
          {/* Leave Requests (60%) */}
          <div className="flex-[3] bg-white/20 backdrop-blur-[16px] rounded-xl p-3 sm:p-4 shadow-md transition-all duration-300 flex flex-col">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <FiCalendar className="text-gray-700 w-5 h-5" />
              <h2 className="text-sm sm:text-base font-semibold text-gray-800">Recent Leave Requests</h2>
            </div>
            <div className="flex-1 h-fit">
              <LeaveRequestTable requests={leaveRequests} />
            </div>
          </div>

          {/* Recent Activity (40%) */}
          <div className="flex-[2] bg-white/20 backdrop-blur-[16px] rounded-xl p-3 sm:p-4 shadow-md transition-all duration-300">
            <RecentActivity activities={hrActivities} selectedLeave={selectedLeave} />
          </div>
        </div>

        {/* Row 4: Employee Leave Calendar */}
        <div className="bg-white/20 backdrop-blur-[16px] rounded-xl p-3 sm:p-4 shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <FiCalendar className="text-gray-700 w-5 h-5" />
            <h2 className="text-sm sm:text-base font-semibold text-gray-800">Employee Leave Calendar</h2>
          </div>
          <EmployeeLeaveCalendar />
        </div>

        {/* Row 5: Team Snapshot */}
        <div className="bg-white/20 backdrop-blur-[16px] rounded-xl p-2 sm:p-4 shadow-md transition-all duration-300 relative">
          <div className="flex items-center justify-between mb-2 sm:mb-3 w-full">
            <div className="flex items-center gap-2">
              <FiUsers className="text-gray-700 w-5 h-5" />
              <h2 className="text-sm sm:text-base font-semibold text-gray-800">Our Team</h2>
            </div>
            <div className="absolute top-2 right-2 sm:static sm:right-auto">
              <CustomDropdown
                selectedValue={selectedMonth}
                onChange={setSelectedMonth}
                options={months.map((month, idx) => ({ value: idx + 1, label: month }))}
              />
            </div>
          </div>
          <div className="max-h-[200px] sm:max-h-[300px] md:max-h-[400px] overflow-y-auto w-full">
            <TeamSnapshot colleagues={colleagues} selectedMonth={selectedMonth} />
          </div>
        </div>
      </div>
    </div>
  );
}