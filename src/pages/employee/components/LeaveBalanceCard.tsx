import { FaUmbrellaBeach } from 'react-icons/fa';
import Loader from '../../../components/ui/Loader';
import { Card } from '../../../components/ui/Card';
import { LeaveBalance } from '../../../lib/dummyData';

interface LeaveBalanceCardProps {
  balance: LeaveBalance;
  isLoading?: boolean;
}

export default function LeaveBalanceCard({
  balance,
  isLoading = false,
}: LeaveBalanceCardProps) {
  const percentage = (balance.balance / balance.total) * 100;

  return (
    <Card className="bg-white/20 backdrop-blur-[16px] rounded-xl p-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] transition-all duration-300">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center gap-1 mb-1">
            <FaUmbrellaBeach className="text-indigo-500 text-lg" />
            <h3 className="text-sm font-semibold text-gray-800">
              {balance.type} Leave
              <span className="block w-8 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 mt-0.5" />
            </h3>
          </div>
          <p className="text-xs text-gray-600 font-medium">
            {balance.balance} of {balance.total} days remaining
          </p>
          <div className="mt-1 bg-gray-100 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </>
      )}
    </Card>
  );
}