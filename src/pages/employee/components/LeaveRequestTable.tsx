import { LeaveRequest } from '../../../lib/dummyData';

interface LeaveRequestTableProps {
  requests: LeaveRequest[];
}

export default function LeaveRequestTable({ requests }: LeaveRequestTableProps) {
  return (
    <div className="overflow-x-auto max-h-[200px] overflow-y-auto">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="bg-white sticky top-0 border-b border-gray-200">
          <tr>
            <th className="py-2 px-2 sm:px-4">Type</th>
            <th className="py-2 px-2 sm:px-4">Start Date</th>
            <th className="py-2 px-2 sm:px-4">End Date</th>
            <th className="py-2 px-2 sm:px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="border-b border-gray-100 even:bg-gray-50 hover:bg-indigo-50 transition-all duration-200">
              <td className="py-2 px-2 sm:px-4">{request.type}</td>
              <td className="py-2 px-2 sm:px-4">{request.startDate}</td>
              <td className="py-2 px-2 sm:px-4">{request.endDate}</td>
              <td className="py-2 px-2 sm:px-4">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    request.status === 'Approved'
                      ? 'bg-green-100 text-green-800'
                      : request.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {request.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}