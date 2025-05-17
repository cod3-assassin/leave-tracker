import { useAuth } from '../../context/AuthContext';
import { leaveBalances, leaveRequests, users, hrActivities } from '../../lib/dummyData';
import LeaveBalanceCard from './components/LeaveBalanceCard';
import TeamSnapshot from './components/TeamSnapshot';
import LeaveRequestTable from './components/LeaveRequestTable';
import EmployeeLeaveCalendar from './components/EmployeeLeaveCalendar';
import RecentActivity from './components/RecentActivity';
import LeaveBreakdownChart from '../../components/ui/LeaveBreakdownChart';
import TimingsChart from '../../components/ui/TimingsChart';
import { FiClock, FiCalendar, FiUsers, FiPieChart, FiBarChart, FiStar, FiPlus } from 'react-icons/fi';
import CustomDropdown from '../../components/ui/CustomDropdown';
import { months } from '../../lib/dummyData';
import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import toast from 'react-hot-toast';

// Placeholder ApplyLeave (replace with your component)
const ApplyLeave = ({ onSubmit, onClose }: { onSubmit: (data: any) => void; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    type: 'Annual',
    startDate: '',
    endDate: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.startDate || !formData.endDate) {
      toast.error('Please fill all required fields');
      return;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error('End date must be after start date');
      return;
    }
    onSubmit(formData);
    toast.success('Leave request submitted!');
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white/20 backdrop-blur-[16px] rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-800">Leave Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-2 border border-gray-100 rounded-lg text-gray-800 bg-white/50"
        >
          <option value="Annual">Annual</option>
          <option value="Sick">Sick</option>
          <option value="Maternity">Maternity</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-800">Start Date</label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          className="w-full p-2 border border-gray-100 rounded-lg text-gray-800 bg-white/50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-800">End Date</label>
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          className="w-full p-2 border border-gray-100 rounded-lg text-gray-800 bg-white/50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-800">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-2 border border-gray-100 rounded-lg text-gray-800 bg-white/50"
        />
      </div>
      <div className="flex gap-3">
        <Button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </Button>
        <Button
          type="button"
          onClick={onClose}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

// Mock Maternity Leave
const updatedLeaveBalances = [
  ...leaveBalances,
  { type: 'Maternity', balance: 60, total: 90 },
];

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const colleagues = users.filter((u) => u.id !== user?.id);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [calendarMonth, setCalendarMonth] = useState<number>(new Date().getMonth() + 1);
  const [breakdownMonth, setBreakdownMonth] = useState<number>(new Date().getMonth() + 1);
  const [timingsMonth, setTimingsMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedLeave, setSelectedLeave] = useState<{ date: string; type: string } | null>(null);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveRequestsState, setLeaveRequestsState] = useState(leaveRequests);

  const handleLeaveSubmit = (data: any) => {
    const newRequest = {
      id: leaveRequestsState.length + 1,
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      status: 'Pending',
      notes: data.notes,
    };
    setLeaveRequestsState([...leaveRequestsState, newRequest]);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4">
      <div className="flex flex-col gap-5 sm:gap-6">
        {/* Row 1: Leave Balances */}
        <Card className="rounded-xl p-4 sm:p-5 shadow-md transition-all duration-300">
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
            <div className="flex items-center justify-between mb-4 w-full">
              <div className="flex items-center gap-2">
                <FiPieChart className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 relative">
                  Leave Breakdown
                  <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
                </h2>
              </div>
              <div className="flex items-center">
                <CustomDropdown
                  selectedValue={breakdownMonth}
                  onChange={setBreakdownMonth}
                  options={months.map((month, idx) => ({ value: idx + 1, label: month }))}
                />
              </div>
            </div>
            <div className="flex-1">
              <LeaveBreakdownChart balances={updatedLeaveBalances} selectedMonth={breakdownMonth} />
            </div>
          </Card>

          {/* Timings */}
          <Card className="flex-1 bg-white/20 backdrop-blur-[16px] rounded-xl p-4 sm:p-5 shadow-md transition-all duration-300 h-[300px] sm:h-[320px] flex flex-col">
            <div className="flex items-center justify-between mb-4 w-full">
              <div className="flex items-center gap-2">
                <FiBarChart className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 relative">
                  Timings
                  <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
                </h2>
              </div>
              <div className="flex items-center">
                <CustomDropdown
                  selectedValue={timingsMonth}
                  onChange={setTimingsMonth}
                  options={months.map((month, idx) => ({ value: idx + 1, label: month }))}
                />
              </div>
            </div>
            <div className="flex-1">
              <TimingsChart selectedMonth={timingsMonth} />
            </div>
          </Card>
        </div>

        {/* Row 3: Leave Requests + Recent Activity */}
        <div className="flex flex-col md:flex-row gap-5 sm:gap-6">
          {/* Leave Requests (60%) */}
          <Card className="flex-[3] bg-white/20 backdrop-blur-[16px] rounded-xl p-4 sm:p-5 shadow-md transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 relative">
                  Recent Leave Requests
                  <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
                </h2>
              </div>
              <Button
                onClick={() => setIsLeaveModalOpen(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                <FiPlus className="inline mr-1" /> Request Leave
              </Button>
            </div>
            <div>
              <LeaveRequestTable requests={leaveRequestsState} />
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
          <div className="flex items-center justify-between mb-4 w-full">
            <div className="flex items-center gap-2">
              <FiStar className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 relative">
                Employee Leave Calendar
                <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
              </h2>
            </div>
            <div className="flex items-center">
              <CustomDropdown
                selectedValue={calendarMonth}
                onChange={setCalendarMonth}
                options={months.map((month, idx) => ({ value: idx + 1, label: month }))}
              />
            </div>
          </div>
          <EmployeeLeaveCalendar selectedMonth={calendarMonth} />
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

      {/* Leave Request Modal
      <Modal isOpen={isLeaveModalOpen} onClose={() => setIsLeaveModalOpen(false)}>
        <div className="w-full sm:w-96">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Apply for Leave</h3>
          <ApplyLeave
            onSubmit={handleLeaveSubmit}
            onClose={() => setIsLeaveModalOpen(false)}
          />
        </div>
      </Modal> */}
    </div>
  );
}