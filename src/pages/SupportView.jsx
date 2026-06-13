import React from 'react';
import { Mail, Phone, LifeBuoy } from 'lucide-react';
import SupportContactCard from '../components/dashboard/support/SupportContactCard';
import FaqAccordion from '../components/dashboard/support/FaqAccordion';

// Static data registry mapping based on user role context
const DATA_REGISTRY = {
  customer: {
    title: 'Help & Support Hub',
    subtitle:
      'Get assistance with your bookings, manage your account settings, or contact our operations team.',
    emailCard: {
      title: 'Electronic Helpdesk Ledger',
      description:
        'File ticket inquiries regarding order corrections, payment issues.',
      actionText: 'Contact Support Email',
      actionLink: 'support@mifaiwash.com',
    },
    phoneCard: {
      title: 'Hotline Operations Line',
      description:
        'Connect with our active on-ground dispatch team to adjust scheduling parameters in real-time.',
      actionText: 'Initiate Direct Call',
      actionLink: '+23480000000',
    },
    faqs: [
      {
        id: 'c-faq-1',
        question: 'How do I reschedule an active booking?',
        answer:
          'Navigate to your active booking card on the main dashboard tab, select the scheduling parameters, and pick a new available time window that fits your day.',
      },
      {
        id: 'c-faq-2',
        question: 'What happens if a washer is delayed due to traffic?',
        answer:
          'Our operations dispatch monitors our service teams in real time. If an unforeseen logistics delay occurs, you will receive an immediate alert and a direct coordination update.',
      },
      {
        id: 'c-faq-3',
        question:
          'Can I change my address ledger locations after placing an order?',
        answer:
          'Address details are locked once a washer is dispatched to secure efficient routing. If you need an emergency correction before dispatch, use the Hotlines Operations channel immediately.',
      },
    ],
  },
  washer: {
    title: 'Washer Support Operations',
    subtitle:
      'Access critical operational guides, manage payout disputes, or connect with live dispatch personnel.',
    emailCard: {
      title: 'Partner Earnings & Dispute Ledger',
      description:
        'Submit ticket inquiries regarding payout structures, bank verification errors, or commission fee reviews.',
      actionText: 'Email Admin Operations',
      actionLink: 'partners@mifaiwash.com',
    },
    phoneCard: {
      title: 'Live On-Job Dispatch Hotline',
      description:
        'Connect instantly with our active dispatch team for real-time location routing issues or customer no-shows.',
      actionText: 'Call Admin Dispatch',
      actionLink: '+23480000000',
    },
    faqs: [
      {
        id: 'w-faq-1',
        question: 'When do I get paid for completed washes?',
        answer:
          'Payouts are processed weekly. All earnings accumulated from Monday through Sunday are compiled, subtracting our standard 15% platform commission fee, and deposited directly into your linked bank account by Tuesday morning.',
      },
      {
        id: 'w-faq-2',
        question: 'What should I do if a customer is not at the location?',
        answer:
          'If you arrive at the designated service location and cannot locate the customer, wait for at least 10 minutes and attempt to contact them twice through the app. If they remain unresponsive, contact live dispatch immediately.',
      },
      {
        id: 'w-faq-3',
        question:
          'Can I reject a service booking assignment after accepting it?',
        answer:
          'Acceptance parameters lock in your service route. If an emergency arises making it impossible to fulfill an accepted wash, you must contact Washer Operations via the hotlines immediately to prevent structural platform penalties.',
      },
    ],
  },
};

export default function SupportView({ role = 'customer' }) {
  // Fallback to customer datasets if role is missing or misaligned
  const content = DATA_REGISTRY[role] || DATA_REGISTRY.customer;

  return (
    <div className="p-4 md:p-6 bg-navy-dark min-h-screen text-white">
      {/* SECTION HEADER */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-100">
          {content.title}
        </h2>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          {content.subtitle}
        </p>
      </div>

      {/* TOP: DIRECT CHANNELS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
        <SupportContactCard icon={Mail} type="email" {...content.emailCard} />

        <SupportContactCard icon={Phone} type="phone" {...content.phoneCard} />
      </div>

      <hr className="border-slate-800 my-6 md:my-8" />

      {/* BOTTOM: FAQ ACCORDION SECTION */}
      <div className="max-w-4xl">
        <div className="flex items-center gap-2 mb-4">
          <LifeBuoy size={16} className="text-blue-action" />
          <h3 className="text-sm md:text-base font-black text-slate-100">
            {role === 'washer'
              ? 'Partner Knowledge Base'
              : 'Frequently Answered Queries'}
          </h3>
        </div>
        <FaqAccordion items={content.faqs} />
      </div>
    </div>
  );
}
