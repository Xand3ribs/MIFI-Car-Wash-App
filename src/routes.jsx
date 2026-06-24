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
import SettingsView from './pages/SettingsView';
import ProfileForm from './components/dashboard/settings/ProfileForm';
import AddressLedger from './components/dashboard/settings/AddressLedger';
import SubscriptionManager from './components/dashboard/settings/SubscriptionManager';
import SecurityTiers from './components/dashboard/settings/SecurityTiers';
import SupportView from './pages/SupportView';
import EarningsLedger from './components/dashboard/washer/EarningsLedger';
import PayoutDetails from './components/dashboard/settings/PayoutDetails';
import AnalyticsView from './components/dashboard/admin/AnalyticsView';
import ManageWashers from './components/dashboard/settings/ManageWashers';
import ManageUsers from './components/dashboard/settings/ManageUsers';

export default function AppRoutes({ user }) {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<Login />} />

      {/* Grouped Account Routes */}
      <Route
        path="/account"
        element={
          user ? (
            <DashboardLayout user={user} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        {/* dashboard */}
        <Route index element={<Navigate to="/account/dashboard" replace />} />

        <Route
          path="dashboard"
          element={
            user?.role === 'user' ? (
              <UserDashboard />
            ) : (
              <Navigate to={`/account/${user?.role}/dashboard`} replace />
            )
          }
        />

        <Route
          path="admin/dashboard"
          element={
            user?.role === 'admin' ? (
              <AdminDashboardView />
            ) : (
              <Navigate to="/account/dashboard" replace />
            )
          }
        />

        <Route
          path="washer/dashboard"
          element={
            user?.role === 'washer' ? (
              <WasherDashboardView user={user} />
            ) : (
              <Navigate to="/account/dashboard" replace />
            )
          }
        />

        {/* analytics */}
        <Route
          path="admin/analytics"
          element={
            user?.role === 'admin' ? (
              <AnalyticsView />
            ) : (
              <Navigate to="/account/dashboard" replace />
            )
          }
        />

        {/* history */}
        <Route
          path="history"
          element={
            user?.role === 'user' ? (
              <HistoryView />
            ) : (
              <Navigate to="/account/dashboard" replace />
            )
          }
        />

        <Route
          path="washer/history"
          element={
            user?.role === 'washer' ? (
              <WasherHistoryView />
            ) : (
              <Navigate to="/account/dashboard" replace />
            )
          }
        />

        {/* settings */}
        <Route path="settings/*" element={<SettingsView user={user} />}>
          <Route index element={<ProfileForm user={user} />} />
          <Route path="profile" element={<ProfileForm user={user} />} />
          <Route path="washers" element={<ManageWashers />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="address" element={<AddressLedger />} />
          <Route
            path="subscription"
            element={
              user?.role === 'washer' ? (
                <PayoutDetails />
              ) : (
                <SubscriptionManager />
              )
            }
          />
          <Route path="security" element={<SecurityTiers />} />
        </Route>

        {/* support */}
        <Route path="contact" element={<SupportView role={user?.role} />} />

        {/* earning ledger */}
        <Route
          path="washer/earnings"
          element={
            user?.role === 'washer' ? (
              <EarningsLedger />
            ) : (
              <Navigate to="/account/dashboard" replace />
            )
          }
        />
      </Route>

      {/* Fallback for 404s */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
