import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout'; 
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboardView from './components/dashboard/adminDashboard';
import WasherDashboardView from './components/dashboard/WasherDashboard';
import HistoryView from './components/dashboard/user/HistoryView';
import WasherHistoryView from './components/dashboard/washer/WasherHistoryView';
import ProfileView from './pages/ProfileView';

export default function AppRoutes({ user }) { 
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<Login />} />

      {/* Grouped Account Routes */}
      <Route path="/account" element={<DashboardLayout user={user}/>}>
       
        <Route index element={<Navigate to="/account/dashboard" replace />} />

        <Route path="dashboard" element={
          user.role === 'user' 
            ? <UserDashboard /> 
            : <Navigate to={`/account/${user.role}/dashboard`} replace />
        } />

        <Route path="admin/dashboard" element={
          user.role === 'admin' 
            ? <AdminDashboardView /> 
            : <Navigate to="/account/dashboard" replace />
        } />

        <Route path="washer/dashboard" element={
          user.role === 'washer' 
            ? <WasherDashboardView /> 
            : <Navigate to="/account/dashboard" replace />
        } />

        {/* 1. Dedicated Customer History Page */}
        <Route path="history" element={
          user.role === 'user' 
            ? <HistoryView /> 
            : <Navigate to="/account/dashboard" replace />
        } />

       
        <Route path="washer/history" element={
          user.role === 'washer' 
            ? <WasherHistoryView /> 
            : <Navigate to="/account/dashboard" replace />
        } />

        <Route path="profile" element={<ProfileView user={user} />} />

        <Route path="settings" element={<div>Settings Page coming soon...</div>} />
      </Route>

      {/* Fallback for 404s */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}