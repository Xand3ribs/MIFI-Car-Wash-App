import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

function DashboardNav({ user }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(user?.id);
  const location = useLocation();

  // Detect if the current user is in an admin route or has an admin role
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (user?.id) {
      setCurrentUserId(user.id);
      return;
    }

    async function getActiveUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUserId(session.user.id);
      }
    }
    getActiveUser();
  }, [user]);

  useEffect(() => {
    if (!currentUserId && !isAdminRoute) return;

    async function fetchNotifications() {
      let query = supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(15);

      // If not an admin, filter strictly by the logged-in user's ID
      if (!isAdminRoute && currentUserId) {
        query = query.eq('user_id', currentUserId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching notifications:', error);
      } else {
        setNotifications(data || []);
        setUnreadCount((data || []).filter((n) => !n.is_read).length);
      }
    }

    fetchNotifications();

    // Setup real-time subscription matching the context
    let channelConfig = {
      event: 'INSERT',
      schema: 'public',
      table: 'notifications',
    };

    if (!isAdminRoute && currentUserId) {
      channelConfig.filter = `user_id=eq.${currentUserId}`;
    }

    const channel = supabase
      .channel(`public:notifications:${isAdminRoute ? 'admin' : currentUserId}`)
      .on('postgres_changes', channelConfig, (payload) => {
        setNotifications((prev) => [payload.new, ...prev]);
        setUnreadCount((prev) => prev + 1);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId, isAdminRoute]);

  const handleNotificationClick = async (e, notification) => {
    e.stopPropagation();

    if (!notification.is_read) {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notification.id);

      if (!error) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, is_read: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    }
  };

  return (
    <div className="navbar bg-navy-deep shadow-sm border-b border-border-dark fixed top-0 left-0 w-full z-[40] flex-shrink-0">
      <div className="container flex justify-between">
        <div className="flex-none xl:hidden">
          <label
            htmlFor="sidebar-drawer"
            aria-label="open sidebar"
            className="btn btn-circle btn-ghost text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-6 w-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>

        <div className="flex items-center gap-6">
          <Link to={isAdminRoute ? "/admin/dashboard" : "/account/dashboard"} className="flex items-center">
            <img
              src="/src/assets/mifai-navlogo.png"
              alt="MiFai Wash"
              style={{ width: '200px', height: '80px' }}
            />
          </Link>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open notifications"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                {unreadCount > 0 && (
                  <span className={`indicator-item badge ${isAdminRoute ? 'badge-error' : 'badge-info'}`}>
                    {unreadCount}
                  </span>
                )}

                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-gray-dark border border-border-dark z-[100] mt-3 w-80 shadow-xl"
            >
              <div className="card-body p-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
                  <h3 className="font-bold text-white text-sm">
                    {isAdminRoute ? 'System Alerts' : 'Notifications'}
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    {unreadCount} unread
                  </span>
                </div>

                {/* Scrollable container with height constraint */}
                <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={(e) => handleNotificationClick(e, n)}
                        className={`p-2.5 rounded-xl cursor-pointer transition-colors border ${
                          n.is_read
                            ? 'bg-slate-900/40 border-slate-800 text-slate-400'
                            : 'bg-slate-800 border-blue-500/30 text-white hover:bg-slate-700'
                        }`}
                      >
                        <p className="text-xs font-semibold">{n.title || (isAdminRoute ? 'Admin Alert' : 'Notification')}</p>
                        <p className="text-[11px] text-slate-300 mt-0.5">{n.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-xs text-center py-4 italic">
                      {isAdminRoute ? 'No system notifications.' : 'No notifications yet.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNav;