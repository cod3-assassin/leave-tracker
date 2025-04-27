import { LeaveRequest } from '../../../lib/dummyData';
import { ScrollableCard } from '../../../components/ui/ScrollableCard';

interface LeaveRequestTableProps {
  requests: LeaveRequest[];
}

export default function LeaveRequestTable({ requests }: LeaveRequestTableProps) {
  return (
    <ScrollableCard className="overflow-x-auto rounded-lg" maxHeight="max-h-[158px] sm:max-h-[170px]">
      <table className="w-full text-left">
        <thead className="bg-gradient-to-r from-indigo-200 to-purple-200 sticky top-0 border-b-2 border-indigo-300 shadow-sm">
          <tr>
            <th className="py-2 px-1.5 sm:px-3 text-[10px] sm:text-xs font-semibold text-gray-800 w-[10%]">No.</th>
            <th className="py-2 px-1.5 sm:px-3 text-[10px] sm:text-xs font-semibold text-gray-800 w-[20%]">Type</th>
            <th className="py-2 px-1.5 sm:px-3 text-[10px] sm:text-xs font-semibold text-gray-800 w-[25%] whitespace-nowrap">Start Date</th>
            <th className="py-2 px-1.5 sm:px-3 text-[10px] sm:text-xs font-semibold text-gray-800 w-[25%] whitespace-nowrap">End Date</th>
            <th className="py-2 px-1.5 sm:px-3 text-[10px] sm:text-xs font-semibold text-gray-800 w-[20%]">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr
              key={request.id}
              className="border-b border-gray-200 hover:bg-indigo-50/50 transition-colors duration-200"
            >
              <td className="py-1.5 px-1.5 sm:px-3 text-[10px] sm:text-xs text-gray-800">{index + 1}</td>
              <td className="py-1.5 px-1.5 sm:px-3 text-[10px] sm:text-xs text-gray-800 truncate">{request.type}</td>
              <td className="py-1.5 px-1.5 sm:px-3 text-[10px] sm:text-xs text-gray-800 whitespace-nowrap">{request.startDate}</td>
              <td className="py-1.5 px-1.5 sm:px-3 text-[10px] sm:text-xs text-gray-800 whitespace-nowrap">{request.endDate}</td>
              <td className="py-1.5 px-1.5 sm:px-3 text-[10px] sm:text-xs">
                <span
                  className={`inline-block px-1.5 sm:px-2 py-0.5 rounded-lg text-[10px] sm:text-xs font-medium shadow-sm ${
                    request.status === 'Approved'
                      ? 'bg-green-500 text-white'
                      : request.status === 'Pending'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {request.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollableCard>
  );
}