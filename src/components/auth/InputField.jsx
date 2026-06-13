export default function InputField({ label, icon: Icon, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-white/50">
        {Icon && <Icon size={12} />}
        {label}
      </label>
      <div
        className={`flex items-center gap-3 w-full bg-navy-deep border rounded-2xl px-5 py-4 transition-colors duration-200 focus-within:border-blue-action
          ${error ? 'border-red-500/60' : 'border-border-dark'}`}
      >
        {children}
      </div>
      {error && (
        <p className="text-xs text-red-400 pl-1 animate-[fadeIn_0.2s_ease_both]">
          {error}
        </p>
      )}
    </div>
  );
}