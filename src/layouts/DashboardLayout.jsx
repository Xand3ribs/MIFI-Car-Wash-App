import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import DashboardNav from '../components/dashboard/dashboardNav';
import SidebarPanel from '../components/dashboard/SidebarPanel';
import UserDashboard from '../components/dashboard/UserDashboard';
import AdminDashboardView from '../components/dashboard/adminDashboard';
import Dock from '../components/dashboard/dock';

function DashboardLayout({ user }) {
  return (
    <div className="flex flex-col h-screen pt-20">
      {/* Navbar */}
      <DashboardNav user={user}/>

      {/* Page content here */}
      <div className="drawer flex-1 min-h-0">
        <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />

        <div className="overflow-hidden drawer-content flex h-full">
          <aside className="hidden xl:block h-full  shrink-0 bg-navy-deep sticky border-r  border-r-border-dark">
            <SidebarPanel user={user} />
          </aside>

          <main className="flex-1 h-full overflow-y-auto bg-navy-deep min-h-0">
            <Outlet context={user}/>
          </main>
        </div>

        <div className="drawer-side z-50">
          <label
            htmlFor="sidebar-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <SidebarPanel user={user}/>
        </div>
      </div>

      {/* <Dock /> */}
    </div>
  );
}

export default DashboardLayout;
