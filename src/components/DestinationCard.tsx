import React from 'react';
import { MapPin, Star, Calendar, ArrowRight, Shield, Anchor } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (dest: Destination) => void;
  onFocusOnMap: (dest: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onSelect,
  onFocusOnMap
}) => {
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Monsoon Magic':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/50';
      case 'Winter Bliss':
        return 'bg-sky-950/80 text-sky-300 border-sky-700/50';
      case 'Summer Water Sports':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/50';
      default:
        return 'bg-teal-950/80 text-teal-300 border-teal-700/50';
    }
  };

  return (
    <div className="group glass-card rounded-2xl overflow-hidden shadow-xl flex flex-col h-full">
      
      {/* Image Thumbnail Header */}
      <div className="relative h-52 overflow-hidden bg-slate-950">
        <img
          src={destination.images[0] || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Season Badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md shadow-md ${getBadgeColor(destination.seasonBadge)}`}>
            {destination.seasonBadge}
          </span>
        </div>

        {/* Rating & District Badge */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-slate-950/80 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-full text-xs font-bold border border-white/10 shadow-md">
          <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
          <span>{destination.rating}</span>
        </div>

        {/* Name overlay at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-[10px] uppercase font-bold text-teal-300 tracking-wider">{destination.category} • {destination.district}</p>
          <h3 className="font-serif-kokan text-lg font-bold leading-tight group-hover:text-amber-300 transition-colors text-white">
            {destination.name}
          </h3>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {destination.marathiName && (
            <p className="text-xs text-amber-300 font-serif-kokan font-semibold mb-1">
              {destination.marathiName}
            </p>
          )}
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            {destination.description}
          </p>

          {/* Key Highlights Pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {destination.highlights.slice(0, 3).map((hl, i) => (
              <span key={i} className="text-[10px] bg-white/5 text-slate-200 font-medium px-2 py-0.5 rounded-md border border-white/10 backdrop-blur-sm">
                • {hl}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Specs & Action */}
        <div className="pt-3 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-teal-400" />
              <span className="truncate max-w-[150px]">{destination.bestTimeToVisit}</span>
            </div>
            <div className="text-amber-300 font-bold">
              ₹{destination.estimatedCostPerDay}<span className="text-[10px] text-slate-400 font-normal">/day</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(destination)}
              className="w-full py-2 px-3 bg-teal-600/80 hover:bg-teal-500 text-white font-medium text-xs rounded-xl transition-all flex items-center justify-center space-x-1 shadow-md border border-teal-400/30 backdrop-blur-md"
            >
              <span>Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onFocusOnMap(destination)}
              className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-slate-200 font-medium text-xs rounded-xl border border-white/15 transition-all flex items-center justify-center space-x-1 backdrop-blur-md"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Map View</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
