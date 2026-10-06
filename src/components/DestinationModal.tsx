import React, { useState } from 'react';
import { X, MapPin, Calendar, Compass, Utensils, Star, AlertCircle, Car, ArrowRight } from 'lucide-react';
import { Destination } from '../types';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onFocusOnMap: (dest: Destination) => void;
  onOpenEnquiry: () => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onFocusOnMap,
  onOpenEnquiry
}) => {
  if (!destination) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-panel text-white rounded-3xl shadow-2xl overflow-hidden border border-white/15 my-8 backdrop-blur-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 text-white hover:bg-slate-900 border border-white/20 transition-all shadow-lg backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image Gallery */}
        <div className="relative h-64 sm:h-80 bg-slate-950">
          <img
            src={destination.images[activeImageIndex] || destination.images[0]}
            alt={destination.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

          {/* Image Thumbnails if multiple */}
          {destination.images.length > 1 && (
            <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
              {destination.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-amber-400 scale-105 shadow-md' : 'border-white/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}

          {/* Header Title & Badges */}
          <div className="absolute bottom-4 left-4 right-20 text-white">
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/80 text-white text-[11px] font-bold border border-teal-400/40 backdrop-blur-md">
                {destination.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-bold shadow-md">
                {destination.district} District
              </span>
              <div className="flex items-center space-x-1 text-amber-300 text-xs font-bold bg-slate-950/70 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span>{destination.rating}</span>
              </div>
            </div>
            <h2 className="font-serif-kokan text-2xl sm:text-3xl font-extrabold leading-tight text-white">
              {destination.name}
            </h2>
            {destination.marathiName && (
              <p className="text-amber-300 font-serif-kokan text-sm font-semibold">{destination.marathiName}</p>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Detailed Overview */}
          <div>
            <h4 className="font-serif-kokan text-base font-bold text-white mb-2">About Destination</h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {destination.longDescription || destination.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h4 className="font-serif-kokan text-base font-bold text-white mb-2">Key Attractions & Activities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {destination.highlights.map((hl, i) => (
                <div key={i} className="flex items-start space-x-2 p-2.5 rounded-xl bg-slate-950/60 border border-white/10 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 flex-shrink-0" />
                  <span className="text-xs font-medium text-slate-200">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Tips & Distance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Travel Distance Card */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2 backdrop-blur-md">
              <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs">
                <Car className="w-4 h-4 text-amber-400" />
                <span>Road Travel Distances</span>
              </div>
              <div className="text-xs text-slate-200 space-y-1">
                <div className="flex justify-between">
                  <span>From Mumbai:</span>
                  <span className="font-bold text-amber-300">{destination.distanceKm.mumbai} km (~{Math.round(destination.distanceKm.mumbai / 45)} hrs)</span>
                </div>
                <div className="flex justify-between">
                  <span>From Pune:</span>
                  <span className="font-bold text-amber-300">{destination.distanceKm.pune} km (~{Math.round(destination.distanceKm.pune / 45)} hrs)</span>
                </div>
              </div>
            </div>

            {/* Travel Tips */}
            <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-2 backdrop-blur-md">
              <div className="flex items-center space-x-2 text-teal-300 font-bold text-xs">
                <AlertCircle className="w-4 h-4 text-teal-300" />
                <span>Insider Local Advice</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {destination.travelTips}
              </p>
            </div>

          </div>

          {/* Nearby Malvani Food Specials */}
          <div>
            <div className="flex items-center space-x-2 mb-2 text-white font-bold text-sm">
              <Utensils className="w-4 h-4 text-amber-400" />
              <span>Must-Try Food Nearby</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {destination.popularFoodNearby.map((food, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-white/10 text-slate-200 text-xs font-semibold border border-white/15 backdrop-blur-sm">
                  🍲 {food}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-950/80 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 backdrop-blur-md">
          <div className="text-xs text-slate-300">
            <span>Estimated Budget: </span>
            <span className="font-extrabold text-amber-300 text-sm">₹{destination.estimatedCostPerDay} / day</span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onFocusOnMap(destination);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 backdrop-blur-md"
            >
              <MapPin className="w-4 h-4 text-teal-300" />
              <span>Locate on Map</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenEnquiry();
              }}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-lg"
            >
              <span>Enquire Package</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
