import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import ProtectedLayout from './components/layout/ProtectedLayout';

const Login = lazy(() => import('./pages/Login'));
const EmployeeDashboard = lazy(() => import('./pages/employee/Dashboard'));
const Colleagues = lazy(() => import('./pages/employee/Colleagues'));
const ColleagueDetail = lazy(() => import('./pages/employee/components/ColleagueDetail'));
const Profile = lazy(() => import('./pages/employee/Profile'));
const ApplyLeave = lazy(() => import('./pages/employee/leave/Apply'));
const HRDashboard = lazy(() => import('./pages/hr/Dashboard'));
const Accounts = lazy(() => import('./pages/hr/Accounts'));
const ManagerDashboard = lazy(() => import('./pages/manager/Dashboard'));
const Approvals = lazy(() => import('./pages/manager/Approvals'));
const TechLeadDashboard = lazy(() => import('./pages/tech-lead/Dashboard'));
const Team = lazy(() => import('./pages/tech-lead/Teams'));
const LeavePolicy = lazy(() => import('./components/LeavePolicy'))

const routes = {
  public: [{ path: '/', element: <Login /> }],
  protected: [
    { path: '/employee/dashboard', element: <EmployeeDashboard /> },
    { path: '/employee/colleagues', element: <Colleagues /> },
    { path: '/employee/colleagues/:id', element: <ColleagueDetail /> },
    { path: '/employee/profile', element: <Profile /> },
    { path: '/employee/leave/apply', element: <ApplyLeave /> },
    { path: '/hr/dashboard', element: <HRDashboard /> },
    { path: '/hr/accounts', element: <Accounts /> },
    { path: '/manager/dashboard', element: <ManagerDashboard /> },
    { path: '/manager/approvals', element: <ManagerDashboard /> },
    { path: '/tech-lead/dashboard', element: <TechLeadDashboard /> },
    { path: '/tech-lead/team', element: <Team /> },
    { path: '/employee/leave-policy', element: <LeavePolicy /> }
  ],
};

export default function App() {
  return (
    <ThemeProvider>
      {/* <BrowserRouter> */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900">Loading...</div>}>
        <Routes>
          {routes.public.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route element={<ProtectedLayout />}>
            {routes.protected.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<div className="text-center text-gray-900 dark:text-gray-100 p-8 bg-gray-50 dark:bg-gray-900">404 - Page Not Found</div>} />
          </Route>
        </Routes>
      </Suspense>
      {/* </BrowserRouter> */}
    </ThemeProvider>
  );
}