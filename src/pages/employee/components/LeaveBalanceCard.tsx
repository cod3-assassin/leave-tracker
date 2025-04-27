import { FaUmbrellaBeach, FaHeartbeat, FaGift, FaBabyCarriage } from 'react-icons/fa';
import Loader from '../../../components/ui/Loader';
import { Card } from '../../../components/ui/Card';
import { LeaveBalance } from '../../../lib/dummyData';
import { JSX } from "react";

interface LeaveBalanceCardProps {
  balance: LeaveBalance;
  isLoading?: boolean;
}

export default function LeaveBalanceCard({
  balance,
  isLoading = false,
}: LeaveBalanceCardProps) {
  const percentage = (balance.balance / balance.total) * 100;

  // Define unique icons for each leave type
  const leaveIcons: { [key: string]: JSX.Element } = {
    'Annual': <FaUmbrellaBeach className="text-indigo-500 w-4 h-4 sm:w-5 sm:h-5" />,
    'Sick': <FaHeartbeat className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />,
    'Casual': <FaGift className="text-purple-500 w-4 h-4 sm:w-5 sm:h-5" />,
    'Maternity': <FaBabyCarriage className="text-orange-500 w-4 h-4 sm:w-5 sm:h-5" />,
  };

  // Define unique gradient colors for each leave type
  const progressBarColors: { [key: string]: string } = {
    'Annual': 'bg-gradient-to-r from-blue-500 to-cyan-500',
    'Sick': 'bg-gradient-to-r from-green-500 to-teal-500',
    'Casual': 'bg-gradient-to-r from-purple-500 to-pink-500',
    'Maternity': 'bg-gradient-to-r from-orange-500 to-red-500',
  };

  // Get the icon for the current leave type, default to FaUmbrellaBeach if not specified
  const leaveIcon = leaveIcons[balance.type] || <FaUmbrellaBeach className="text-indigo-500 w-4 h-4 sm:w-5 sm:h-5" />;

  // Get the gradient for the current leave type, default to indigo-purple if not specified
  const progressBarGradient = progressBarColors[balance.type] || 'bg-gradient-to-r from-indigo-500 to-purple-500';

  return (
    <Card className="bg-white/30 backdrop-blur-[16px] rounded-xl p-1.5 sm:p-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-300 flex flex-col min-h-[70px] sm:min-h-[80px]">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center gap-1 mb-1">
            {leaveIcon}
            <h3 className="text-[10px] sm:text-xs font-semibold text-gray-800 relative truncate">
              {balance.type} Leave
              <span className="absolute -bottom-0.5 left-0 w-6 sm:w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
            </h3>
          </div>
          <p className="text-[8px] sm:text-[10px] text-gray-600 font-medium mb-1 truncate">
            {balance.balance} of {balance.total} days left
          </p>
          <div className="flex-1 flex items-end">
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
              <div
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${progressBarGradient}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </>
      )}
    </Card>
  );
}