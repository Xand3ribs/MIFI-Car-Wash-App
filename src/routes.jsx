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
  // Normalize role to lowercase and safeguard against undefined states
  const currentRole = user?.role?.toLowerCase();

  return (
    <Routes>
      {/* Public Routes - Kept completely independent so their local states never unmount */}
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<Login />} />

      {/* Grouped Account Routes */}
      <Route
        path="/account"
        element={
          !user ? (
            <Navigate to="/login" replace />
          ) : !currentRole ? (
            // FIXED: If the user is authenticated but their role profile is still loading,
            // freeze evaluation HERE. This prevents deep-linked sub-routes from misfiring
            // their fallback redirects.
            <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0D1B2A] gap-2 text-slate-400">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-[10px] font-black tracking-widest uppercase opacity-60">
                Verifying Profile...
              </p>
            </div>
          ) : (
            <DashboardLayout user={user} />
          )
        }
      >
        {/* Default index redirect */}
        <Route index element={<Navigate to="/account/dashboard" replace />} />

        {/* Dynamic Dashboard Landing Router */}
        <Route
          path="dashboard"
          element={
            currentRole === 'customer' ? (
              <UserDashboard />
            ) : (
              // Safely routes using the normalized, lowercase string
              <Navigate to={`/account/${currentRole}/dashboard`} replace />
            )
          }
        />

        <Route
          path="admin/dashboard"
          element={
            currentRole === 'admin' ? (
              <AdminDashboardView />
            ) : (
              <Navigate to="/account/dashboard" replace />
            )
          }
        />

        <Route
          path="washer/dashboard"
          element={
            currentRole === 'washer' ? (
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
            currentRole === 'admin' ? (
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
            currentRole === 'customer' ? (
              <HistoryView />
            ) : (
              <Navigate to="/account/dashboard" replace />
            )
          }
        />

        <Route
          path="washer/history"
          element={
            currentRole === 'washer' ? (
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
          <Route path="subscription" element={<SubscriptionManager />} />

          {/* <Route path="address" element={<AddressLedger />} /> */}
          {/* <Route
            path="subscription"
            element={
              currentRole === 'user' ? (
                <PayoutDetails />
              ) : (
                <SubscriptionManager />
              )
            }
          /> */}
          <Route path="security" element={<SecurityTiers />} />
        </Route>

        {/* support */}
        <Route path="contact" element={<SupportView role={currentRole} />} />

        {/* earning ledger */}
        <Route
          path="washer/earnings"
          element={
            currentRole === 'washer' ? (
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
