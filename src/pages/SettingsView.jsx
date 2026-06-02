import React from 'react';
import { useParams, useNavigate, Outlet, Link } from 'react-router-dom';
import { User, Home, Shield, CreditCard, ChevronRight, ArrowLeft } from 'lucide-react';

export default function SettingsView() {
  const { '*': subRoute } = useParams();
  const navigate = useNavigate();

  // Clean up trailing/leading slashes from the wildcard parameter
  const cleanSubRoute = subRoute?.replace(/^\/|\/$/g, '') || '';
  
  // If the browser is at exactly '/account/settings', default the active tab highlighting to profile
  const activeTab = cleanSubRoute === '' ? 'profile' : cleanSubRoute;

  // Force absolute path navigation to prevent URL stacking spirals
  const handleTabChange = (pathKey) => {
    navigate(`/account/settings/${pathKey}`);
  };

  const menuItems = [
    { id: 'profile', label: 'Profile Identity Controls', shorthand: 'Profile', path: 'profile', icon: User },
    { id: 'address', label: 'Dispatch Location Ledger', shorthand: 'Addresses', path: 'address', icon: Home },
    { id: 'subscription', label: 'Manage Subscription Plan', shorthand: 'Subscription', path: 'subscription', icon: CreditCard },
    { id: 'security', label: 'Account Security Tiers', shorthand: 'Security', path: 'security', icon: Shield },
  ];

  // Mobile navigation trigger check against clean route token
  const showingMobileSubPage = menuItems.some(item => item.path === cleanSubRoute);

  return (
    <div className="p-6 bg-navy-dark min-h-screen text-white">

      {/* SECTION HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-black tracking-tight text-slate-100">Account Settings</h2>
        <p className="text-sm text-slate-400 mt-1">
          
        </p>
      </div>

    
      {/* DESKTOP VIEWPORT FRAMEWORK (DaisyUI Radio Tabs)       */}
    
      <div className="block">

        <div className="tabs tabs-lifted w-full">
          
          {/* PROFILE TAB */}
          <input 
            type="radio" 
            name="settings_tabs" 
            className="tab text-xs font-black uppercase tracking-wider  h-12 [--tab-bg:#111827] [--tab-border-color:#1e293b]" 
            aria-label="Profile"
            checked={activeTab === 'profile'}
            onChange={() => handleTabChange('profile')}
          />

          <div className="tab-content bg-gray-dark border-slate-800 rounded-3xl p-8 shadow-xl">
            <Outlet />
          </div>

          {/* ADDRESSES TAB */}
          <input 
            type="radio" 
            name="settings_tabs" 
            className="tab text-xs font-black uppercase tracking-wider h-12 [--tab-bg:#111827] [--tab-border-color:#1e293b]" 
            aria-label="Addresses" 
            checked={activeTab === 'address'}
            onChange={() => handleTabChange('address')}
          />
          <div className="tab-content bg-gray-dark border-slate-800 rounded-3xl p-8 shadow-xl">
            <Outlet />
          </div>

          {/* SUBSCRIPTION TAB */}
          <input 
            type="radio" 
            name="settings_tabs" 
            className="tab text-xs font-black uppercase tracking-wider h-12 [--tab-bg:#111827] [--tab-border-color:#1e293b]" 
            aria-label="Subscription" 
            checked={activeTab === 'subscription'}
            onChange={() => handleTabChange('subscription')}
          />
          <div className="tab-content bg-gray-dark border-slate-800 rounded-3xl p-8 shadow-xl">
            <Outlet />
          </div>

          {/* SECURITY TAB */}
          <input 
            type="radio" 
            name="settings_tabs" 
            className="tab text-xs font-black uppercase tracking-wider h-12 [--tab-bg:#111827] [--tab-border-color:#1e293b]" 
            aria-label="Security" 
            checked={activeTab === 'security'}
            onChange={() => handleTabChange('security')}
          />
          <div className="tab-content bg-gray-dark border-slate-800 rounded-3xl p-8 shadow-xl">
            <Outlet />
          </div>

        </div>
      </div>

     
      {/* MOBILE VIEWPORT FRAMEWORK */}
     
      <div className="hidden">
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
                    <span className="text-sm font-bold text-slate-200">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-500" />
                </Link>
              );
            })}
          </div>
        ) : (
          /* ACTIVE PAGE SUB-ROUTE SCREEN CONTAINER */
          <div className="bg-gray-dark border border-slate-800 rounded-3xl p-6 shadow-xl">
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