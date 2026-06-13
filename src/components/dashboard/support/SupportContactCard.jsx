import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function SupportContactCard({
  icon: Icon,
  title,
  description,
  actionText,
  actionLink,
  type,
}) {
  // Compute the correct URI prefix depending on channel type
  const hrefPrefix = type === 'email' ? 'mailto:' : 'tel:';

  return (
    <div className="bg-gray-dark border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700/60 transition-colors">
      <div className="flex items-start gap-4">
        {/* Dynamic Icon Container */}
        <div className="p-3 bg-blue-action/10 text-blue-action rounded-2xl shrink-0">
          <Icon size={22} />
        </div>

        {/* Text Details */}
        <div>
          <h3 className="text-base font-black text-slate-100">{title}</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Outbound Communication Trigger */}
      <a
        href={`${hrefPrefix}${actionLink}`}
        className="mt-6 flex items-center justify-between bg-navy-deep hover:bg-navy-deep/80 text-xs font-black uppercase tracking-wider text-blue-action py-3 px-4 
        rounded-xl border border-slate-800 transition-colors"
      >
        <span>{actionText}</span>
        <ChevronRight size={14} />
      </a>
    </div>
  );
}
