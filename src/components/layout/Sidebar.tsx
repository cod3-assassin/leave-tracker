import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiGrid, FiUserCheck, FiEdit, FiList, FiBarChart, FiUserPlus, FiSliders } from 'react-icons/fi';
import logo from '../../assets/image.png';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <div
      className={`bg-gradient-to-b from-indigo-50 to-gray-100 w-60 min-h-screen p-5 sm:p-6 flex flex-col justify-between overflow-hidden transform transition-transform duration-200 ease-in-out sm:w-60 fixed top-0 left-0 z-30 shadow-lg sm:shadow-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0`}
    >
      <div>
        <div className="mb-6 pt-3 flex items-center gap-4">
          <img src={logo} alt="Leave Tracker Logo" className="w-12 h-12 sm:w-14 sm:h-14 object-contain" />
          <p className="text-sm sm:text-base text-gray-600">
            {user ? `Hi, ${user.name.split(' ')[0]}!` : 'Welcome'}
          </p>
        </div>
        <nav className="space-y-3">
          <NavLink
            to="/employee/dashboard"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-sm sm:text-base font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 shadow-md'
                  : 'text-gray-700 hover:bg-indigo-50 hover:shadow-sm'
              } transition-all duration-200`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <FiGrid className="text-gray-800 w-4 h-4" />
            </div>
            Dashboard
          </NavLink>
          <NavLink
            to="/employee/colleagues"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-sm sm:text-base font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 shadow-md'
                  : 'text-gray-700 hover:bg-indigo-50 hover:shadow-sm'
              } transition-all duration-200`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <FiUserCheck className="text-gray-800 w-4 h-4" />
            </div>
            Colleagues
          </NavLink>
          <NavLink
            to="/employee/leave/apply"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-sm sm:text-base font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 shadow-md'
                  : 'text-gray-700 hover:bg-indigo-50 hover:shadow-sm'
              } transition-all duration-200`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <FiEdit className="text-gray-800 w-4 h-4" />
            </div>
            Apply Leave
          </NavLink>
          <NavLink
            to="/employee/checklist"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-sm sm:text-base font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 shadow-md'
                  : 'text-gray-700 hover:bg-indigo-50 hover:shadow-sm'
              } transition-all duration-200`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <FiList className="text-gray-800 w-4 h-4" />
            </div>
            Checklist
          </NavLink>
          <NavLink
            to="/employee/reports"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-sm sm:text-base font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 shadow-md'
                  : 'text-gray-700 hover:bg-indigo-50 hover:shadow-sm'
              } transition-all duration-200`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <FiBarChart className="text-gray-800 w-4 h-4" />
            </div>
            Reports
          </NavLink>
          <NavLink
            to="/employee/profile"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-sm sm:text-base font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 shadow-md'
                  : 'text-gray-700 hover:bg-indigo-50 hover:shadow-sm'
              } transition-all duration-200`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <FiUserPlus className="text-gray-800 w-4 h-4" />
            </div>
            Profile
          </NavLink>
          <NavLink
            to="/employee/settings"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-sm sm:text-base font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 shadow-md'
                  : 'text-gray-700 hover:bg-indigo-50 hover:shadow-sm'
              } transition-all duration-200`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <FiSliders className="text-gray-800 w-4 h-4" />
            </div>
            Settings
          </NavLink>
        </nav>
      </div>
      <div>
        <hr className="border-t border-gray-300 my-5" />
        <button
          onClick={() => {
            logout();
            toggleSidebar();
          }}
          className="flex items-center p-2 rounded-lg text-sm sm:text-base font-medium text-red-700 hover:bg-red-50 transition-all duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <FiLogOut className="text-red-700 w-4 h-4" />
          </div>
          Logout
        </button>
      </div>
    </div>
  );
}