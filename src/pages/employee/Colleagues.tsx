import { useState } from 'react';
import { users } from '../../lib/dummyData';
import {
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaPhone,
  FaCalendarAlt,
  FaCode,
  FaBirthdayCake,
} from 'react-icons/fa';

export default function Colleagues() {
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});

  const toggleCard = (userId: string) => {
    setExpandedCards((prev) => ({ ...prev, [userId]: !prev[userId] }));
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'Junior Developer':
        return 'bg-indigo-500 text-white';
      case 'Senior Developer':
        return 'bg-purple-500 text-white';
      case 'Tech Lead':
        return 'bg-green-500 text-white';
      case 'DevOps Engineer':
        return 'bg-yellow-500 text-white';
      case 'HR Manager':
        return 'bg-pink-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-2 sm:px-4 sm:px-6 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto">
        {/* <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center shadow-sm">
          Colleagues
        </h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-3 sm:p-4 border border-gray-100"
            >
              {/* Header */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center shrink-0 shadow-sm hover:scale-105 transition-transform duration-200">
                  <span className="text-lg font-medium text-gray-700">
                    {user.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{user.email}</p>
                </div>
                <div className="shrink-0">
                  <span
                    className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-md shadow-sm ${getRoleBadgeClass(
                      user.role
                    )} hover:scale-105 transition-transform duration-200`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>

              <hr className="my-3 sm:my-4 border-gray-100" />

              {/* Details */}
              <div
                className={`space-y-3 text-xs sm:text-sm text-gray-600 ${
                  expandedCards[user.id] || typeof window !== 'undefined' && window.innerWidth >= 640
                    ? ''
                    : 'hidden sm:block'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FaGraduationCap className="text-gray-600 w-4 h-4" />
                  <span className="font-semibold">Education:</span>
                  <span>{user.education || 'N/A'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-gray-600 w-4 h-4" />
                  <span className="font-semibold">Location:</span>
                  <span>{user.location || 'N/A'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaPhone className="text-gray-600 w-4 h-4" />
                  <span className="font-semibold">Mobile:</span>
                  <span>{user.mobile || 'N/A'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-gray-600 w-4 h-4" />
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

                <div className="flex items-center gap-3">
                  <FaBirthdayCake className="text-gray-600 w-4 h-4" />
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
                <div className="flex gap-4 items-center mt-1">
                  {user.socialLinks?.linkedin && (
                    <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="text-gray-600 hover:text-gray-800 w-5 h-5 shadow-sm" />
                    </a>
                  )}
                  {user.socialLinks?.instagram && (
                    <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram className="text-gray-600 hover:text-gray-800 w-5 h-5 shadow-sm" />
                    </a>
                  )}
                </div>

                {/* Tech Stack */}
                <div>
                  <div className="flex items-center gap-3 font-semibold text-gray-800">
                    <FaCode className="text-gray-600 w-4 h-4" />
                    <span>Tech Stack</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {user.techStack?.length ? (
                      user.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full shadow-sm hover:bg-gray-200 transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-600">N/A</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Toggle Button (Mobile Only) */}
              <button
                onClick={() => toggleCard(user.id)}
                className="sm:hidden mt-3 w-full bg-indigo-600 text-white py-1.5 rounded-lg text-xs hover:bg-indigo-700 transition-colors duration-200"
              >
                {expandedCards[user.id] ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}