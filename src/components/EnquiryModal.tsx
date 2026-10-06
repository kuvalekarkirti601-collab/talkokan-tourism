import React, { useState } from 'react';
import { X, Send, CheckCircle2, Loader2, Phone, Mail, User, Calendar, MapPin, MessageSquare } from 'lucide-react';
import { DistrictName } from '../types';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numTravelers: 2,
    travelDates: '',
    preferredDistrict: 'Whole Kokan Belt' as DistrictName | 'Whole Kokan Belt',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSubmittedSuccess(true);
      } else {
        alert(data.error || 'Failed to submit enquiry');
      }
    } catch (err) {
      console.error('Enquiry submit error:', err);
      alert('Network error submitting enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg glass-panel text-white rounded-3xl shadow-2xl overflow-hidden border border-white/15 my-8 backdrop-blur-xl">
        
        {/* Header */}
        <div className="p-6 bg-slate-950/70 text-white flex items-center justify-between border-b border-white/10 backdrop-blur-md">
          <div>
            <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider">Talkokan Tourism Consultation</span>
            <h3 className="font-serif-kokan text-xl font-bold text-white">Book Tour & Local Guide</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {submittedSuccess ? (
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif-kokan text-2xl font-bold text-white">Enquiry Received!</h4>
              <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Our local Kokan trip coordinator will contact you via phone/email shortly with customized hotel & travel options.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kulkarni"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-white/15 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@example.com"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-white/15 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 12345"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-white/15 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Travelers Count</label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={formData.numTravelers}
                    onChange={(e) => setFormData({ ...formData, numTravelers: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-slate-950/80 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Preferred District</label>
                  <select
                    value={formData.preferredDistrict}
                    onChange={(e) => setFormData({ ...formData, preferredDistrict: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950/80 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
                  >
                    <option value="Whole Kokan Belt">Whole Kokan Belt</option>
                    <option value="Sindhudurg">Sindhudurg (Scuba & Forts)</option>
                    <option value="Ratnagiri">Ratnagiri (Ganpatipule & Velas)</option>
                    <option value="Raigad">Raigad (Alibaug & Janjira)</option>
                    <option value="Palghar">Palghar (Kelwa Beach)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Travel Dates / Season</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.travelDates}
                    onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                    placeholder="e.g. 15th to 18th October or Diwali holidays"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-white/15 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Requirements / Message *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe what you want (e.g. Need beachside homestay, scuba session at Tarkarli & authentic Malvani food)..."
                  className="w-full p-3 bg-slate-950/80 border border-white/15 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Tour Enquiry</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
