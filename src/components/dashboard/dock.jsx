import { House, History, Bolt } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function Dock() {
  const baseStyle = 'flex flex-col items-center gap-1 text-sm';

  const getNavLinkStyle = ({ isActive }) => {
    return isActive
      ? `${baseStyle} border-b border-b-blue-action `
      : `${baseStyle} border border-transparent `;
  };

  return (
    <div className="flex lg:hidden dock border-t border-t-gray-300 bg-gray-dark text-white justify-around py-2">
      <NavLink to="/account/dashboard" className={getNavLinkStyle}>
        <House />
        <span className="">Home</span>
      </NavLink>

      <NavLink to="/account/history" className={getNavLinkStyle}>
        <History />
        <span className="">History</span>
      </NavLink>

      <NavLink to="/account/settings" className={getNavLinkStyle}>
        <Bolt />
        <span className="">Settings</span>
      </NavLink>
    </div>
  );
}

export default Dock;
