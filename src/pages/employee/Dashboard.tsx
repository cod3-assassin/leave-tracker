import { useAuth } from '../../context/AuthContext';
import { leaveBalances, leaveRequests, users, hrActivities } from '../../lib/dummyData';
import LeaveBalanceCard from './components/LeaveBalanceCard';
import TeamSnapshot from './components/TeamSnapshot';
import LeaveRequestTable from './components/LeaveRequestTable';
import EmployeeLeaveCalendar from './components/EmployeeLeaveCalendar';
import RecentActivity from './components/RecentActivity';
import LeaveBreakdownChart from '../../components/ui/LeaveBreakdownChart';
import TimingsChart from '../../components/ui/TimingsChart';
import { FiClock, FiCalendar, FiUsers, FiPieChart, FiBarChart, FiStar } from 'react-icons/fi';
import CustomDropdown from '../../components/ui/CustomDropdown';
import { months } from '../../lib/dummyData';
import { useState } from 'react';
import { Card } from '../../components/ui/Card';

// Mock Maternity Leave if not in dummyData
const updatedLeaveBalances = [
  ...leaveBalances,
  { type: 'Maternity', balance: 60, total: 90 },
];

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const colleagues = users.filter((u) => u.id !== user?.id);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedLeave, setSelectedLeave] = useState<{ date: string; type: string } | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4">
      <div className="flex flex-col gap-5 sm:gap-6">
        {/* Row 1: Leave Balances */}
        <Card className="bg-white/20 backdrop-blur-[16px] rounded-xl p-4 sm:p-5 shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <FiClock className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 relative">
              Leave Balances
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {updatedLeaveBalances.map((balance) => (
              <LeaveBalanceCard key={balance.type} balance={balance} />
            ))}
          </div>
        </Card>

        {/* Row 2: Charts */}
        <div className="flex flex-col md:flex-row gap-5 sm:gap-6">
          {/* Leave Breakdown */}
          <Card className="flex-1 bg-white/20 backdrop-blur-[16px] rounded-xl p-4 sm:p-5 shadow-md transition-all duration-300 h-[300px] sm:h-[320px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <FiPieChart className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 relative">
                Leave Breakdown
                <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
              </h2>
            </div>
            <div className="flex-1">
              <LeaveBreakdownChart balances={updatedLeaveBalances} />
            </div>
          </Card>

          {/* Timings */}
          <Card className="flex-1 bg-white/20 backdrop-blur-[16px] rounded-xl p-4 sm:p-5 shadow-md transition-all duration-300 h-[300px] sm:h-[320px] flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <FiBarChart className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 relative">
                Timings
                <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
              </h2>
            </div>
            <div className="flex-1">
              <TimingsChart />
            </div>
          </Card>
        </div>

        {/* Row 3: Leave Requests + Recent Activity */}
        <div className="flex flex-col md:flex-row gap-5 sm:gap-6">
          {/* Leave Requests (60%) */}
          <Card className="flex-[3] bg-white/20 backdrop-blur-[16px] rounded-xl p-4 sm:p-5 shadow-md transition-all duration-300 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <FiCalendar className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 relative">
                Recent Leave Requests
                <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
              </h2>
            </div>
            <div>
              <LeaveRequestTable requests={leaveRequests} />
            </div>
          </Card>

          {/* Recent Activity (40%) */}
          <Card className="flex-[2] bg-white/20 backdrop-blur-[16px] rounded-xl p-4 sm:p-5 shadow-md transition-all duration-300 flex flex-col">
            <div className="flex-1">
              <RecentActivity activities={hrActivities} selectedLeave={selectedLeave} />
            </div>
          </Card>
        </div>

        {/* Row 4: Employee Leave Calendar */}
        <Card className="bg-white/20 backdrop-blur-[16px] rounded-xl p-4 sm:p-5 shadow-md transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <FiStar className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 relative">
              Employee Leave Calendar
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
            </h2>
          </div>
          <EmployeeLeaveCalendar />
        </Card>

        {/* Row 5: Team Snapshot */}
        <Card className="bg-white/20 backdrop-blur-[16px] rounded-xl p-4 sm:p-5 shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4 w-full">
            <div className="flex items-center gap-2">
              <FiUsers className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 relative">
                Our Team
                <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
              </h2>
            </div>
            <div className="flex items-center">
              <CustomDropdown
                selectedValue={selectedMonth}
                onChange={setSelectedMonth}
                options={months.map((month, idx) => ({ value: idx + 1, label: month }))}
              />
            </div>
          </div>
          <div className="w-full">
            <TeamSnapshot colleagues={colleagues} selectedMonth={selectedMonth} />
          </div>
        </Card>
      </div>
    </div>
  );
}