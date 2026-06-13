import React from 'react';

export default function FaqAccordion({ items = [] }) {
  return (
    <div className="space-y-3 w-full">
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className="collapse collapse-plus bg-gray-dark border border-slate-800 rounded-2xl shadow-md"
        >
          <input
            type="radio"
            name="support-faq-accordion"
            defaultChecked={index === 0}
          />

          {/* Question Title */}
          <div className="collapse-title text-sm font-black text-slate-200 flex items-center pr-12">
            {item.question}
          </div>

          {/* Answer Content Panel */}
          <div className="collapse-content text-xs text-slate-400 leading-relaxed">
            <p className="pt-1">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
