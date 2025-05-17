import { useState, useEffect } from 'react';
import { users } from '../../lib/dummyData';
import {
  FiMapPin,
  FiPhone,
  FiCalendar,
  FiCode,
  FiUser,
  FiChevronUp,
  FiChevronDown,
} from 'react-icons/fi';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Card } from '../../components/ui/Card';

export default function Colleagues() {
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleCard = (userId: string) => {
    setExpandedCards((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'Junior Developer':
        return 'bg-gradient-to-r from-indigo-500 to-indigo-600';
      case 'Senior Developer':
        return 'bg-gradient-to-r from-purple-500 to-purple-600';
      case 'Tech Lead':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'DevOps Engineer':
        return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
      case 'HR Manager':
        return 'bg-gradient-to-r from-pink-500 to-pink-600';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen px-3 sm:px-4 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4 sm:mb-5">
          <FiUser className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 relative">
            Colleagues
            <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {users.map((user) => (
            <Card
              key={user.id}
              className="bg-white/20 backdrop-blur-[16px] rounded-xl shadow-md p-4 sm:p-5 transition-all duration-300 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-50 rounded-full flex items-center justify-center shrink-0 shadow-sm hover:scale-105 transition-transform">
                  <span className="text-lg sm:text-xl font-semibold text-indigo-700">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base sm:text-lg font-bold text-gray-800 truncate">{user.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{user.email}</p>
                </div>
                <div className="shrink-0">
                  <span
                    className={`text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full shadow-sm text-white ${getRoleBadgeClass(user.role)} hover:scale-105 transition-transform`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>

              {/* Toggle Button (only show on mobile) */}
              {isMobile && (
                <div
                  className="flex items-center justify-between mt-4 cursor-pointer"
                  onClick={() => toggleCard(user.id)}
                >
                  <h3 className="text-sm font-semibold text-gray-800">Profile Details</h3>
                  {expandedCards[user.id] ? (
                    <FiChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              )}

              {/* Details */}
              {(expandedCards[user.id] || !isMobile) && (
                <div className="mt-3 sm:mt-4 space-y-3 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <FiUser className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold">Education:</span>
                    <span className="truncate">{user.education || 'N/A'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold">Location:</span>
                    <span className="truncate">{user.location || 'N/A'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiPhone className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold">Mobile:</span>
                    <span>{user.mobile || 'N/A'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold">Joined:</span>
                    <span>
                      {user.joinDate
                        ? new Date(user.joinDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiCalendar className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold">Birthday:</span>
                    <span>
                      {user.birthday
                        ? new Date(user.birthday).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'N/A'}
                    </span>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3 items-center mt-2">
                    {user.socialLinks?.linkedin && (
                      <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-indigo-600 hover:text-indigo-800 w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                    )}
                    {user.socialLinks?.instagram && (
                      <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-purple-600 hover:text-purple-800 w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                    )}
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-gray-800">
                      <FiCode className="text-gray-500 w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.techStack?.length ? (
                        user.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs sm:text-sm bg-indigo-50 text-indigo-800 px-2 sm:px-3 py-1 rounded-full shadow-sm hover:bg-indigo-100 transition"
                          >
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs sm:text-sm text-gray-500">N/A</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}