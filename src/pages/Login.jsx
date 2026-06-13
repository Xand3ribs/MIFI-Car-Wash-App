import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { supabase } from '../supabaseClient';
import mifaiNavLogo from '/src/assets/mifai-navlogo.png';
import { LoginPhase, ForgotPhase, ForgotSentPhase } from '../components/auth/LoginPhases';

function Login() {
  const navigate = useNavigate();
  const [phase, setPhase]                 = useState('login');
  const [identifier, setIdentifier]     = useState('');
  const [password, setPassword]         = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading]       = useState(false);
  const [errors, setErrors]             = useState({});

  const validateLogin = () => {
    const next = {};
    if (!identifier.trim()) next.identifier = 'Email is required.';
    if (!password)           next.password   = 'Password is required.';
    else if (password.length < 8) next.password = 'Password must be at least 8 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;
    setIsLoading(true);
    setErrors({});
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: identifier.trim(),
        password,
      });
      if (error) throw error;
      navigate('/account/dashboard'); 
    } catch (error) {
      setErrors({ identifier: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecovery = async () => {
    if (!recoveryEmail.trim() || !recoveryEmail.includes('@')) {
      return setErrors({ recovery: 'Enter a valid email address.' });
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(recoveryEmail.trim());
      if (error) throw error;
      setPhase('forgot-sent');
    } catch (error) {
      setErrors({ recovery: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-deep flex items-center justify-center px-5">
      <div className="relative w-full max-w-md bg-gray-dark border border-border-dark rounded-[2.5rem] p-8 lg:p-12 shadow-[0_0_60px_rgba(0,0,0,0.5),0_0_30px_rgba(0,200,255,0.06)] overflow-hidden">
        
        <div className="absolute top-0 left-[10%] right-[10%] h-[2px] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-blue-action to-transparent animate-[chargeBar_1.2s_ease_both]" style={{ opacity: 0.8 }} />
        </div>

        <div className="flex flex-col items-center mb-8">
          <Link to="/"><img src={mifaiNavLogo} alt="MiFai Wash" className="h-[100px] w-auto mb-1 hover:opacity-90 transition-opacity" /></Link>
          <div className="text-center" key={phase}>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight animate-[fadeSlideUp_0.3s_ease_both]">
              {phase === 'login' ? 'Welcome back' : phase === 'forgot' ? 'Reset password' : 'Check your inbox'}
            </h1>
            <p className="text-text-secondary text-sm mt-2 animate-[fadeSlideUp_0.35s_ease_both]">
              {phase === 'login' ? 'Sign in to manage your bookings' : phase === 'forgot' ? "We'll email you a recovery link" : <>A link was sent to <span className="text-blue-action font-semibold">{recoveryEmail}</span></>}
            </p>
          </div>
        </div>

        {/* Phase Router Strategy */}
        {phase === 'login' && (
          <LoginPhase 
            identifier={identifier} setIdentifier={setIdentifier} password={password} setPassword={setPassword}
            showPassword={showPassword} setShowPassword={setShowPassword} isLoading={isLoading} errors={errors} setErrors={setErrors}
            goToForgot={() => { setErrors({}); setRecoveryEmail(identifier.includes('@') ? identifier : ''); setPhase('forgot'); }}
            handleLogin={handleLogin}
          />
        )}

        {phase === 'forgot' && (
          <ForgotPhase 
            recoveryEmail={recoveryEmail} setRecoveryEmail={setRecoveryEmail} isLoading={isLoading} errors={errors} setErrors={setErrors}
            handleRecovery={handleRecovery} goToLogin={() => { setErrors({}); setPhase('login'); }}
          />
        )}

        {phase === 'forgot-sent' && <ForgotSentPhase recoveryEmail={recoveryEmail} goToLogin={() => { setErrors({}); setPhase('login'); }} />}

        <div className="mt-10 pt-6 border-t border-border-dark text-center">
          <p className="text-text-secondary text-sm">
            New to MiFai Wash? <Link to="/booking" className="text-blue-action hover:text-white font-bold transition-colors">Book your first wash</Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes chargeBar { from { opacity: 0; transform: scaleX(0); transform-origin: left; } to { opacity: 0.8; transform: scaleX(1); transform-origin: left; } }
      `}</style>
    </div>
  );
}

export default Login;