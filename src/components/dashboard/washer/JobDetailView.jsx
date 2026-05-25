// src/components/dashboard/washer/JobDetailView.jsx
import React, { useState } from 'react';
import { ArrowLeft, Clock, Car, MapPin, Navigation, DollarSign, Check, Phone, MessageSquare  } from 'lucide-react';
import JobReportForm from './JobReportForm';

export default function JobDetailView({ job, onBack, onCompleteJob }) {
  const [showReportForm, setShowReportForm] = useState(false);

  return (
    <div className="w-full min-h-full bg-navy-deep p-4 text-white  flex flex-col gap-6 animate-fadeIn">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 text-sm font-semibold hover:text-white self-start mt-3"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="bg-gray-dark border border-border-dark rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
                <h2 className="text-xl font-bold">
                    {job.name}
                </h2>

                <p className="text-xs text-slate-500 mt-0.5">Booking ID: #{job.number}</p>
            </div>
          
            {/* Place this right beneath the customer notes or main header section inside JobDetailView */}
            <div className="flex flex-col items-center gap-3 mt-1">

              <span className="text-xs bg-blue-500 bg-opacity-10 text-blue-400 font-bold px-2.5 py-1 rounded-md">
                  {job.status}
              </span>

              <div className="flex items-center gap-3 mt-2">
                {/* Call Trigger Link */}
                <a 
                    href={`tel:${job.phone || '+234800000000'}`}
                    className=" p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl border border-slate-700 flex items-center justify-center transition-colors"
                >
                    <Phone size={14} /> 
                </a>

                {/* SMS Message Trigger Link */}
                <a 
                    href={`sms:${job.phone || '+234800000000'}?body=Hi%20${encodeURIComponent(job.name)},%20this%20is%20your%20MiFai%20Wash%20crew%20pro!`}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl border border-slate-700 flex items-center justify-center transition-colors"
                >
                    <MessageSquare size={14} /> 
                </a>

              </div>
            
              
            </div>
          
        </div>

        <div className="flex flex-col gap-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-400" />
            <span>Time slot: <strong className="text-white">{job.time}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Car size={16} className="text-blue-400" />
            <span>Vehicle: <strong className="text-white">{job.car}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">Service</span>
            <span className="text-white font-semibold">{job.service}</span>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-3 flex flex-col gap-2">
          <div className="flex items-start gap-2 text-sm text-slate-300">
            <MapPin size={18} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">{job.address}</p>
              <p className="text-xs text-slate-500 mt-0.5">{job.distance} ({job.driveTime} drive)</p>
            </div>
          </div>
          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(job.address)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-1 w-full bg-blue-action hover:bg-slate-700 text-gray-dark py-2.5 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors"
          >
            <Navigation size={14} /> Open in Google Maps
          </a>
        </div>

        <div className="border-t border-slate-800 pt-3">
          <span className="text-xs font-bold uppercase text-slate-500 block mb-1">Customer Notes</span>
          <p className="text-xs text-slate-300 bg-slate-900 bg-opacity-40 p-3 rounded-xl italic border border-slate-800">
            {job.customerNotes || "No specific instructions left by client."}
          </p>
        </div>
      </div>

      {!showReportForm ? (
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex items-center justify-between px-2 text-sm">
            <span className="text-slate-400">Your Pending Payout:</span>
            <span className="text-emerald-400 font-bold flex items-center text-lg">₦25.00</span>
          </div>
          <button
            onClick={() => setShowReportForm(true)}
            className="w-full bg-green-500 hover:bg-green-600 text-slate-950 font-black py-4 rounded-xl text-base flex items-center justify-center gap-2 shadow-lg transition-colors"
          >
            <Check size={18} strokeWidth={3} /> Mark as Completed
          </button>
        </div>
      ) : (
        <JobReportForm onSubmit={(formData) => onCompleteJob(job.id, formData)} />
      )}
    </div>
  );
}