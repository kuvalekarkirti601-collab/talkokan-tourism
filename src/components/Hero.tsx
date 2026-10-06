import React from 'react';
import { Search, Compass, Calculator, MapPin, Sparkles, Anchor, ShieldAlert } from 'lucide-react';
import { DistrictName, DestinationCategory } from '../types';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  onNavigateToPlanner: () => void;
  onNavigateToBudget: () => void;
  onOpenAiGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedDistrict,
  setSelectedDistrict,
  selectedCategory,
  setSelectedCategory,
  onNavigateToPlanner,
  onNavigateToBudget,
  onOpenAiGuide
}) => {
  const districts = ['All', 'Sindhudurg', 'Ratnagiri', 'Raigad', 'Palghar'];
  const categories = ['All', 'Beaches', 'Sea Forts', 'Temples', 'Hill Stations', 'Waterfalls', 'Wildlife'];

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden py-16 lg:py-24 border-b border-white/10">
      
      {/* Background Image with Frosted Oceanic Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
          alt="Kokan Coastline"
          className="w-full h-full object-cover opacity-30 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-teal-950/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Tag */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide backdrop-blur-md">
            <Anchor className="w-3.5 h-3.5 text-amber-400" />
            <span>Discover Coastal Maharashtra • 720 km Unspoiled Shoreline</span>
          </div>
          <button
            onClick={onOpenAiGuide}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 hover:text-white text-xs font-semibold cursor-pointer transition-colors backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>AI Local Travel Assistant</span>
          </button>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif-kokan text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15]">
          Explore the Heritage, Sea Forts & Flavor of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-teal-300 to-emerald-300">Talkokan</span>
        </h1>

        <p className="mt-4 text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl font-light leading-relaxed">
          From the crystal scuba waters of Tarkarli to the majestic island fort of Janjira, plan your authentic getaway with smart budget calculators, custom itinerary planners, and monsoon guides.
        </p>

        {/* Interactive Search Bar in Frosted Glass Container */}
        <div className="mt-8 max-w-3xl glass-panel p-4 rounded-3xl border border-white/15 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search places, forts, scuba, beaches, food (e.g. Scuba, Tarkarli, Modak)..."
                className="w-full pl-11 pr-4 py-3 bg-slate-950/60 text-white placeholder-slate-400 text-sm rounded-xl border border-white/10 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all backdrop-blur-md"
              />
            </div>

            {/* Quick Action Buttons inside Search Bar */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={onNavigateToPlanner}
                className="flex-1 md:flex-none px-4 py-3 bg-teal-600/90 hover:bg-teal-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-teal-900/30 transition-all flex items-center justify-center space-x-1.5 border border-teal-400/30 backdrop-blur-md"
              >
                <Compass className="w-4 h-4 text-amber-300" />
                <span>Plan Trip</span>
              </button>
              <button
                onClick={onNavigateToBudget}
                className="flex-1 md:flex-none px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-1.5"
              >
                <Calculator className="w-4 h-4" />
                <span>Budget</span>
              </button>
            </div>

          </div>

          {/* District Quick Filter Pills */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium flex items-center space-x-1 mr-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>District:</span>
            </span>
            {districts.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  selectedDistrict === d
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                    : 'bg-white/5 hover:bg-white/15 text-slate-300 border border-white/10'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-teal-500/30 text-teal-200 border border-teal-500/50 font-semibold'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Feature Highlights Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
          <div className="p-3.5 rounded-2xl glass-card flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-300">
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-100">Sea Forts & Scuba</p>
              <p className="text-[10px] text-slate-400">Sindhudurg & Janjira</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl glass-card flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-100">Budget Estimator</p>
              <p className="text-[10px] text-slate-400">Itemized Cost Math</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl glass-card flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-100">Custom Planner</p>
              <p className="text-[10px] text-slate-400">1-5 Day Itineraries</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl glass-card flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-100">Malvani Culinary</p>
              <p className="text-[10px] text-slate-400">Sol Kadhi & Modak</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
