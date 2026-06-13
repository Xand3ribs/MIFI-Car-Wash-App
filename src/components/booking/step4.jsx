import { useState } from 'react';

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </g>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </g>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
    <g fill="none">
      <path d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z" fill="currentColor" />
    </g>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </g>
  </svg>
);

function Field({ label, hasError, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-white/60 uppercase tracking-widest">
        {label}
      </label>
      <label
        className={`
          input flex items-center gap-3 w-full
          bg-gray-dark rounded-2xl px-4 py-4
          border transition-colors duration-200
          [&_svg]:h-[1em] [&_svg]:opacity-40 [&_svg]:shrink-0
          focus-within:border-blue-action/70
          ${hasError ? 'border-red-500/60' : 'border-border-dark'}
        `}
      >
        {children}
      </label>
    </div>
  );
}

function Step4({ userInfo, setUserInfo }) {
  // confirmPassword is local-only — never needs to go up to Booking.jsx
  const [confirmPassword, setConfirmPassword] = useState('');

  // ── Validation state (all preserved from original) ────────────────────────
  const passwordsTyped  = userInfo.password.length > 0 && confirmPassword.length > 0;
  const passwordMismatch = passwordsTyped && userInfo.password !== confirmPassword;
  const passwordTooShort = userInfo.password.length > 0 && userInfo.password.length < 8;

  return (
    <div className="flex flex-col gap-8 w-full">

      {/* Page heading */}
      <div>
        <h1 className="text-[2rem] lg:text-[3rem] font-bold text-white leading-tight">
          Personal Information
        </h1>
        <p className="text-lg text-text-secondary mt-2">
          We need a few details to complete your booking and set up your account
        </p>
      </div>

      {/* ── Section: Identity ──────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-blue-action mb-4">
          Your Identity
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* First name — pattern preserved exactly */}
          <Field label="First Name">
            <UserIcon />
            <input
              type="text"
              required
              placeholder="firstname"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Only letters, numbers or dash"
              value={userInfo.firstName}
              onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
              className="flex-1 bg-transparent outline-none text-white text-lg
                placeholder:text-white/25 placeholder:italic"
            />
          </Field>

          {/* Last name — pattern preserved exactly */}
          <Field label="Last Name">
            <UserIcon />
            <input
              type="text"
              required
              placeholder="lastname"
              pattern="[A-Za-z][A-Za-z0-9\-]*"
              minLength="3"
              maxLength="30"
              title="Only letters, numbers or dash"
              value={userInfo.lastName}
              onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
              className="flex-1 bg-transparent outline-none text-white text-lg
                placeholder:text-white/25 placeholder:italic"
            />
          </Field>
        </div>
      </div>

      {/* ── Section: Contact ───────────────────────────────────────────── */}
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-blue-action mb-4">
          Contact Details
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Email */}
          <div className="flex flex-col gap-2">
            <Field label="Email">
              <EmailIcon />
              <input
                type="email"
                required
                placeholder="example@mail.com"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                className="flex-1 bg-transparent outline-none text-white text-lg
                  placeholder:text-white/25 placeholder:italic"
              />
            </Field>
            {/* Original validator-hint div preserved for DaisyUI compat */}
            <div className="validator-hint hidden text-xs text-red-400 pl-1">
              Enter a valid email address
            </div>
          </div>

          {/* Phone — minLength/maxLength/pattern preserved exactly */}
          <Field label="Phone Number">
            <PhoneIcon />
            <input
              type="tel"
              required
              placeholder="08012345678"
              pattern="[0-9]*"
              minLength="10"
              maxLength="10"
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              className="flex-1 bg-transparent outline-none text-white text-lg tabular-nums
                placeholder:text-white/25 placeholder:italic"
            />
          </Field>
        </div>
      </div>

      {/* ── Section: Account Security ──────────────────────────────────── */}
      <div>
        <p className="text-xs font-bold tracking-widest uppercase text-blue-action mb-4">
          Account Security
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <Field label="Password" hasError={passwordTooShort}>
              <LockIcon />
              <input
                type="password"
                required
                placeholder="min. 8 characters"
                minLength="8"
                value={userInfo.password}
                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                className="flex-1 bg-transparent outline-none text-white text-lg
                  placeholder:text-white/25 placeholder:italic"
              />
            </Field>
            {passwordTooShort && (
              <p className="text-xs text-red-400 pl-1 animate-[fadeIn_0.2s_ease_both]">
                Password must be at least 8 characters.
              </p>
            )}
          </div>

          {/* Confirm password — commit trick preserved exactly */}
          <div className="flex flex-col gap-1.5">
            <Field label="Confirm Password" hasError={passwordMismatch}>
              <LockIcon />
              <input
                type="password"
                required
                placeholder="re-enter password"
                value={confirmPassword}
                onChange={(e) => {
                  const value = e.target.value;
                  setConfirmPassword(value);
                  // Commit trick: blank the parent password when mismatch so
                  // Booking.jsx's isContinueDisabled blocks the button.
                  if (value === userInfo.password) {
                    setUserInfo({ ...userInfo, password: userInfo.password });
                  } else {
                    setUserInfo({ ...userInfo, password: '' });
                  }
                }}
                className="flex-1 bg-transparent outline-none text-white text-lg
                  placeholder:text-white/25 placeholder:italic"
              />
            </Field>
            {passwordMismatch && (
              <p className="text-xs text-red-400 pl-1 animate-[fadeIn_0.2s_ease_both]">
                Passwords don't match.
              </p>
            )}
          </div>
        </div>

        {/* Password strength hint row */}
        {userInfo.password.length >= 8 && !passwordTooShort && (
          <div className="flex items-center gap-2 mt-3 pl-1 animate-[fadeIn_0.2s_ease_both]">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i}
                  className={`h-1 w-8 rounded-full transition-colors duration-300
                    ${userInfo.password.length >= 8  + i * 3 ? 'bg-green-400' : 'bg-white/10'}`}
                />
              ))}
            </div>
            <span className="text-xs text-white/40">
              {userInfo.password.length < 11 ? 'Fair' : userInfo.password.length < 14 ? 'Good' : 'Strong'}
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default Step4;