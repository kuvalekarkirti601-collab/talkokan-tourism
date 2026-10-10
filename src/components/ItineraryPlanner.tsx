import React, { useState } from 'react';
import { Compass, Calendar, MapPin, Download, Send, CheckCircle2, Loader2, Sparkles, Utensils } from 'lucide-react';
import { DistrictName, ItineraryPlan } from '../types';

interface ItineraryPlannerProps {
  onOpenEnquiry: () => void;
}

export const ItineraryPlanner: React.FC<ItineraryPlannerProps> = ({ onOpenEnquiry }) => {
  const [daysCount, setDaysCount] = useState<number>(3);
  const [travelStyle, setTravelStyle] = useState<string>('Relaxation & Beaches');
  const [selectedDistricts, setSelectedDistricts] = useState<DistrictName[]>(['Sindhudurg', 'Malvan']);
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<ItineraryPlan | null>(null);

  const districtsList: DistrictName[] = ['Kankavli', 'Malvan', 'Swantwadi', 'Devgad','vengurla','kudal','Dodamarg','Vaibhavvadi'];

  const stylesList = [
    { name: 'Relaxation & Beaches', desc: 'Sunset walks, clean sand shores, coconut groves & sea breezes' },
    { name: 'Adventure & Trekking', desc: 'Scuba diving, water sports, hill ghats & waterfall hikes' },
    { name: 'Culinary & Seafood', desc: 'Malvani fish thalis, Sol Kadhi, Kombdi Vade & local food trails' },
    { name: 'Forts & Heritage', desc: 'Historical Maratha sea forts, island ramparts & royal palaces' },
    { name: 'Family & Culture', desc: 'Sacred Swayambhu temples, village homestays & turtle nesting' }
  ];

  const handleDistrictToggle = (d: DistrictName) => {
    if (selectedDistricts.includes(d)) {
      if (selectedDistricts.length > 1) {
        setSelectedDistricts(selectedDistricts.filter(item => item !== d));
      }
    } else {
      setSelectedDistricts([...selectedDistricts, d]);
    }
  };

  const handleGenerateItinerary = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/planner/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          daysCount,
          travelStyle,
          districts: selectedDistricts
        })
      });
      const data = await res.json();
      setGeneratedPlan(data);
    } catch (err) {
      console.error('Planner generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass-panel text-white rounded-3xl p-6 sm:p-10 border border-white/12 shadow-2xl my-8 backdrop-blur-xl">
      
      {/* Title */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Talkokan Smart Route Generator</span>
        </div>
        <h2 className="font-serif-kokan text-2xl sm:text-4xl font-extrabold text-white">
          Tailor-Made Custom Kokan Itinerary
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          Select your trip duration, travel vibe, and preferred coastal districts. Our algorithm will weigh distances, optimal ferry times, and authentic Malvani culinary stops.
        </p>
      </div>

      {/* Form Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8 border-b border-white/10">
        
        {/* Step 1: Duration Slider */}
        <div className="bg-slate-950/60 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-teal-300">
            Step 1: Duration ({daysCount} {daysCount === 1 ? 'Day' : 'Days'})
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={daysCount}
            onChange={(e) => setDaysCount(parseInt(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>1 Day Weekend</span>
            <span>3 Days Classic</span>
            <span>5 Days Grand Tour</span>
          </div>
        </div>

        {/* Step 2: District Multi-Select */}
        <div className="bg-slate-950/60 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-teal-300">
            Step 2: Coastal Districts
          </label>
          <div className="grid grid-cols-2 gap-2">
            {districtsList.map((d) => {
              const isSelected = selectedDistricts.includes(d);
              return (
                <button
                  key={d}
                  onClick={() => handleDistrictToggle(d)}
                  className={`p-2 rounded-xl text-xs font-semibold border text-left transition-all flex items-center justify-between backdrop-blur-sm ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200 hover:bg-white/10'
                  }`}
                >
                  <span>{d}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Travel Vibe / Style */}
        <div className="bg-slate-950/60 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-teal-300">
            Step 3: Travel Experience
          </label>
          <select
            value={travelStyle}
            onChange={(e) => setTravelStyle(e.target.value)}
            className="w-full p-2.5 bg-slate-900/80 text-white text-xs font-medium rounded-xl border border-white/15 focus:outline-none focus:border-amber-400 backdrop-blur-md"
          >
            {stylesList.map((s) => (
              <option key={s.name} value={s.name} className="bg-slate-900 text-white">
                {s.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-400 italic">
            {stylesList.find(s => s.name === travelStyle)?.desc}
          </p>
        </div>

      </div>

      {/* Action Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleGenerateItinerary}
          disabled={loading}
          className="px-8 py-3.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-500 hover:from-teal-400 hover:to-amber-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-teal-950/50 transition-all hover:scale-105 flex items-center space-x-2 disabled:opacity-50 border border-white/20"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
              <span>Calculating Route & Tides...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Generate My {daysCount}-Day Plan</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Schedule Display */}
      {generatedPlan && (
        <div className="mt-12 space-y-6 animate-fadeIn">
          
          <div className="p-6 rounded-2xl bg-slate-950/70 border border-teal-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-md">
            <div>
              <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider">
                Generated Plan #{generatedPlan.id}
              </span>
              <h3 className="font-serif-kokan text-xl sm:text-2xl font-bold text-amber-300">
                {generatedPlan.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Districts Covered: {generatedPlan.districtsCovered.join(', ')} • Est. Activity Cost: ₹{generatedPlan.totalEstimatedBudget}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrint}
                className="px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold rounded-xl border border-white/15 flex items-center space-x-1 backdrop-blur-md"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>Print / Save PDF</span>
              </button>
              <button
                onClick={onOpenEnquiry}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center space-x-1 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Book Package</span>
              </button>
            </div>
          </div>

          {/* Daily Schedule Cards */}
          <div className="space-y-4">
            {generatedPlan.dailySchedule.map((dayItem) => (
              <div key={dayItem.day} className="p-5 sm:p-6 rounded-2xl glass-card space-y-4 hover:border-teal-500/40 transition-all">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-full bg-teal-500/30 text-teal-200 font-bold text-sm flex items-center justify-center font-serif-kokan border border-teal-500/40">
                      D{dayItem.day}
                    </span>
                    <h4 className="font-serif-kokan text-base sm:text-lg font-bold text-white">
                      {dayItem.title}
                    </h4>
                  </div>
                  <span className="text-xs text-amber-300 font-semibold bg-slate-950/80 px-3 py-1 rounded-full border border-white/10">
                    Day {dayItem.day} Schedule
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/10 space-y-1 backdrop-blur-sm">
                    <span className="text-[10px] font-bold text-amber-300 uppercase">🌅 Morning Exploration</span>
                    <p className="leading-relaxed">{dayItem.morning}</p>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/10 space-y-1 backdrop-blur-sm">
                    <span className="text-[10px] font-bold text-teal-300 uppercase">☀️ Afternoon & Lunch</span>
                    <p className="leading-relaxed">{dayItem.afternoon}</p>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/10 space-y-1 backdrop-blur-sm">
                    <span className="text-[10px] font-bold text-rose-300 uppercase">🌆 Sunset & Evening</span>
                    <p className="leading-relaxed">{dayItem.evening}</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-white/10 text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Utensils className="w-3.5 h-3.5 text-amber-300" />
                    <span>Food Stop: <strong className="text-slate-200">{dayItem.recommendedFood}</strong></span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    <span>Stay Suggestion: <strong className="text-slate-200">{dayItem.staySuggestion}</strong></span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};
