import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Login from './pages/Login';
import DashboardLayout from './layouts/DashboardLayout'; // Your new Layout
import UserDashboard from './components/dashboard/UserDashboard';
// import HistoryPage from './pages/HistoryPage'; // Import these as you create them

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<Login />} />

      {/* Grouped Account Routes */}
      <Route path="/account" element={<DashboardLayout />}>
        {/* 1. Redirect /account to /account/dashboard automatically */}
        <Route index element={<Navigate to="/account/dashboard" replace />} />

        {/* 2. These render inside the DashboardLayout Outlet */}
        <Route path="dashboard" element={<UserDashboard />} />
        <Route
          path="history"
          element={<div>History Page coming soon...</div>}
        />
        <Route
          path="settings"
          element={<div>Settings Page coming soon...</div>}
        />
      </Route>

      {/* Fallback for 404s */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
