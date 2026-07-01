import React, { useState } from 'react';
import { supabase } from '../../../supabaseClient';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export default function DeleteAccountModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // inside DeleteAccountModal.jsx
  const handleDelete = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 1. Call the SQL function we created
      const { error } = await supabase.rpc('delete_user_account', {
        user_id: user.id,
      });
      if (error) throw error;

      // 2. Sign out and redirect
      await supabase.auth.signOut();
      window.location.href = '/login';
    } catch (err) {
      console.error('Delete error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-gray-dark border border-border-dark p-8 rounded-3xl w-full max-w-xl flex flex-col gap-6 shadow-2xl">
        <div className="flex justify-between items-center text-red-500">
          <AlertTriangle size={32} />
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="[&>p]:text-slate-400 [&>p]:text-sm [&>p]:mt-2">
          <h3 className="text-xl font-bold text-white mb-2">Delete Account?</h3>

          <p>
            This action is permanent and cannot be undone. All your bookings and
            history will be lost.
          </p>

          <p>Are you sure you want to delete ?</p>
        </div>

        <div
          className="flex flex-row justify-between items-center
        [&_.btn]:w-[150px]"
        >
          <button
            onClick={onClose}
            className="btn  bg-black-600 text-white font-bold py-3 rounded-xl transition-all"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="btn  bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
