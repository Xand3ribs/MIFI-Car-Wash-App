function Header() {
  return (
    <div className="navbar bg-white lg:pt-5 lg:pb-4 lg:px-3 pt-16 pb-8 px-6">
        <div className="container flex flex-row w-full justify-between ">

            {/* logo */}
            <h1 className="text-[2.5rem]">MiFai Wash</h1>

            {/* Log in */}
            <div class="btn bg-blue-action text-white rounded-field w-auto">Log In</div>
        
        </div>
    </div>
  );
}

export default Header;