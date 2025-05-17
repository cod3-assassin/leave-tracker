import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Notification from '../ui/Notification';

export default function ProtectedLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log('Toggling sidebar, isSidebarOpen:', !isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex">
      <Notification />
      {/* Backdrop for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/40 z-20 sm:hidden"
          onClick={toggleSidebar}
        />
      )}
      {/* Sidebar wrapper */}
      <div
        className={`fixed top-0 bottom-0 z-30 w-3/4 sm:w-64 transform transition-transform duration-300 ease-in-out will-change-transform overflow-hidden ${isSidebarOpen ? 'translate-x-0' : 'translate-x-[-100%]'
          } sm:translate-x-0`}
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
      >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-20 h-16 bg-white sm:ml-64">
          <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        </div>
        <main
          className="flex-1 mt-16 p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-4rem)] sm:ml-64"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}