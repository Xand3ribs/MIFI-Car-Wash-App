import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  History,
  Bolt,
  UserRoundPen,
  Headphones,
  LogOut,
  ChartNoAxesCombined,
  UserCog,
  ClipboardClock, 
  Calendar,
  HandCoins,

} from 'lucide-react';

function SidebarPanel({ user }) {
  const baseStyle =
    'flex gap-2 text-xl items-center transition-all duration-200 p-4 border rounded-xl cursor-pointer';

  const getNavLinkStyle = ({ isActive }) => {
    return isActive
      ? `${baseStyle} bg-blue-action text-navy-deep border-blue-action shadow-lg`
      : `${baseStyle} border-transparent text-gray-400 hover:border-blue-action hover:text-white`;
  };

  return (
    <div className="h-full w-64 text-white px-4 py-8 flex flex-col justify-between overflow-y-auto bg-navy-deep">
      <div className="flex flex-col gap-4">
        <NavLink to="/account/dashboard" className={getNavLinkStyle}>
          <LayoutDashboard />
          Home
        </NavLink>

        {user?.role === 'admin' && (
          <>
            <NavLink to="/account/analytics" className={getNavLinkStyle}>
              <ChartNoAxesCombined />
              Analytics
            </NavLink>

            <NavLink to="/account/manage-washers" className={getNavLinkStyle}>
              <UserCog />
              Manage Washers
            </NavLink>

            <NavLink to="/account/manage-users" className={getNavLinkStyle}>
              <UserCog />
              Manage Users
            </NavLink>
          </>

        )}

        {user?.role === 'user' && (

          <>

             <NavLink to="/account/history" className={getNavLinkStyle}>
              <History />
              History
            </NavLink>

            <NavLink to="/account/contact" className={getNavLinkStyle}>
              <Headphones />
              Support
            </NavLink>
          </>
        )}

        {user?.role === 'washer' && (

          <>

            <NavLink to="/account/earnings" className={getNavLinkStyle}>
              <HandCoins />
              Earnings Ledger
            </NavLink>

            <NavLink to="/account/my-schedule" className={getNavLinkStyle}>
              <Calendar />
              My Schedule
            </NavLink>

            <NavLink to="/account/washer/history" className={getNavLinkStyle}>
              <ClipboardClock />
              Past Washes
            </NavLink>

          </>
         )}

        <NavLink to="/account/profile" className={getNavLinkStyle}>
          <UserRoundPen />
          Profile
        </NavLink>

        <NavLink to="/account/settings" className={getNavLinkStyle}>
          <Bolt />
          Settings
        </NavLink>

      </div>

      <div className="mt-auto">
        <div className="divider divider-neutral"></div>

        <NavLink
          to="/account/logout"
          className="flex gap-2 text-lg items-center bg-blue-action text-navy-deep rounded-xl p-4 cursor-pointer"
        >
          <LogOut />
          LogOut
        </NavLink>
      </div>
    </div>
  );
}

export default SidebarPanel;
