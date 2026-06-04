import { useState } from 'react';
import { Link } from 'react-router-dom';
import mifaiNavLogo from '/src/assets/mifai-navlogo.png';

function Login() {
  // Phase 1: 'id' (Email/Phone), Phase 2: 'otp' (6-digit code)
  const [phase, setPhase] = useState('id');
  const [identifier, setIdentifier] = useState('');

  return (
    <div className="min-h-screen bg-navy-deep flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-gray-dark border border-border-dark rounded-[2.5rem] p-8 lg:p-12 shadow-2xl transition-all duration-500">
        {/* Header Section */}
        <div className="flex flex-col items-center  text-center mb-2">
          <a href="/" className="flex items-center">
            <img
              src={mifaiNavLogo}
              alt="MiFai Wash - Login"
              className="h-[125px] w-auto"
            />
          </a>

          <h1 className="text-xl lg:text-2xl font-bold text-white mb-6">
            {phase === 'id' ? 'Log-in' : 'Verify Account'}
          </h1>

          <p className="text-text-secondary text-lg">
            {phase === 'id' ? '' : `We sent a 6-digit code to ${identifier}`}
          </p>
        </div>

        {/* Phase 1: Identity Input */}
        {phase === 'id' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col gap-3">
              <label className="text-white text-lg ml-1">Email or Phone</label>
              <input
                type="text"
                placeholder="example@mail.com"
                className="w-full bg-navy-deep border border-border-dark text-white rounded-2xl p-5 text-lg focus:outline-none focus:border-blue-action transition-all placeholder:italic"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </div>

            <button
              onClick={() => setPhase('otp')}
              className="btn bg-blue-action text-navy-deep border-none hover:brightness-110 h-10 text-xl rounded-2xl font-bold mt-2"
            >
              Get Secure Code
            </button>
          </div>
        )}

        {/* Phase 2: OTP Input Grid */}
        {phase === 'otp' && (
          <div className="flex flex-col gap-8 animate-fadeIn">
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  className="w-full h-14 sm:h-16 bg-navy-deep border border-border-dark text-white text-center text-2xl font-bold rounded-xl focus:border-blue-action focus:outline-none transition-all"
                />
              ))}
            </div>

            <Link
              to="/account/dashboard"
              className="btn bg-blue-action text-navy-deep border-none h-16 text-xl rounded-2xl font-bold"
            >
              Verify & Enter
            </Link>

            <button
              onClick={() => setPhase('id')}
              className="text-blue-action hover:text-white text-center font-medium transition-colors"
            >
              Back to change details
            </button>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="mt-10 pt-8 border-t border-border-dark text-center">
          <p className="text-text-secondary text-sm">
            Didn't receive code ?{' '}
            <Link
              to="/booking"
              className="text-white hover:text-blue-action font-bold transition-all"
            >
              Click here to resend
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
