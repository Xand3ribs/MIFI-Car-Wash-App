import { Link } from 'react-router-dom';

export default function SuccessModal({ isLoggedIn, activeUser, userInfo }) {
  const getDisplayName = () => {
    if (userInfo?.firstName) return userInfo.firstName;
    if (activeUser?.user_metadata?.first_name)
      return activeUser.user_metadata.first_name;
    return 'Client';
  };

  const getDashboardRedirectPath = () => {
    const role = activeUser?.user_metadata?.role || activeUser?.role;

    if (role === 'admin') return '/account/admin/dashboard';
    if (role === 'washer') return '/account/washer/dashboard';
    return '/account/dashboard'; 
  };

  const displayName = getDisplayName();
  const redirectPath = getDashboardRedirectPath();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-gray-dark border border-border-dark rounded-3xl p-8 text-center 
      shadow-[0_0_60px_rgba(0,200,255,0.1)] animate-in fade-in zoom-in-95 duration-200">
        {/* Animated Green Checkmark Badge */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl scale-150" />
            <div className="relative bg-green-500/15 border border-green-500/30 p-5 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <h3 className="font-bold text-3xl text-white mb-2">
          Booking Confirmed!
        </h3>
        <p className="text-text-secondary text-base leading-relaxed mb-8">
          Thank you,{' '}
          <span className="text-white font-semibold">{displayName}</span>. A
          confirmation email is on its way.
        </p>

        {/* Action Button — Now completely dynamic! */}
        <Link
          to={redirectPath}
          className="block w-full py-4 rounded-2xl bg-blue-action text-navy-deep font-bold text-lg transition-all 
          duration-200 shadow-[0_0_24px_rgba(0,200,255,0.3)] hover:brightness-110 active:scale-[0.98]"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
