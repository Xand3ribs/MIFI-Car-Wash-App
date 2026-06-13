import React from 'react';
import { useParams, useNavigate, Outlet, Link } from 'react-router-dom';
import {
  User,
  Home,
  Shield,
  CreditCard,
  ChevronRight,
  ArrowLeft,
  Users,
  UserPlus,
} from 'lucide-react';

export default function SettingsView({ user }) {
  const { '*': subRoute } = useParams();
  const navigate = useNavigate();

  const isWasher = user?.role === 'washer';
  const isAdmin = user?.role === 'admin';

  // Clean up trailing/leading slashes from the wildcard parameter
  const cleanSubRoute = subRoute?.replace(/^\/|\/$/g, '') || '';

  const activeTab = cleanSubRoute === '' ? 'profile' : cleanSubRoute;

  // Force absolute path navigation to prevent URL stacking spirals
  const handleTabChange = (pathKey) => {
    navigate(`/account/settings/${pathKey}`);
  };

  const getMenuItems = () => {
    if (isAdmin) {
      return [
        {
          id: 'profile',
          label: 'Admin Identity Controls',
          shorthand: 'Profile',
          path: 'profile',
          icon: User,
        },
        {
          id: 'users',
          label: 'Customer Registry Log',
          shorthand: 'Customers',
          path: 'users',
          icon: Users,
        },
        {
          id: 'washers',
          label: 'Register Washer Crew',
          shorthand: 'Washer Crew',
          path: 'washers',
          icon: UserPlus,
        },
        {
          id: 'security',
          label: 'Account Security Tiers',
          shorthand: 'Security',
          path: 'security',
          icon: Shield,
        },
      ];
    }

    return [
      {
        id: 'profile',
        label: isWasher
          ? 'Partner Status & Contact'
          : 'Profile Identity Controls',
        shorthand: 'Profile',
        path: 'profile',
        icon: User,
      },
      ...(!isWasher
        ? [
            {
              id: 'address',
              label: 'Dispatch Location Ledger',
              shorthand: 'Addresses',
              path: 'address',
              icon: Home,
            },
          ]
        : []),
      {
        id: 'subscription',
        label: isWasher ? 'Bank Payout Methods' : 'Manage Subscription Plan',
        shorthand: isWasher ? 'Payout Details' : 'Subscription',
        path: 'subscription',
        icon: CreditCard,
      },
      {
        id: 'security',
        label: isWasher ? 'Security & Compliance' : 'Account Security Tiers',
        shorthand: 'Security',
        path: 'security',
        icon: Shield,
      },
    ];
  };

  const menuItems = getMenuItems();

  // Mobile navigation trigger check against clean route token
  const showingMobileSubPage = menuItems.some(
    (item) => item.path === cleanSubRoute
  );

  return (
    <div className="p-4 md:p-6 bg-navy-dark min-h-screen text-white">
      {/* SECTION HEADER */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-100">
          Account Settings
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          {/* * * CHANGE MADE HERE: Added contextual dynamic text for Admin role header subtitle * * */}
          {isAdmin
            ? 'Manage your administrative identity profile, audit registered customer files, onboard your laundry service crew, and verify internal security protocols.'
            : isWasher
              ? 'Manage your operational availability, linked bank settlement hubs, and compliance security settings.'
              : 'Configure your profile identity, personal addresses, subscription options, and credential security layers.'}
        </p>
      </div>

      {/* DESKTOP VIEWPORT FRAMEWORK (DaisyUI Radio Tabs) */}
      <div className="hidden lg:block">
        <div className="tabs tabs-lifted w-full">
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              <input
                type="radio"
                name="settings_tabs"
                className="tab text-xs text-slate-200 font-black uppercase tracking-wider h-12 [--tab-bg:#111827] [--tab-border-color:#1e293b]"
                aria-label={item.shorthand}
                checked={activeTab === item.id}
                onChange={() => handleTabChange(item.path)}
              />
              <div className="tab-content bg-gray-dark border-slate-800 max-w-full rounded-3xl p-8 shadow-xl">
                <Outlet />
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* MOBILE VIEWPORT FRAMEWORK */}
      <div className="lg:hidden">
        {!showingMobileSubPage ? (
          /* ROOT MOBILE MENU SELECTION INDEX */
          <div className="bg-gray-dark border border-slate-800 rounded-3xl overflow-hidden divide-y divide-slate-800/60 shadow-xl">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={`/account/settings/${item.path}`}
                  className="w-full px-5 py-4 flex items-center justify-between text-left active:bg-navy-deep/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className="text-blue-action" />
                    <span className="text-sm font-bold text-slate-200">
                      {item.label}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-slate-500" />
                </Link>
              );
            })}
          </div>
        ) : (
          /* ACTIVE PAGE SUB-ROUTE SCREEN CONTAINER */
          <div className="bg-gray-dark border border-slate-800 rounded-3xl p-5 md:p-6 shadow-xl">
            <button
              onClick={() => navigate('/account/settings')}
              className="flex items-center gap-1.5 text-xs font-black text-blue-action uppercase tracking-wider mb-6 pb-3 border-b border-slate-800/80 w-full text-left"
            >
              <ArrowLeft size={14} /> Back to settings menu
            </button>

            <div className="mt-2">
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
