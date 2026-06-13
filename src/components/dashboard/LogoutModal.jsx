// components/LogoutModal.jsx
import { createPortal } from 'react-dom'; // 1. Imported portal engine
import { LogOut, X } from 'lucide-react';

/**
 * LogoutModal
 *
 * Props:
 * isOpen    — boolean   — controls DaisyUI modal visibility
 * onClose   — function  — called when user cancels
 * onConfirm — function  — called when user confirms logout
 */
function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  // 2. Wrap your entire component markup layout inside createPortal
  return createPortal(
    <div className="modal modal-open fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop: clicks outside dismiss the modal */}
      <div
        className="modal-backdrop fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal box */}
      <div
        className="modal-box relative bg-gray-dark border border-border-dark
        rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.6)] max-w-sm w-full p-8
        flex flex-col items-center text-center gap-5 z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close (X) — top-right corner */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-1.5 rounded-xl text-white/30
            hover:text-white hover:bg-white/8 transition-colors duration-200"
        >
          <X size={16} strokeWidth={2} />
        </button>

        {/* Icon badge with a soft red glow */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full bg-red-500/20 blur-xl scale-150"
            aria-hidden="true"
          />
          <div
            className="relative w-16 h-16 rounded-2xl
            bg-red-500/10 border border-red-500/25
            flex items-center justify-center"
          >
            <LogOut size={26} className="text-red-400" strokeWidth={1.75} />
          </div>
        </div>

        {/* Heading + supporting copy */}
        <div>
          <h3 className="text-xl font-bold text-white mb-1.5">Log out?</h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            You'll be signed out of your account. Any unsaved changes will be
            lost.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 w-full mt-1">
          {/* Cancel — ghost/outline */}
          <button
            onClick={onClose}
            className="btn flex-1 bg-transparent border border-border-dark
              text-white/70 hover:text-white hover:border-white/30
              rounded-2xl transition-all duration-200 active:scale-[0.97]"
          >
            Cancel
          </button>

          {/* Confirm — red danger accent */}
          <button
            onClick={onConfirm}
            className="btn flex-1 bg-red-500 hover:bg-red-600 border-none
              text-white font-bold rounded-2xl
              shadow-[0_4px_20px_rgba(239,68,68,0.35)]
              hover:shadow-[0_4px_28px_rgba(239,68,68,0.5)]
              active:scale-[0.97] transition-all duration-200"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>,
    document.body // 3. Forces the modal layout directly into the HTML body element node root
  );
}

export default LogoutModal;
