import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

interface LeaveBreakdownChartProps {
  balances: { type: string; balance: number; total: number }[];
}

export default function LeaveBreakdownChart({ balances }: LeaveBreakdownChartProps) {
  const navigate = useNavigate();

  const pieData = {
    labels: ['Remaining', 'Used'],
    datasets: [
      {
        data: [
          balances.reduce((sum, b) => sum + b.balance, 0),
          balances.reduce((sum, b) => sum + (b.total - b.balance), 0),
        ],
        backgroundColor: ['#3b82f6', '#f97316'],
        borderWidth: 0,
        hoverOffset: 20,
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

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0">
        <Pie data={pieData} options={pieOptions} />
      </div>
      <button
        onClick={() => navigate('/employee/leave/apply')}
        className="mt-3 sm:mt-4 w-fit mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base shadow-md"
      >
        Apply Leave
      </button>
    </div>
  );
}