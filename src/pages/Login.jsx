import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import mifaiNavLogo from '/src/assets/mifai-navlogo.png';
import {
  LoginPhase,
  ForgotPhase,
  ForgotSentPhase,
} from '../components/auth/LoginPhases';

function Login() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('login');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateLogin = () => {
    const next = {};
    if (!identifier.trim()) next.identifier = 'Email is required.';
    if (!password) next.password = 'Password is required.';
    else if (password.length < 8)
      next.password = 'Password must be at least 8 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;
    setIsLoading(true);
    setErrors({});
    try {
      // 1. Authenticate credentials via Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email: identifier.trim(),
          password,
        }
      );

      if (authError) throw authError;

      // 2. Query target tables using .maybeSingle() to prevent empty results from throwing errors
      const [admin, washer] = await Promise.all([
        supabase
          .from('admin_profiles')
          .select('id')
          .eq('id', data.user.id)
          .maybeSingle(),
        supabase
          .from('washer_profiles')
          .select('id')
          .eq('id', data.user.id)
          .maybeSingle(),
      ]);

      // 3. Route cleanly based on which profile evaluation returns positive data
      if (admin.data) {
        navigate('/account/admin/dashboard');
      } else if (washer.data) {
        navigate('/account/washer/dashboard');
      } else {
        navigate('/account/dashboard');
      }
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
      const { error } = await supabase.auth.resetPasswordForEmail(
        recoveryEmail.trim()
      );
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
        <div className="flex flex-col items-center mb-8">
          <Link to="/">
            <img
              src={mifaiNavLogo}
              alt="MiFai Wash"
              className="h-[100px] w-auto mb-1"
            />
          </Link>
          <div className="text-center" key={phase}>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white">
              {phase === 'login' ? 'Welcome back' : 'Reset password'}
            </h1>
          </div>
        </div>

        {phase === 'login' && (
          <LoginPhase
            identifier={identifier}
            setIdentifier={setIdentifier}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
            errors={errors}
            setErrors={setErrors}
            goToForgot={() => {
              setErrors({});
              setRecoveryEmail(identifier.includes('@') ? identifier : '');
              setPhase('forgot');
            }}
            handleLogin={handleLogin}
          />
        )}

        {phase === 'forgot' && (
          <ForgotPhase
            recoveryEmail={recoveryEmail}
            setRecoveryEmail={setRecoveryEmail}
            isLoading={isLoading}
            errors={errors}
            setErrors={setErrors}
            handleRecovery={handleRecovery}
            goToLogin={() => setPhase('login')}
          />
        )}

        {phase === 'forgot-sent' && (
          <ForgotSentPhase
            recoveryEmail={recoveryEmail}
            goToLogin={() => setPhase('login')}
          />
        )}
      </div>
    </div>
  );
}

export default Login;
