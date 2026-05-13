import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="navbar bg-white lg:pt-5 lg:pb-4 lg:px-3 pt-3 pb-3 px-2">
      <div className="container flex flex-row w-full justify-between ">
        {/* logo */}
        <a href="/" className="flex items-center">
          <img 
            src="src\assets\mifai-logo.png" 
            alt="MiFai Wash - Home" 
            className="h-[100px] w-auto" 
          />
        </a>
        {/* Log in */}
       <Link to="/login" className="hidden btn bg-blue-action text-white rounded-field w-auto lg:flex">
          Log In
        </Link>

        <div className="btn btn-circle btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-circle-user-round-icon lucide-circle-user-round"
          >
            <path d="M17.925 20.056a6 6 0 0 0-11.851.001" />
            <circle cx="12" cy="11" r="4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Header;
