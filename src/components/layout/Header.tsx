import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiBell, FiX, FiUser, FiMenu, FiGift, FiAward } from 'react-icons/fi';
import { users, notifications } from '../../lib/dummyData';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Modal } from '../ui/Modal';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ toggleSidebar, isSidebarOpen }: HeaderProps) {
  const { user } = useAuth();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getRelativeTime = (date: string) => {
    const today = new Date('2025-04-20');
    const eventDate = new Date(date);
    const diffDays = Math.floor((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    return eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white/20 backdrop-blur-[16px] p-4 flex items-center justify-between gap-3 sm:gap-6 z-[100] rounded-xl shadow-md border border-gray-100 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200/50 rounded-full flex items-center justify-center text-gray-700 transition-all duration-300 hover:scale-105">
          <Icon size="md"><FiUser /></Icon>
        </div>
        <div>
          <p className="text-sm sm:text-base font-medium text-gray-800">
            Welcome, {user ? user.name : 'User'}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
            Your leave management dashboard
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <Button variant="icon" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
          <div className="relative">
            <Icon size="md" className="text-gray-700"><FiBell /></Icon>
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[10px] text-white flex items-center justify-center animate-pulse">
                {notifications.length}
              </span>
            )}
          </div>
        </Button>
        <Button
          variant="icon"
          className="sm:hidden"
          onClick={toggleSidebar}
        >
          <Icon size="md" className="text-gray-700">
            {isSidebarOpen ? <FiX /> : <FiMenu />}
          </Icon>
        </Button>
      </div>
      <Modal isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)}>
        <div ref={dropdownRef} className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-800 relative">
              Notifications
              <span className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
            </h3>
          </div>
          <div className="space-y-3">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-3 rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-start gap-3 hover:scale-[1.02]"
                >
                  <Icon size="md" className="text-gray-700 mt-0.5">
                    {notif.type === 'birthday' ? <FiGift /> : <FiAward />}
                  </Icon>
                  <div>
                    <p className="text-sm text-gray-800 font-medium">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{getRelativeTime(notif.date)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-6">No notifications</p>
            )}
          </div>
        </div>
      </Modal>
    </header>
  );
}