import React, { useState } from 'react';
import { Utensils, Flame, MapPin } from 'lucide-react';
import { FoodItem, Festival } from '../types';

interface CulturalHubProps {
  foodList: FoodItem[];
  festivalList: Festival[];
}

export const CulturalHub: React.FC<CulturalHubProps> = ({
  foodList = [],
  festivalList = [],
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'cuisine' | 'festivals'>(
    'cuisine'
  );

  return (
    <div className="my-8 space-y-8">

      {/* Top Banner Navigation */}
      <div className="glass-panel text-white rounded-3xl p-6 sm:p-8 border border-white/12 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-xl">

        <div>
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Utensils className="w-4 h-4 text-amber-400" />
            <span>Kokan Soul & Heritage</span>
          </div>

          <h2 className="font-serif-kokan text-2xl sm:text-4xl font-extrabold text-white">
            Malvani Culinary & Festival Cultural Hub
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Explore authentic stone-ground Malvani spices, fresh catch seafood
            thalis, Ukadiche Modak, and vibrant village folk festivals.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950/80 p-1 rounded-2xl border border-white/10 self-stretch sm:self-auto backdrop-blur-md">

          <button
            onClick={() => setActiveSubTab('cuisine')}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              activeSubTab === 'cuisine'
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            🍲 Malvani Food Trail
          </button>

          <button
            onClick={() => setActiveSubTab('festivals')}
            className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              activeSubTab === 'festivals'
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            🪔 Local Festivals
          </button>

        </div>
      </div>

      {/* ===================================================== */}
      {/* MALVANI CUISINE */}
      {/* ===================================================== */}

      {activeSubTab === 'cuisine' && (
        <div className="space-y-6 animate-fadeIn">

          {foodList.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center text-slate-300 border border-white/10">
              <Utensils className="w-10 h-10 mx-auto mb-3 text-amber-400" />
              <p className="font-semibold">No food items available.</p>
              <p className="text-xs text-slate-400 mt-1">
                Food data could not be loaded.
              </p>
            </div>
          ) : (

            /* Food Cards */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {foodList.map((food) => (
                <div
                  key={food.id}
                  className="glass-card rounded-2xl overflow-hidden border border-white/12 shadow-xl flex flex-col justify-between backdrop-blur-md"
                >

                  {/* Image */}
                  <div className="relative h-48 bg-slate-950">

                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Spicy Badge */}
                    {food.spiceLevel >= 4 && (
                      <div className="absolute top-3 left-3 bg-rose-600/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-md backdrop-blur-md">
                        <Flame className="w-3 h-3" />
                        <span>Authentic Spicy</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/10 shadow-md">
                      {food.priceRange}
                    </div>

                    {/* Food Name */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">

                      <p className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                        Konkan Cuisine • {food.district}
                      </p>

                      <h3 className="font-serif-kokan text-lg font-bold leading-tight text-white">
                        {food.name}
                      </h3>

                      <p className="text-amber-300 font-serif-kokan text-xs font-semibold">
                        {food.marathiName}
                      </p>

                    </div>
                  </div>

                  {/* Food Details */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {food.description}
                    </p>

                    {/* Ingredients */}
                    <div>

                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Key Ingredients
                      </span>

                      <div className="flex flex-wrap gap-1">

                        {(food.ingredients || []).map((ingredient, index) => (
                          <span
                            key={index}
                            className="text-[10px] bg-white/5 text-slate-200 font-medium px-2 py-0.5 rounded border border-white/10"
                          >
                            {ingredient}
                          </span>
                        ))}

                      </div>
                    </div>

                    {/* District */}
                    <div className="pt-3 border-t border-white/10">

                      <span className="text-[10px] uppercase font-bold text-teal-300 flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>District</span>
                      </span>

                      <p className="text-[11px] text-slate-300 mt-1">
                        {food.district}
                      </p>

                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      )}

      {/* ===================================================== */}
      {/* FESTIVALS */}
      {/* ===================================================== */}

      {activeSubTab === 'festivals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">

          {festivalList.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center text-slate-300 border border-white/10 md:col-span-2">
              <p className="font-semibold">No festivals available.</p>
            </div>
          ) : (

            festivalList.map((fest) => (
              <div
                key={fest.id}
                className="glass-card rounded-3xl overflow-hidden border border-white/12 shadow-2xl flex flex-col backdrop-blur-md"
              >

                {/* Festival Image */}
                <div className="relative h-56 bg-slate-950">

                  <img
                    src={fest.image}
                    alt={fest.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Month */}
                  <div className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    📅 {fest.month}
                  </div>

                  {/* Name */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">

                    <h3 className="font-serif-kokan text-2xl font-bold text-white">
                      {fest.name}
                    </h3>

                    <p className="text-amber-300 font-serif-kokan text-sm font-semibold">
                      {fest.marathiName}
                    </p>

                  </div>
                </div>

                {/* Festival Details */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">

                  {/* Description */}
                  <div className="space-y-3">

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {fest.description}
                    </p>

                    {/* District */}
                    <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 text-xs text-amber-200 backdrop-blur-sm">

                      <strong className="block text-[11px] text-amber-300 uppercase font-bold mb-0.5">
                        Top District
                      </strong>

                      {fest.district}

                    </div>

                  </div>

                  {/* Highlights */}
                  <div>

                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Key Highlights & Traditions
                    </span>

                    <div className="flex flex-wrap gap-1.5">

                      {(fest.highlights || []).map((highlight, index) => (
                        <span
                          key={index}
                          className="text-xs bg-white/5 text-slate-200 font-semibold px-2.5 py-1 rounded-lg border border-white/10"
                        >
                          🪔 {highlight}
                        </span>
                      ))}

                    </div>

                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">

                    <span>
                      District:{' '}
                      <strong className="text-slate-200">
                        {fest.district}
                      </strong>
                    </span>

                    <span className="text-teal-300 font-bold">
                      Kokan Heritage
                    </span>

                  </div>

                </div>

              </div>
            ))

          )}

        </div>
      )}

    </div>
  );
};