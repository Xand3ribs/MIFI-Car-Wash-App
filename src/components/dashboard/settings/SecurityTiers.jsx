import React, { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseClient';
import { Lock, Trash2 } from 'lucide-react'; 
import DeleteAccountModal from '../user/DeleteAccountModal'; 
import { useAuth } from '../../../context/AuthContext';


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

  const { user } = useAuth();
  const [pass, setPass] = useState({ new: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);


  const passwordMismatch = pass.confirm.length > 0 && pass.new !== pass.confirm;
  const passwordTooShort = pass.new.length > 0 && pass.new.length < 8;

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (passwordMismatch || passwordTooShort) return;

    setLoading(true);
    try {
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
    <>

      <div className="flex flex-col gap-4"> 

        <form onSubmit={handleUpdate} className="flex flex-row items-center justify-between w-full">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6
          [&>div]:flex [&>div]:flex-col [&>div]:gap-1.5 [&>div]:w-[300px]">

            <div>
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

            <div>
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
            className="btn-lg bg-blue-action text-navy-deep font-bold p-2 rounded-xl hover:brightness-110 disabled:opacity-50 transition-all"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>

          {feedback.text && (
            <p className={`text-sm font-medium ${feedback.type === 'error' ? 'text-red-400' : 'text-emerald-400'}`}>
              {feedback.text}
            </p>
          )}
        </form>

        {user?.role?.toLowerCase().trim() === 'customer' && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-red-500 font-bold text-sm hover:text-red-400 self-start flex items-center gap-2 mt-10"
          >
            <Trash2 size={16} /> Delete account permanently
          </button>
        )}

      </div>

      <DeleteAccountModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}

export default UpdatePassword;