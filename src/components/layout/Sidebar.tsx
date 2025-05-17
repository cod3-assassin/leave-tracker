import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiGrid, FiUsers, FiEdit, FiClock, FiUser, FiCalendar, FiFileText, FiStar, FiCheckSquare, FiBarChart, FiSliders } from 'react-icons/fi';
import logo from '../../assets/image.png';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Debug user state
  console.log('Sidebar: Current user:', user);

  // Define menu items by role
  const menuItems = {
    employee: [
      { label: 'Dashboard', path: '/employee/dashboard', icon: FiGrid },
      { label: 'Colleagues', path: '/employee/colleagues', icon: FiUsers },
      { label: 'Apply Leave', path: '/employee/leave/apply', icon: FiEdit },
      { label: 'Leave policy', path: '/employee/leave-policy', icon: FiClock },
      { label: 'Profile', path: '/employee/profile', icon: FiUser },
    ],
    hr: [
      { label: 'Dashboard', path: '/hr/dashboard', icon: FiGrid },
      { label: 'Accounts', path: '/hr/accounts', icon: FiUsers },
      { label: 'Leave Approvals', path: '/hr/leave-approvals', icon: FiCalendar },
      { label: 'Employee Directory', path: '/hr/directory', icon: FiUsers },
      { label: 'Attendance Reports', path: '/hr/attendance', icon: FiClock },
      { label: 'Policies', path: '/hr/policies', icon: FiFileText },
      { label: 'Performance Reviews', path: '/hr/performance', icon: FiStar },
      { label: 'Reports', path: '/hr/reports', icon: FiBarChart },
      { label: 'Settings', path: '/hr/settings', icon: FiSliders },
    ],
    manager: [
      { label: 'Dashboard', path: '/manager/dashboard', icon: FiGrid },
      { label: 'Approvals', path: '/manager/approvals', icon: FiCalendar },
      { label: 'Team Directory', path: '/manager/directory', icon: FiUsers },
      { label: 'Calendar', path: '/manager/calendar', icon: FiCalendar },
      { label: 'Performance', path: '/manager/performance', icon: FiStar },
      { label: 'Tasks', path: '/manager/tasks', icon: FiCheckSquare },
      { label: 'Reports', path: '/manager/reports', icon: FiBarChart },
      { label: 'Documents', path: '/manager/documents', icon: FiFileText },
      { label: 'Profile', path: '/manager/profile', icon: FiUser },
    ],
    tech_lead: [
      { label: 'Dashboard', path: '/tech-lead/dashboard', icon: FiGrid },
      { label: 'Team', path: '/tech-lead/team', icon: FiUsers },
      { label: 'Tasks', path: '/tech-lead/tasks', icon: FiCheckSquare },
      { label: 'Performance', path: '/tech-lead/performance', icon: FiStar },
      { label: 'Profile', path: '/tech-lead/profile', icon: FiUser },
    ],
  };

  // Redirect to login if user is null
  if (!user) {
    console.log('Sidebar: No user, redirecting to /login');
    navigate('/login');
    return null;
  }

  // Get menu items for the user's role
  const roleMenu = menuItems[user.role as keyof typeof menuItems] || [];

  // Debug menu items
  console.log('Sidebar: Role:', user.role, 'Menu items:', roleMenu);

  return (
    <div
      className={`bg-white/30 backdrop-blur-lg bg-gradient-to-b from-indigo-100 to-gray-50 w-64 min-h-screen p-4 flex flex-col transform transition-transform duration-200 ease-in-out fixed top-0 left-0 z-30 shadow-md rounded-r-xl border-r border-gray-100 max-w-[16rem] overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
    >
      {/* Header */}
      <div className="mb-4 pt-2">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Leave Tracker Logo"
            className="w-12 h-12 object-contain rounded-full border border-gray-100 shadow-sm"
          />
          <div>
            <p className="text-sm font-semibold text-gray-800 relative">
              Hi, {user.name.split(' ')[0]}!
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
            </p>
          </div>
        </div>
        <hr className="border-gray-200 my-2" />
      </div>

      {/* Menu */}
      <nav className="flex-grow space-y-1.5">
        {roleMenu.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-2 rounded-lg text-xs sm:text-[13px] font-medium w-full ${isActive
                ? 'bg-gradient-to-r from-indigo-200 to-purple-200 text-indigo-800 shadow-md'
                : 'text-gray-700 hover:bg-indigo-100 hover:scale-[1.03]'
              } transition-all duration-200`
            }
            onClick={() => toggleSidebar()}
          >
            <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              <item.icon className="text-gray-800 w-4 h-4" />
            </div>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="sticky bottom-0">
        <hr className="border-gray-200 my-3" />
        <button
          onClick={() => {
            logout();
            toggleSidebar();
            navigate('/login');
          }}
          className="flex items-center p-2 rounded-lg text-xs sm:text-[13px] font-medium text-red-700 hover:bg-red-100 hover:scale-[1.03] transition-all duration-200 w-full"
        >
          <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
            <FiLogOut className="text-red-700 w-4 h-4" />
          </div>
          Logout
        </button>
      </div>
    </div>
  );
}