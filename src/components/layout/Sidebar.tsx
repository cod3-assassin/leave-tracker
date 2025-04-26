import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiGrid, FiUserCheck, FiEdit, FiList, FiBarChart, FiUserPlus, FiSliders } from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <div
      className={`bg-white w-60 min-h-screen p-4 flex flex-col justify-between transform transition-transform duration-200 ease-in-out sm:w-60 sm:transform-none fixed top-0 left-0 z-30 shadow-[0_4px_12px_rgba(0,0,0,0.06)] ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } sm:translate-x-0`}
    >
      <div>
        <div className="mb-6 pt-2">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm">
              LT
            </span>
            Leave Tracker
          </h2>
          <p className="text-xs text-gray-500 mt-2">
            {user ? `Hi, ${user.name.split(' ')[0]}!` : 'Welcome'}
          </p>
        </div>
        <nav className="space-y-1">
          <NavLink
            to="/employee/dashboard"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-xs font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
              <FiGrid className="text-gray-700 w-4 h-4" />
            </div>
            Dash
          </NavLink>
          <NavLink
            to="/employee/colleagues"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-xs font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
              <FiUserCheck className="text-gray-700 w-4 h-4" />
            </div>
            Colleagues
          </NavLink>
          <NavLink
            to="/employee/leave/apply"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-xs font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
              <FiEdit className="text-gray-700 w-4 h-4" />
            </div>
            Leave
          </NavLink>
          <NavLink
            to="/employee/checklist"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-xs font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
              <FiList className="text-gray-700 w-4 h-4" />
            </div>
            Checklist
          </NavLink>
          <NavLink
            to="/employee/reports"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-xs font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
              <FiBarChart className="text-gray-700 w-4 h-4" />
            </div>
            Reports
          </NavLink>
          <NavLink
            to="/employee/profile"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-xs font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
              <FiUserPlus className="text-gray-700 w-4 h-4" />
            </div>
            Profile
          </NavLink>
          <NavLink
            to="/employee/settings"
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-xs font-medium ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
              <FiSliders className="text-gray-700 w-4 h-4" />
            </div>
            Settings
          </NavLink>
        </nav>
      </div>
      <button
        onClick={() => {
          logout();
          toggleSidebar();
        }}
        className="flex items-center p-2 rounded-lg text-xs font-medium text-red-600 hover:bg-red-50"
      >
        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
          <FiLogOut className="text-red-600 w-4 h-4" />
        </div>
        Logout
      </button>
    </div>
  );
}