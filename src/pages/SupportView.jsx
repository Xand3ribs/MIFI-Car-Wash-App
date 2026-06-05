import React from 'react';
import { Mail, Phone } from 'lucide-react';
import SupportContactCard from '../components/dashboard/support/SupportContactCard';
import FaqAccordion from '../components/dashboard/support/FaqAccordion';

export default function Support() {
  // Operational FAQs data set
  const faqItems = [
    {
      id: 'faq-1',
      question: 'How do I reschedule an active booking?',
      answer: "Navigate to your active booking card on the main dashboard tab, select the scheduling parameters, and pick a new available time window that fits your day."
    },
    {
      id: 'faq-2',
      question: 'What happens if a washer is delayed due to traffic?',
      answer: "Our operations dispatch monitors our service teams in real time. If an unforeseen logistics delay occurs, you will receive an immediate alert and a direct coordination update via your contact phone number."
    },
    {
      id: 'faq-3',
      question: 'Can I change my address ledger locations after placing an order?',
      answer: "Address details are locked once a washer is dispatched to secure efficient routing. If you need an emergency correction before dispatch, use the Hotlines Operations channel above immediately."
    }
  ];

  return (
    <div className="p-6 bg-navy-dark min-h-screen text-white">
      {/* SECTION HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-black tracking-tight text-slate-100">Help & Support Hub</h2>
        <p className="text-sm text-slate-400 mt-1">
          Get assistance with your bookings, manage your account settings, or contact our operations team.
        </p>
      </div>

      {/* TOP: DIRECT CHANNELS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

        <SupportContactCard 
          icon={Mail}
          title="Electronic Helpdesk Ledger"
          description="File ticket inquiries regarding order corrections, payment issues."
          actionText="Contact Support Email"
          actionLink="support@mifaiwash.com"
          type="email"
        />

        <SupportContactCard 
          icon={Phone}
          title="Hotline Operations Line"
          description="Connect with our active on-ground dispatch team to adjust scheduling parameters in real-time."
          actionText="Initiate Direct Call"
          actionLink="+23480000000"
          type="phone"
        />
      </div>

      <hr className="border-slate-800 my-8" />

      {/* BOTTOM: FAQ ACCORDION SECTION */}
      <div className="max-w-4xl">
        <h3 className="text-base font-black text-slate-100 mb-4">Frequently Answered Queries</h3>
        <FaqAccordion items={faqItems} />
      </div>
    </div>
  );
}