import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout'; 
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboardView from './components/dashboard/adminDashboard';
import WasherDashboardView from './components/dashboard/WasherDashboard';

export default function AppRoutes({ user }) { // <-- Accept the user prop here
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<Login />} />

      {/* Grouped Account Routes */}
      <Route path="/account" element={<DashboardLayout user={user}/>}>
        {/* Redirect /account to /account/dashboard automatically */}
        <Route index element={<Navigate to="/account/dashboard" replace />} />

        {/* DASHBOARD ROUTE GATEWAY:
          When navigating to /account/dashboard, we check the user role.
          - If 'user', load Client Dashboard.
          - Otherwise, kick them to their role-specific path (/dashboard/admin or /dashboard/washer)
        */}
        <Route path="dashboard" element={
          user.role === 'user' 
            ? <UserDashboard /> 
            : <Navigate to={`/account/dashboard/${user.role}`} replace />
        } />

        {/* Admin Dashboard Control Room */}
        <Route path="dashboard/admin" element={
          user.role === 'admin' 
            ? <AdminDashboardView /> 
            : <Navigate to="/account/dashboard" replace />
        } />

        {/* Washer Dashboard Job Board */}
        <Route path="dashboard/washer" element={
          user.role === 'washer' 
            ? <WasherDashboardView /> 
            : <Navigate to="/account/dashboard" replace />
        } />

        {/* Shared Utilities Panels */}
        <Route path="history" element={<div>History Page coming soon...</div>} />
        <Route path="settings" element={<div>Settings Page coming soon...</div>} />
      </Route>

      {/* Fallback for 404s */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}