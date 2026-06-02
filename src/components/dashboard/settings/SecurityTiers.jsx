import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';

export default function SecurityTiers() {
  return (
    <div className="text-slate-400 text-sm flex flex-col items-center justify-center p-8 border border-dashed border-slate-800 rounded-2xl bg-navy-deep/20">
      <AlertCircle size={28} className="text-slate-600 mb-2" />
      <h4 className="font-bold text-slate-300 text-center mb-1">Encrypted Credential Verification</h4>
      <p className="text-xs text-slate-500 text-center max-w-xs">
        Secure password reset procedures and cryptographic authorization updates are currently in staging.
      </p>
    </div>
  );
}