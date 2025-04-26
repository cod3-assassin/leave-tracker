import { useParams } from 'react-router-dom';
import { users } from '../../../lib/dummyData';
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

export default function ColleagueDetail() {
  const { id } = useParams<{ id: string }>();
  const user = users.find((u) => u.id === id);

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

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 px-2 sm:px-4 py-4 sm:py-6 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-3 sm:p-4 w-full max-w-sm text-center border border-gray-200">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2">
            Colleague Not Found
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">No colleague found with ID: {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-2 sm:px-4 py-4 sm:py-6">
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-xl p-3 sm:p-6 border border-gray-200">
          {/* Header */}
          <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center shrink-0 shadow-sm hover:scale-105 transition-transform duration-200">
              <span className="text-lg font-medium text-gray-700">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg sm:text-2xl font-bold text-gray-800 truncate">{user.name}</p>
              <p className="text-xs sm:text-base text-gray-600 truncate">{user.email}</p>
            </div>
            <div className="shrink-0">
              <span
                className={`text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm ${getRoleBadgeClass(
                  user.role
                )} hover:scale-105 transition-transform duration-200`}
              >
                {user.role}
              </span>
            </div>
          </div>

          <hr className="my-3 sm:my-6 border-gray-200" />

          {/* Details */}
          <div className="space-y-3 sm:space-y-4 text-xs sm:text-base text-gray-600">
            <div className="flex items-center gap-3 sm:gap-4">
              <FaGraduationCap className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold">Education:</span>
              <span>{user.education || 'N/A'}</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <FaMapMarkerAlt className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold">Location:</span>
              <span>{user.location || 'N/A'}</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <FaPhone className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold">Mobile:</span>
              <span>{user.mobile || 'N/A'}</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4">
              <FaCalendarAlt className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
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

            <div className="flex items-center gap-3 sm:gap-4">
              <FaBirthdayCake className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
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

            <div className="flex gap-3 sm:gap-4 items-center mt-2">
              {user.socialLinks?.linkedin && (
                <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-gray-600 hover:text-gray-800 w-5 h-5 sm:w-6 sm:h-6 shadow-sm" />
                </a>
              )}
              {user.socialLinks?.instagram && (
                <a href={user.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-gray-600 hover:text-gray-800 w-5 h-5 sm:w-6 sm:h-6 shadow-sm" />
                </a>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 sm:gap-4 font-semibold text-gray-800">
                <FaCode className="text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                <span>Tech Stack</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {user.techStack?.length ? (
                  user.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full shadow-sm hover:bg-gray-200 transition-colors duration-200"
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
        </div>
      </div>
    </div>
  );
}