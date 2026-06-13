// components/SidebarPanel.jsx
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  History,
  Bolt,
  Headphones,
  LogOut,
  ChartNoAxesCombined,
  ClipboardClock,
  HandCoins,
} from 'lucide-react';

import LogoutModal from './LogoutModal'; // ← import the modal

function SidebarPanel({ user }) {
  const location = useLocation();
  const { signOut } = useAuth();

  // Single boolean drives the entire modal lifecycle — no extra state needed
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // ── Nav link style helpers (unchanged) ─────────────────────────────────────
  const baseStyle =
    'flex w-full gap-2 text-xl items-center transition-all duration-200 p-4 border rounded-xl cursor-pointer';

  const getNavLinkStyle = ({ isActive }) =>
    isActive
      ? `${baseStyle} bg-blue-action text-navy-deep border-blue-action shadow-lg`
      : `${baseStyle} border-transparent text-gray-400 hover:border-blue-action hover:text-white`;

  const getHomeLinkStyle = () => {
    const dashboardPaths = [
      '/account/dashboard',
      '/account/admin/dashboard',
      '/account/washer/dashboard',
    ];
    return dashboardPaths.includes(location.pathname)
      ? `${baseStyle} bg-blue-action text-navy-deep border-blue-action shadow-lg`
      : `${baseStyle} border-transparent text-gray-400 hover:border-blue-action hover:text-white`;
  };

  const getHomeRedirectPath = () => {
    if (user?.role === 'admin') return '/account/admin/dashboard';
    if (user?.role === 'washer') return '/account/washer/dashboard';
    return '/account/dashboard';
  };

  // ── Logout handlers ─────────────────────────────────────────────────────────
  const handleLogoutRequest = () => setIsLogoutModalOpen(true);
  const handleLogoutCancel = () => setIsLogoutModalOpen(false);
  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    signOut(); // Calls the real sign-out from AuthContext
  };

  return (
    <>
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <div className="h-full w-64 text-white px-4 py-8 flex flex-col justify-between overflow-y-auto bg-navy-deep">
        <div className="flex flex-col gap-4">
          <NavLink to={getHomeRedirectPath()} className={getHomeLinkStyle}>
            <LayoutDashboard />
            Home
          </NavLink>

          {user?.role === 'admin' && (
            <NavLink to="/account/admin/analytics" className={getNavLinkStyle}>
              <ChartNoAxesCombined />
              Analytics
            </NavLink>
          )}

          {user?.role === 'user' && (
            <NavLink to="/account/history" className={getNavLinkStyle}>
              <History />
              History
            </NavLink>
          )}

          {user?.role === 'washer' && (
            <>
              <NavLink
                to="/account/washer/earnings"
                className={getNavLinkStyle}
              >
                <HandCoins />
                Earnings Ledger
              </NavLink>
              <NavLink to="/account/washer/history" className={getNavLinkStyle}>
                <ClipboardClock />
                Past Washes
              </NavLink>
            </>
          )}

          {user?.role !== 'admin' && (
            <NavLink to="/account/contact" className={getNavLinkStyle}>
              <Headphones />
              Support
            </NavLink>
          )}

          <NavLink to="/account/settings" className={getNavLinkStyle}>
            <Bolt />
            Settings
          </NavLink>
        </div>

        <div className="mt-auto">
          <div className="h-px w-full bg-border-dark opacity-20 my-4" />

          {/* Opens the confirmation modal — does NOT call signOut directly */}
          <button
            onClick={handleLogoutRequest}
            className="flex w-full gap-2 text-lg items-center bg-blue-action
              text-navy-deep rounded-xl p-4 cursor-pointer font-bold
              hover:bg-opacity-90 transition-all shadow-md border border-transparent"
          >
            <LogOut size={20} />
            Log Out
          </button>
        </div>
      </div>

      {/* ── Modal — rendered outside the sidebar div to avoid stacking context issues */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}

export default SidebarPanel;
