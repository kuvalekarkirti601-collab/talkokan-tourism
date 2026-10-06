import React, { useState, useEffect } from 'react';
import { Calculator, Users, Calendar, DollarSign, Car, Hotel, Utensils, Anchor, Send, PieChart } from 'lucide-react';
import { BudgetBreakdown } from '../types';

interface BudgetCalculatorProps {
  onOpenEnquiry: () => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ onOpenEnquiry }) => {
  const [daysCount, setDaysCount] = useState<number>(3);
  const [travelersCount, setTravelersCount] = useState<number>(4);
  const [luxuryLevel, setLuxuryLevel] = useState<'Budget / Backpacker' | 'Standard / Family' | 'Luxury Resort'>('Standard / Family');
  const [travelMode, setTravelMode] = useState<'Bus & Local Transport' | 'Self Car / Rental' | 'Private Taxi'>('Self Car / Rental');

  const [breakdown, setBreakdown] = useState<BudgetBreakdown | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const calculateBudget = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/budget/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          daysCount,
          travelersCount,
          luxuryLevel,
          travelMode
        })
      });
      const data = await res.json();
      setBreakdown(data);
    } catch (err) {
      console.error('Budget calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateBudget();
  }, [daysCount, travelersCount, luxuryLevel, travelMode]);

  return (
    <div className="glass-panel text-white rounded-3xl p-6 sm:p-10 border border-white/12 shadow-2xl my-8 backdrop-blur-xl">
      
      {/* Header */}
      <div className="max-w-3xl mb-8">
        <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>Transparent Cost Estimator</span>
        </div>
        <h2 className="font-serif-kokan text-2xl sm:text-4xl font-extrabold text-white">
          Kokan Trip Budget Calculator
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
          Estimate realistic per-head and total expense breakdowns for stay, local seafood thalis, Scuba sessions, island ferries, and coastal fuel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6 bg-slate-950/60 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
          
          {/* Duration Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-200">
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-teal-400" />
                <span>Trip Duration</span>
              </span>
              <span className="text-amber-300 font-extrabold text-sm">{daysCount} Days</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={daysCount}
              onChange={(e) => setDaysCount(parseInt(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
          </div>

          {/* Travelers Count Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-200">
              <span className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-teal-400" />
                <span>Number of Travelers</span>
              </span>
              <span className="text-amber-300 font-extrabold text-sm">{travelersCount} Persons</span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              value={travelersCount}
              onChange={(e) => setTravelersCount(parseInt(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
          </div>

          {/* Luxury Level Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">
              Stay & Experience Tier
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { name: 'Budget / Backpacker', desc: 'Coastal Homestays & Village Mess' },
                { name: 'Standard / Family', desc: 'Beach Resorts & Malvani Special Dining' },
                { name: 'Luxury Resort', desc: 'Heritage Sea Resorts, Houseboats & Private Dining' }
              ].map((tier) => (
                <button
                  key={tier.name}
                  onClick={() => setLuxuryLevel(tier.name as any)}
                  className={`p-3 rounded-xl text-left border transition-all flex justify-between items-center backdrop-blur-sm ${
                    luxuryLevel === tier.name
                      ? 'bg-teal-500/30 text-teal-200 border-teal-500/50 font-semibold shadow-md'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold">{tier.name}</p>
                    <p className={`text-[10px] ${luxuryLevel === tier.name ? 'text-teal-200' : 'text-slate-400'}`}>
                      {tier.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Travel Mode Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wide">
              Transportation Mode
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { mode: 'Bus & Local Transport', desc: 'MSRTC Bus, Auto-rickshaws & Local Ferries' },
                { mode: 'Self Car / Rental', desc: 'Personal vehicle fuel & highway toll costs' },
                { mode: 'Private Taxi', desc: 'Dedicated driver vehicle throughout trip' }
              ].map((item) => (
                <button
                  key={item.mode}
                  onClick={() => setTravelMode(item.mode as any)}
                  className={`p-3 rounded-xl text-left border transition-all flex justify-between items-center backdrop-blur-sm ${
                    travelMode === item.mode
                      ? 'bg-amber-500/30 text-amber-200 border-amber-500/50 font-extrabold shadow-md'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold">{item.mode}</p>
                    <p className={`text-[10px] ${travelMode === item.mode ? 'text-amber-200 font-medium' : 'text-slate-400'}`}>
                      {item.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {breakdown && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Grand Total Highlight Box */}
              <div className="p-6 rounded-3xl bg-slate-950/80 text-white border border-white/15 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300">
                    Estimated Total Package Cost
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-serif-kokan mt-1">
                    ₹{breakdown.totalCost.toLocaleString('en-IN')}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    For {breakdown.travelersCount} travelers over {breakdown.daysCount} days ({breakdown.luxuryLevel})
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center w-full sm:w-auto backdrop-blur-md">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Per Head Share</span>
                  <span className="text-2xl font-extrabold text-teal-300">
                    ₹{breakdown.perPersonCost.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Itemized Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl glass-card space-y-1">
                  <div className="flex items-center space-x-2 text-slate-200 font-bold text-xs">
                    <Hotel className="w-4 h-4 text-teal-400" />
                    <span>Accommodation</span>
                  </div>
                  <p className="text-lg font-bold text-white">₹{breakdown.stayCost.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-slate-400">Hotels, Homestays & Resorts</p>
                </div>

                <div className="p-4 rounded-2xl glass-card space-y-1">
                  <div className="flex items-center space-x-2 text-slate-200 font-bold text-xs">
                    <Car className="w-4 h-4 text-amber-400" />
                    <span>Transportation</span>
                  </div>
                  <p className="text-lg font-bold text-white">₹{breakdown.transportCost.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-slate-400">Fuel, Tolls, Rickshaws & Ferries</p>
                </div>

                <div className="p-4 rounded-2xl glass-card space-y-1">
                  <div className="flex items-center space-x-2 text-slate-200 font-bold text-xs">
                    <Utensils className="w-4 h-4 text-rose-400" />
                    <span>Food & Dining</span>
                  </div>
                  <p className="text-lg font-bold text-white">₹{breakdown.foodCost.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-slate-400">Malvani Thalis, Sol Kadhi & Modak</p>
                </div>

                <div className="p-4 rounded-2xl glass-card space-y-1">
                  <div className="flex items-center space-x-2 text-slate-200 font-bold text-xs">
                    <Anchor className="w-4 h-4 text-emerald-400" />
                    <span>Activities & Scuba</span>
                  </div>
                  <p className="text-lg font-bold text-white">₹{breakdown.activityCost.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-slate-400">Scuba, Fort Boat Passes, Watersports</p>
                </div>

              </div>

            </div>
          )}

          {/* Action Trigger */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              *Estimates based on current regional seasonal rates in Kokan.
            </p>
            <button
              onClick={onOpenEnquiry}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Get Final Quote / Customize</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
