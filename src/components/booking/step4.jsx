function Step4({ userInfo, setUserInfo }) {
  return (
    <div className="flex flex-col">
      <div className="mb-8 lg:mb-10">
        <h1 className="text-[2rem] lg:text-[3rem] text-white">
          Personal Information
        </h1>
        <p className="text-lg text-text-secondary mt-2">
          We need some details to complete your booking
        </p>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 
        [&>div]:flex [&>div]:flex-col [&>div]:gap-3
        [&_input]:w-full [&_input]:text-lg  [&_input]:lg:text-xl [&_input]:bg-gray-dark 
        [&_.input]:flex [&_.input]:items-center [&_.input]:gap-2 [&_.input]:text-white
         [&_.input]:rounded-2xl  [&_input]:placeholder:italic
        [&_.input]:bg-gray-dark [&_.input]:p-[20px] [&_.input]:lg:p-[28px]
        [&_svg]:h-[1em] [&_svg]:opacity-50"
      >
        {/* firstname */}
        <div>
          <label className="text-lg lg:text-2xl text-white">First-name :</label>

          <label className="input validator border border-border-dark focus-within:border-blue-action">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>

            <input
              type="text"
              required
              placeholder="firstname"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minlength="3"
              maxlength="30"
              title="Only letters, numbers or dash"
              value={userInfo.firstName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, firstName: e.target.value })
              }
            />
          </label>
        </div>

        {/* lastname */}
        <div>
          <label className="text-lg lg:text-2xl text-white">Last-name :</label>

          <label className="input validator border-border-dark focus-within:border-blue-action">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </g>
            </svg>

            <input
              type="text"
              required
              placeholder="lastname"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minlength="3"
              maxlength="30"
              title="Only letters, numbers or dash"
              value={userInfo.lastName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, lastName: e.target.value })
              }
            />
          </label>
        </div>

        {/* email */}
        <div>
          <label className="text-lg lg:text-2xl text-white">E-mail :</label>

          <label className="input validator border-border-dark focus-within:border-blue-action">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>

            <input
              type="email"
              placeholder="example@mail.com"
              required
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />
          </label>

          <div className="validator-hint hidden">Enter valid email address</div>
        </div>

        {/* phone number */}
        <div>
          <label className="text-lg lg:text-2xl text-white">Phone No :</label>

          <label className="input validator border-border-dark focus-within:border-blue-action">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <g fill="none">
                <path
                  d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>

            <input
              type="tel"
              className="tabular-nums"
              required
              placeholder="phone"
              pattern="[0-9]*"
              minLength="10"
              maxLength="10"
              value={userInfo.phone}
              onChange={(e) =>
                setUserInfo({ ...userInfo, phone: e.target.value })
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default Step4;
