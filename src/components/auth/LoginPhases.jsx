import { Mail, KeyRound, Eye, EyeOff, Send, ArrowLeft } from 'lucide-react';
import InputField from './InputField';

export function LoginPhase({
  identifier,
  setIdentifier,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  goToForgot,
  handleLogin,
  isLoading,
  errors,
  setErrors,
}) {
  return (
    <div className="flex flex-col gap-5 animate-[fadeSlideUp_0.35s_ease_both]">
      <InputField label="Email" icon={Mail} error={errors.identifier}>
        <input
          type="email"
          placeholder="example@mail.com"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
            if (errors.identifier)
              setErrors((p) => ({ ...p, identifier: null }));
          }}
          className="flex-1 bg-transparent outline-none text-white text-lg placeholder:text-white/20 placeholder:italic"
        />
      </InputField>

      <InputField label="Password" icon={KeyRound} error={errors.password}>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((p) => ({ ...p, password: null }));
          }}
          className="flex-1 bg-transparent outline-none text-white text-lg placeholder:text-white/20 placeholder:italic"
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="text-white/30 hover:text-blue-action transition-colors shrink-0 p-0.5 rounded-lg focus:outline-none"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </InputField>

      <div className="flex justify-end -mt-2">
        <button
          type="button"
          onClick={goToForgot}
          className="text-sm text-white/40 hover:text-blue-action transition-colors font-medium"
        >
          Forgot password?
        </button>
      </div>

      <button
        onClick={handleLogin}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 w-full py-5 rounded-2xl bg-blue-action text-navy-deep text-lg font-extrabold tracking-wide active:scale-95 transition-all shadow-[0_0_24px_rgba(0,200,255,0.2)] hover:shadow-[0_0_36px_rgba(0,200,255,0.38)] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 mt-1"
      >
        {isLoading ? 'Signing in…' : 'Sign In'}
      </button>
    </div>
  );
}

export function ForgotPhase({
  recoveryEmail,
  setRecoveryEmail,
  handleRecovery,
  goToLogin,
  isLoading,
  errors,
  setErrors,
}) {
  return (
    <div className="flex flex-col gap-5 animate-[fadeSlideUp_0.35s_ease_both]">
      <InputField label="Recovery Email" icon={Mail} error={errors.recovery}>
        <input
          type="email"
          placeholder="example@mail.com"
          value={recoveryEmail}
          onChange={(e) => {
            setRecoveryEmail(e.target.value);
            if (errors.recovery) setErrors((p) => ({ ...p, recovery: null }));
          }}
          className="flex-1 bg-transparent outline-none text-white text-lg placeholder:text-white/20 placeholder:italic"
        />
      </InputField>

      <button
        onClick={handleRecovery}
        disabled={isLoading}
        className="flex items-center justify-center gap-2 w-full py-5 rounded-2xl bg-blue-action text-navy-deep text-lg font-extrabold tracking-wide active:scale-95 transition-all shadow-[0_0_24px_rgba(0,200,255,0.2)] hover:shadow-[0_0_36px_rgba(0,200,255,0.38)] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          'Sending…'
        ) : (
          <>
            <Send size={16} strokeWidth={2.5} /> Send Recovery Link
          </>
        )}
      </button>

      <button
        type="button"
        onClick={goToLogin}
        className="flex items-center justify-center gap-1.5 text-sm text-white/40 hover:text-blue-action transition-colors font-medium mx-auto"
      >
        <ArrowLeft size={13} strokeWidth={2.5} /> Back to sign in
      </button>
    </div>
  );
}

export function ForgotSentPhase({ recoveryEmail, goToLogin }) {
  return (
    <div className="flex flex-col items-center gap-6 text-center animate-[fadeSlideUp_0.35s_ease_both]">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-blue-action/15 blur-xl scale-150" />
        <div className="relative w-20 h-20 rounded-full bg-blue-action/10 border border-blue-action/25 flex items-center justify-center">
          <Mail size={32} className="text-blue-action" strokeWidth={1.5} />
        </div>
      </div>
      <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
        Follow the link in your email to set a new password. Check your spam
        folder if it doesn't arrive within a minute.
      </p>
      <button
        type="button"
        onClick={goToLogin}
        className="flex items-center gap-1.5 text-sm text-white/40 hover:text-blue-action transition-colors font-medium"
      >
        <ArrowLeft size={13} strokeWidth={2.5} /> Back to sign in
      </button>
    </div>
  );
}
