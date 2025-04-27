import { useNavigate } from 'react-router-dom';
import { FiStar, FiAward, FiBook, FiUmbrella } from 'react-icons/fi';
import { useMemo } from 'react';
import { Card } from '../../../components/ui/Card';
import { ScrollableCard } from '../../../components/ui/ScrollableCard';

interface Activity {
  id: number;
  type: string;
  title: string;
  date: string;
  description: string;
}

interface RecentActivityProps {
  activities: Activity[];
  selectedLeave?: { date: string; type: string };
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'event':
      return <FiStar className="w-5 h-5 text-indigo-600" />;
    case 'workshop':
      return <FiBook className="w-5 h-5 text-indigo-600" />;
    case 'announcement':
      return <FiAward className="w-5 h-5 text-indigo-600" />;
    case 'Leave':
      return <FiUmbrella className="w-5 h-5 text-red-600" />;
    default:
      return <FiStar className="w-5 h-5 text-indigo-600" />;
  }
};

export default function RecentActivity({ activities, selectedLeave }: RecentActivityProps) {
  const navigate = useNavigate();

  const displayedActivities = useMemo(() => {
    const activityList = [...activities];
    if (selectedLeave) {
      activityList.push({
        id: Date.now(),
        type: 'Leave',
        title: `Leave on ${new Date(selectedLeave.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
        date: selectedLeave.date,
        description: `You are on ${selectedLeave.type}.`,
      });
    }
    return activityList;
  }, [activities, selectedLeave]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiStar className="w-6 h-6 text-indigo-600" />
          <h2 className="text-sm sm:text-base font-semibold text-gray-800">Recent Activity</h2>
        </div>
        <button
          onClick={() => navigate('/employee/activities')}
          className="text-indigo-600 hover:text-indigo-700 text-xs sm:text-sm font-medium"
        >
          View All
        </button>
      </div>
      <ScrollableCard className="animate-fadeIn" maxHeight="max-h-[200px]">
        <div className="space-y-3">
          {displayedActivities.length > 0 ? (
            displayedActivities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-3">
                  {getEventIcon(activity.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs sm:text-sm font-semibold text-gray-800">{activity.title}</p>
                      {activity.type === 'Leave' && (
                        <span className="text-xs px-2 py-1 bg-red-200 text-red-700 rounded-full">Leave</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-700">{activity.description}</p>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-xs sm:text-sm text-gray-600 text-center">No recent activities available</p>
          )}
        </div>
      </ScrollableCard>
    </div>
  );
}