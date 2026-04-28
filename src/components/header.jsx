function Header() {
  return (
    <div className="navbar bg-navy-deep text-white">
        <div className="flex flex-col gap-1 items-start lg:pt-5 lg:pb-4 lg:px-3 pt-16 pb-8 px-6">
            <h1 className="text-[2.5rem]">MiFai Wash</h1>
            <p className="text-lg text-gray-300">Mobile Car wash on demand</p>
        </div>
    </div>
  );
}

export default Header;