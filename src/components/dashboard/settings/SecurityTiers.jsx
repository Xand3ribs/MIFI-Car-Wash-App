import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { Lock } from 'lucide-react';

function Field({ label, hasError, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-white/60 uppercase tracking-widest">
        {label}
      </label>
      <label className={`input flex items-center gap-3 w-full bg-gray-dark rounded-2xl px-4 py-4 border transition-colors duration-200 
        focus-within:border-blue-action/70 ${hasError ? 'border-red-500/60' : 'border-border-dark'}`}>
        {children}
      </label>
    </div>
  );
}

function UpdatePassword() {
  const [pass, setPass] = useState({ new: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });

  const passwordMismatch = pass.confirm.length > 0 && pass.new !== pass.confirm;
  const passwordTooShort = pass.new.length > 0 && pass.new.length < 8;

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (passwordMismatch || passwordTooShort) return;

    setLoading(true);
    try {
      // Direct update without current password verification
      const { error: updateError } = await supabase.auth.updateUser({ 
        password: pass.new 
      });
      
      if (updateError) throw updateError;

      setFeedback({ type: 'success', text: 'Password updated successfully!' });
      setPass({ new: '', confirm: '' });
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="flex flex-col gap-8 w-full max-w-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* New Password Column */}
        <div className="flex flex-col gap-1.5">
          <Field label="New Password" hasError={passwordTooShort}>
            <Lock size={15} />
            <input 
              type="password" 
              required 
              placeholder="min. 8 characters" 
              value={pass.new} 
              onChange={(e) => setPass({...pass, new: e.target.value})} 
              className="flex-1 bg-transparent outline-none text-white text-lg placeholder:text-white/25 placeholder:italic" 
            />
          </Field>
          {pass.new.length > 0 && (
            <div className="flex items-center gap-2 mt-2 pl-1 animate-[fadeIn_0.2s_ease_both]">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`h-1 w-8 rounded-full transition-colors duration-300 ${pass.new.length >= 8 + i * 3 ? 'bg-green-400' : 'bg-white/10'}`} />
                ))}
              </div>
              <span className="text-xs text-white/40">
                {pass.new.length < 11 ? 'Fair' : pass.new.length < 14 ? 'Good' : 'Strong'}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password Column */}
        <div className="flex flex-col gap-1.5">
          <Field label="Confirm Password" hasError={passwordMismatch}>
            <Lock size={15} />
            <input 
              type="password" 
              required 
              placeholder="re-enter password" 
              value={pass.confirm} 
              onChange={(e) => setPass({...pass, confirm: e.target.value})} 
              className="flex-1 bg-transparent outline-none text-white text-lg placeholder:text-white/25 placeholder:italic" 
            />
          </Field>
          {passwordMismatch && (
            <p className="text-xs text-red-400 pl-1 animate-[fadeIn_0.2s_ease_both]">Passwords don't match.</p>
          )}
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading || passwordMismatch || !pass.new || !pass.confirm} 
        className="bg-blue-action text-navy-deep font-bold py-4 rounded-xl hover:brightness-110 disabled:opacity-50 transition-all"
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>

      {feedback.text && (
        <p className={`text-sm font-medium ${feedback.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
          {feedback.text}
        </p>
      )}

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </form>
  );
}

export default UpdatePassword;