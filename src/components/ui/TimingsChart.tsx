import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FiClock } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TimingsChart() {
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
      y: { beginAtZero: true, ticks: { color: '#6b7280', stepSize: 1, font: { size: 12 } } },
      x: { ticks: { color: '#6b7280', font: { size: 12 } } },
    },
  };

  return (
    <div className="flex flex-col h-full">
      {/* <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <FiClock className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">Timings</h2>
      </div> */}
      <div className="flex-1 min-h-0">
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
}