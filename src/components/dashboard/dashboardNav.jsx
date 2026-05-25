import { Link } from 'react-router-dom';

function DashboardNav({user}) {
  return (
    <div className="navbar bg-navy-deep shadow-sm border-b border-border-dark fixed top-0 left-0 w-full z-[40] flex-shrink-0">
      <div className="container flex justify-between">
        {/* Hamburger menu */}
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

        {/* Logo and book now btn */}
        <div className="flex items-center gap-6">
          {/* logo */}
          <Link to="/account/dashboard" className="flex items-center">
            <img
              src="/src/assets/mifai-navlogo.png"
              alt="MiFai Wash - Login"
              style={{
                width: '200px',
                height: '80px',
              }}
            />
          </Link>
        </div>

        {/* notification dropdown */}
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <span class="indicator-item badge badge-info">8</span>

                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {' '}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />{' '}
                  </svg>
                </div>
              </div>
            </div>

            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-gray-dark z-1 mt-3 w-52 shadow"
            >
              <div className="card-body"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNav;
