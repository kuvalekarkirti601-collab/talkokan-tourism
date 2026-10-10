import React, { useState, useEffect } from 'react';
import { CloudSun, Waves, AlertTriangle, CheckCircle, MapPin, Compass, Thermometer } from 'lucide-react';
import { WeatherData, DistrictName } from '../types';

interface WeatherWidgetProps {
  onSelectDestinationById?: (id: string) => void;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictName>('Sindhudurg');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const districts: DistrictName[] = ['Kankavali', 'Kudal', 'Malvan', 'Sawanwadi', 'Devgad', 'Vengurla', 'Dodamarg' ,'Vaibhavvadi'];

  async function fetchWeather(district: DistrictName) {
      setLoading(true);
      try {
        const res = await fetch(`/api/weather?district=${district}`);
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    fetchWeather(selectedDistrict);
  }, [selectedDistrict]);

  return (
    <div className="glass-panel text-white rounded-3xl p-6 sm:p-10 border border-white/12 shadow-2xl my-8 backdrop-blur-xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <CloudSun className="w-4 h-4 text-amber-400" />
            <span>Coastal Real-Time Utility</span>
          </div>
          <h2 className="font-serif-kokan text-2xl sm:text-4xl font-extrabold text-white">
            District Weather & Ocean Tide Guide
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Check live ocean state, monsoon rainfall alerts, scuba water clarity, and weather-based travel recommendations.
          </p>
        </div>

        {/* District Switcher Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full pb-1 no-scrollbar">
          {districts.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDistrict(d)}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                selectedDistrict === d
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {weatherData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
          
          {/* Main Temp & Ocean Status Display */}
          <div className="lg:col-span-5 bg-slate-950/60 p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 backdrop-blur-md">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] text-teal-300 uppercase font-bold tracking-wider">District Coast</span>
                <h3 className="font-serif-kokan text-2xl font-bold text-amber-300">{weatherData.district}</h3>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
                <Thermometer className="w-4 h-4 text-amber-400" />
                <span className="text-xl font-extrabold text-white">{weatherData.tempC}°C</span>
              </div>
            </div>

            {/* Condition badge */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Weather Sky:</span>
                <span className="font-bold text-white">{weatherData.condition}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Coastal Humidity:</span>
                <span className="font-bold text-teal-300">{weatherData.humidity}%</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center space-x-1">
                  <Waves className="w-4 h-4 text-sky-400" />
                  <span>Sea Water State:</span>
                </span>
                <span className="font-bold text-sky-300 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-500/40 shadow-sm">
                  {weatherData.seaCondition}
                </span>
              </div>
            </div>

            {/* Monsoon Alert Box if any */}
            {weatherData.monsoonAlert ? (
              <div className="p-3 bg-rose-950/80 border border-rose-500/40 rounded-xl text-xs text-rose-200 flex items-center space-x-2 backdrop-blur-md">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>Heavy Monsoon Rainfall Alert in Ghats. Sea ferries paused. Enjoy waterfalls!</span>
              </div>
            ) : (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-center space-x-2 backdrop-blur-md">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Ideal Ocean Visibility & Clear Sky. Perfect for Scuba & Water sports!</span>
              </div>
            )}

          </div>

          {/* Activity Recommendations Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Recommended Activities */}
            <div className="p-6 bg-slate-950/60 rounded-3xl border border-white/10 space-y-3 backdrop-blur-md">
              <h4 className="font-serif-kokan text-base font-bold text-amber-300 flex items-center space-x-2">
                <Compass className="w-4 h-4 text-teal-400" />
                <span>Recommended Activities in {weatherData.district} Today</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                {(weatherData.recommendedActivities || []).map((act, i) => (
                  <li key={i} className="flex items-center space-x-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Places To Visit Right Now */}
            <div className="p-6 bg-slate-950/60 rounded-3xl border border-white/10 space-y-3 backdrop-blur-md">
              <h4 className="font-serif-kokan text-base font-bold text-amber-300 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Top Spot Suggestions</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {(weatherData.placesToVisitNow || []).map((place, i) => (
                  <span key={i} className="px-3.5 py-1.5 rounded-xl bg-white/10 text-slate-200 text-xs font-bold border border-white/15">
                    📍 {place}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
