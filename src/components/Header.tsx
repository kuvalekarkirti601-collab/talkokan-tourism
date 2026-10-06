import React, { useState } from 'react';
import { Compass, MapPin, Calculator, Calendar, Utensils, CloudSun, Shield, Menu, X, Sparkles, Send } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenEnquiry: () => void;
  onOpenAiGuide: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenEnquiry,
  onOpenAiGuide,
  isAdminLoggedIn,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'destinations', label: 'Destinations', icon: MapPin },
    { id: 'map', label: 'Kokan Map', icon: Compass },
    { id: 'planner', label: 'Trip Planner', icon: Calendar },
    { id: 'budget', label: 'Budget Calc', icon: Calculator },
    { id: 'culture', label: 'Culinary & Culture', icon: Utensils },
    { id: 'weather', label: 'Weather Guide', icon: CloudSun },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/70 text-slate-100 backdrop-blur-xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('destinations')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 via-emerald-500 to-amber-500 p-0.5 shadow-lg shadow-teal-900/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950/90 rounded-[10px] flex items-center justify-center backdrop-blur-md">
                <span className="font-serif-kokan text-2xl font-extrabold tracking-tight text-amber-400">T</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif-kokan text-xl font-bold tracking-wide text-white">TALKOKAN</span>
                <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 font-semibold rounded-full border border-amber-500/30 backdrop-blur-md">TOURISM</span>
              </div>
              <p className="text-[10px] text-teal-400 font-medium tracking-wider uppercase">Coastal Maharashtra Portal</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-teal-500/20 text-teal-200 shadow-lg border border-teal-500/40 backdrop-blur-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-300' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right CTAs */}
          <div className="hidden md:flex items-center space-x-2.5">
            {/* AI Assistant button */}
            <button
              onClick={onOpenAiGuide}
              className="flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-teal-500/30 via-emerald-500/30 to-teal-600/30 hover:from-teal-500/40 hover:to-emerald-500/40 text-teal-200 border border-teal-500/40 backdrop-blur-md shadow-lg transition-all hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>AI Kokan Guide</span>
            </button>

            {/* Quick Enquiry button */}
            <button
              onClick={onOpenEnquiry}
              className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-900/20 transition-all hover:scale-105"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Enquire Now</span>
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-xl transition-all border backdrop-blur-md ${
                isAdminLoggedIn
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200 bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              title={isAdminLoggedIn ? "Admin Logged In - Dashboard" : "Admin Login"}
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenAiGuide}
              className="p-2 rounded-lg bg-teal-800 text-teal-200 text-xs font-medium flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="sr-only sm:not-sr-only">AI Guide</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-teal-700 text-white font-semibold'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <Icon className="w-5 h-5 text-teal-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-stone-800 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenEnquiry(); }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-amber-500 text-stone-950 font-semibold text-sm shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Submit Tour Enquiry</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-stone-800 text-stone-300 font-medium text-xs border border-stone-700"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{isAdminLoggedIn ? "Go to Admin Dashboard" : "Admin Login"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
