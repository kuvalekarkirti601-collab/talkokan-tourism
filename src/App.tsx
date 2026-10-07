import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { DestinationCard } from './components/DestinationCard';
import { DestinationModal } from './components/DestinationModal';
import { KokanMap } from './components/KokanMap';
import { ItineraryPlanner } from './components/ItineraryPlanner';
import { BudgetCalculator } from './components/BudgetCalculator';
import { CulturalHub } from './components/CulturalHub';
import { WeatherWidget } from './components/WeatherWidget';
import { AiLocalGuideModal } from './components/AiLocalGuideModal';
import EnquiryModal from "./components/EnquiryModal";

import { AdminDashboard } from './components/AdminDashboard';
import { Destination, FoodItem, Festival, AdminUser } from './types';
import { MapPin, Compass, Sparkles, Filter, RefreshCw } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('destinations');
  
  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Backend Data
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [foodList, setFoodList] = useState<FoodItem[]>([]);
  const [festivalList, setFestivalList] = useState<Festival[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modals & Focus
  const [selectedDestinationModal, setSelectedDestinationModal] = useState<Destination | null>(null);
  const [mapFocusDestination, setMapFocusDestination] = useState<Destination | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [isAiGuideOpen, setIsAiGuideOpen] = useState<boolean>(false);

  // Admin User
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('talkokan_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const fetchDestinations = async () => {
    try {
      let url = `/api/destinations?district=${encodeURIComponent(selectedDistrict)}&category=${encodeURIComponent(selectedCategory)}`;
      if (searchQuery) {
        url += `&search=${encodeURIComponent(searchQuery)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) {
        setDestinations(data);
      }
    } catch (err) {
      console.error('Fetch destinations error:', err);
    }
  };

  const fetchFoodAndFestivals = async () => {
    try {
      const [foodRes, festRes] = await Promise.all([
        fetch('/api/food'),
        fetch('/api/festivals')
      ]);
      const foodData = await foodRes.json();
      const festData = await festRes.json();
      if (Array.isArray(foodData)) setFoodList(foodData);
      if (Array.isArray(festData)) setFestivalList(festData);
    } catch (err) {
      console.error('Fetch food/festivals error:', err);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchDestinations(), fetchFoodAndFestivals()]).finally(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [selectedDistrict, selectedCategory, searchQuery]);

  const handleFocusOnMap = (dest: Destination) => {
    setMapFocusDestination(dest);
    setActiveTab('map');
  };

  const handleAdminLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    localStorage.setItem('talkokan_admin_user', JSON.stringify(user));
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('talkokan_admin_user');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-teal-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* Subtle Background Glow Orbs for Frosted Glass Effect */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEnquiry={() => setIsEnquiryModalOpen(true)}
        onOpenAiGuide={() => setIsAiGuideOpen(true)}
        isAdminLoggedIn={!!adminUser}
        onOpenAdmin={() => setActiveTab('admin')}
      />

      {/* Hero Section (always visible or on main tab) */}
      {activeTab === 'destinations' && (
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onNavigateToPlanner={() => setActiveTab('planner')}
          onNavigateToBudget={() => setActiveTab('budget')}
          onOpenAiGuide={() => setIsAiGuideOpen(true)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* TAB 1: DESTINATIONS CATALOGUE */}
        {activeTab === 'destinations' && (
          <section className="space-y-8">
            
            {/* Section Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 backdrop-blur-sm">
              <div>
                <h2 className="font-serif-kokan text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Featured Destinations
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Showing {destinations.length} curated destinations in {selectedDistrict === 'All' ? 'Whole Kokan' : selectedDistrict}
                </p>
              </div>

              {(selectedDistrict !== 'All' || selectedCategory !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedDistrict('All');
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 text-xs font-semibold backdrop-blur-md transition-all flex items-center space-x-1.5 shadow-lg"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* Destination Cards Grid */}
            {loading ? (
              <div className="py-20 text-center text-slate-400 glass-panel rounded-3xl">
                <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-xs font-bold uppercase tracking-wider text-teal-300">Loading Coastal Places...</p>
              </div>
            ) : destinations.length === 0 ? (
              <div className="p-12 text-center glass-panel rounded-3xl border border-white/10 text-slate-400 space-y-3">
                <MapPin className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="font-serif-kokan text-lg font-bold text-slate-200">No destinations found</h3>
                <p className="text-xs max-w-md mx-auto text-slate-400">
                  No places matched your search query "{searchQuery}". Try selecting "All" districts or reset filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((dest) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    onSelect={(d) => setSelectedDestinationModal(d)}
                    onFocusOnMap={handleFocusOnMap}
                  />
                ))}
              </div>
            )}

          </section>
        )}

        {/* TAB 2: INTERACTIVE LEAFLET MAP */}
        {activeTab === 'map' && (
          <KokanMap
            destinations={destinations}
            selectedDestination={mapFocusDestination}
            onSelectDestination={(d) => setSelectedDestinationModal(d)}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={setSelectedDistrict}
          />
        )}

        {/* TAB 3: CUSTOM ITINERARY PLANNER */}
        {activeTab === 'planner' && (
          <ItineraryPlanner onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />
        )}

        {/* TAB 4: DYNAMIC BUDGET CALCULATOR */}
        {activeTab === 'budget' && (
          <BudgetCalculator onOpenEnquiry={() => setIsEnquiryModalOpen(true)} />
        )}

        {/* TAB 5: CULINARY & FESTIVAL HUB */}
        {activeTab === 'culture' && (
          <CulturalHub foodList={foodList} festivalList={festivalList} />
        )}

        {/* TAB 6: WEATHER & SEA GUIDE */}
        {activeTab === 'weather' && (
          <WeatherWidget />
        )}

        {/* TAB 7: ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <AdminDashboard
            destinations={destinations}
            onRefreshDestinations={fetchDestinations}
            onLogout={handleAdminLogout}
            adminUser={adminUser}
            onLoginSuccess={handleAdminLoginSuccess}
          />
        )}

      </main>

      {/* Modals */}
      <DestinationModal
        destination={selectedDestinationModal}
        onClose={() => setSelectedDestinationModal(null)}
        onFocusOnMap={handleFocusOnMap}
        onOpenEnquiry={() => setIsEnquiryModalOpen(true)}
      />

      <AiLocalGuideModal
        isOpen={isAiGuideOpen}
        onClose={() => setIsAiGuideOpen(false)}
      />

      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenEnquiry={() => setIsEnquiryModalOpen(true)}
      />

    </div>
  );
}
