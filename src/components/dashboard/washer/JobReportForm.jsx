// src/components/dashboard/washer/JobReportForm.jsx
import React, { useState } from 'react';
import { ShieldAlert, Image as ImageIcon, CheckCircle, X } from 'lucide-react';

export default function JobReportForm({ onSubmit }) {
  const [issues, setIssues] = useState({
    heavyDirt: false,
    scratches: false,
    stubbornStains: false,
    damagesNoted: false,
  });
  const [washerNotes, setWasherNotes] = useState('');
  const [images, setImages] = useState([]);

  const handleCheckboxChange = (field) => {
    setIssues((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Convert files to preview URLs so they can be shown locally
    const newImagePreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImagePreviews]);
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Validation conditions:
  // 1. At least one issue checkbox must be true
  const hasSelectedIssue = Object.values(issues).some((val) => val === true);
  
  // 2. At least one image must be uploaded
  const hasUploadedImages = images.length > 0;

  // Form is only valid if both conditions are met
  const isFormValid = hasSelectedIssue && hasUploadedImages;

  return (
    <div className="bg-gray-dark border border-amber-500/30 rounded-2xl p-5 flex flex-col gap-4 animate-slideDown mt-2">
      <div>
        <h3 className="text-base font-bold text-amber-400 flex items-center gap-1.5">
          <ShieldAlert size={18} /> Post-Wash Field Report
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Document workspace flags or pre-existing conditions <span className="text-amber-400 font-semibold">(Required: select at least one condition & upload an image)</span>.
        </p>
      </div>

      {/* Grid Checkbox Options */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        {[
          { id: 'heavyDirt', label: 'Heavy Mud/Dirt' },
          { id: 'scratches', label: 'Pre-existing Scratches' },
          { id: 'stubbornStains', label: 'Stubborn Stains' },
          { id: 'damagesNoted', label: 'Prior Damages' },
        ].map((item) => (
          <label
            key={item.id}
            className={`flex items-center gap-2 p-2.5 bg-slate-900 bg-opacity-50 border rounded-xl cursor-pointer transition-colors ${
              issues[item.id] ? 'border-amber-500/60 bg-amber-500/10' : 'border-slate-800'
            }`}
          >
            <input
              type="checkbox"
              checked={issues[item.id]}
              onChange={() => handleCheckboxChange(item.id)}
              className="checkbox checkbox-primary checkbox-sm rounded-md"
            />
            <span className={`text-xs ${issues[item.id] ? 'text-amber-300 font-medium' : 'text-slate-300'}`}>
              {item.label}
            </span>
          </label>
        ))}
      </div>

      {/* Proof of Work Media Section */}
      <div>
        <span className="text-xs font-bold uppercase text-slate-500 block mb-1.5">
          Proof of Work (Images) <span className="text-red-400">*</span>
        </span>
        
        {/* Hidden File Input */}
        <input
          type="file"
          id="proof-images-upload"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        <label
          htmlFor="proof-images-upload"
          className="border border-dashed border-slate-700 bg-slate-900/30 rounded-xl p-4 text-center flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-900/50 transition-colors"
        >
          <ImageIcon size={20} className="text-blue-400" />
          <span className="text-xs text-slate-300 font-semibold">
            Upload Images {images.length > 0 && `(${images.length} selected)`}
          </span>
          <span className="text-[10px] text-slate-500">
            Before & After conditions (Click to browse)
          </span>
        </label>

        {/* Image Previews Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mt-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-700 h-16 bg-slate-900">
                <img src={img.url} alt="Upload preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-slate-950/80 text-white rounded-full p-1 opacity-80 hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Field Notes Area */}
      <div>
        <span className="text-xs font-bold uppercase text-slate-500 block mb-1.5">
          Operational Notes <span className="text-slate-600 font-normal">(Optional)</span>
        </span>
        <textarea
          rows="3"
          value={washerNotes}
          onChange={(e) => setWasherNotes(e.target.value)}
          placeholder="Add notes about paint condition, customer sign-off, or delays..."
          className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-blue-500 placeholder-slate-600 resize-none"
        />
      </div>

      {/* Conditional Submit Button */}
      <button
        type="button"
        disabled={!isFormValid}
        onClick={() => onSubmit({ issues, washerNotes, images: images.map(i => i.file) })}
        className={`w-full font-black py-4 rounded-xl text-base flex items-center justify-center gap-2 transition-all mt-2 ${
          isFormValid
            ? 'bg-blue-500 hover:bg-blue-600 text-slate-950 shadow-lg cursor-pointer'
            : 'bg-slate-800 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-60'
        }`}
      >
        {isFormValid ? (
          <>
            <CheckCircle size={18} strokeWidth={3} /> Submit Report & Close Job
          </>
        ) : (
          <span>Select at least 1 issue & upload image to submit</span>
        )}
      </button>
    </div>
  );
}