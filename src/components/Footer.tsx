import React from 'react';
import { Compass, MapPin, Heart, Mail, Phone, ExternalLink } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenEnquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenEnquiry }) => {
  return (
    <footer className="bg-slate-950/80 text-slate-300 pt-16 pb-12 border-t border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-amber-500 flex items-center justify-center text-slate-950 font-serif-kokan font-bold text-2xl shadow-lg">
                T
              </div>
              <div>
                <span className="font-serif-kokan text-xl font-bold text-white tracking-wide">TALKOKAN</span>
                <span className="text-xs text-amber-400 ml-1.5 font-sans font-semibold">TOURISM</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your niche digital gateway to the Kokan region — celebrating the unspoiled coastlines, sea forts, Alphonso orchards, and Malvani heritage of coastal Maharashtra.
            </p>
            <div className="flex items-center space-x-2 text-xs text-teal-300">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Ratnagiri • Sindhudurg • Raigad • Palghar</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif-kokan text-base font-semibold text-white mb-4 border-b border-white/10 pb-2">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('planner')} className="hover:text-amber-300 transition-colors flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-teal-400" />
                  <span>Talkokan Trip Planner Algorithm</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('budget')} className="hover:text-amber-300 transition-colors flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-teal-400" />
                  <span>Dynamic Cost & Budget Calculator</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-amber-300 transition-colors flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-teal-400" />
                  <span>Interactive Kokan Laterite Map</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('culture')} className="hover:text-amber-300 transition-colors flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-teal-400" />
                  <span>Malvani Culinary & Festival Guide</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('weather')} className="hover:text-amber-300 transition-colors flex items-center space-x-1.5">
                  <Compass className="w-3.5 h-3.5 text-teal-400" />
                  <span>District Sea & Monsoon Weather</span>
                </button>
              </li>
            </ul>
          </div>

          {/* District Highlights */}
          <div>
            <h4 className="font-serif-kokan text-base font-semibold text-white mb-4 border-b border-white/10 pb-2">
              Kokan Districts
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex justify-between items-center text-slate-400">
                <span>Sindhudurg (Scuba & Sea Forts)</span>
                <span className="text-amber-300 font-mono">Tarkarli</span>
              </li>
              <li className="flex justify-between items-center text-slate-400">
                <span>Ratnagiri (Temples & Alphonso)</span>
                <span className="text-amber-300 font-mono">Ganpatipule</span>
              </li>
              <li className="flex justify-between items-center text-slate-400">
                <span>Raigad (Coastal Forts & Alibaug)</span>
                <span className="text-amber-300 font-mono">Janjira</span>
              </li>
              <li className="flex justify-between items-center text-slate-400">
                <span>Palghar (Cypress Woods & Kelwa)</span>
                <span className="text-amber-300 font-mono">Kelwa</span>
              </li>
            </ul>
          </div>

          {/* Tourism Desk & Consultation */}
          <div>
            <h4 className="font-serif-kokan text-base font-semibold text-white mb-4 border-b border-white/10 pb-2">
              Local Assistance Desk
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Need custom itinerary planning or local homestay recommendations? Talk to our Kokan tourism coordinators.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-teal-300" />
                <span>support@talkokan.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-teal-300" />
                <span>+91 98200 56789 (Local Desk)</span>
              </div>
            </div>
            <button
              onClick={onOpenEnquiry}
              className="mt-4 w-full py-2.5 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-1.5"
            >
              <span>Submit Tour Request</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Talkokan Tourism Portal. All rights reserved.</p>
          <p className="flex items-center mt-2 md:mt-0 space-x-1">
            <span>Designed for Maharashtra Kokan Tourism with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
};
