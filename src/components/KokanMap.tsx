import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Destination } from '../types';
import { MapPin, Navigation, Compass } from 'lucide-react';

interface KokanMapProps {
  destinations: Destination[];
  selectedDestination: Destination | null;
  onSelectDestination: (dest: Destination) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
}

export const KokanMap: React.FC<KokanMapProps> = ({
  destinations,
  selectedDestination,
  onSelectDestination,
  selectedDistrict,
  setSelectedDistrict
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create map centered on Kokan (Ratnagiri/Sindhudurg coast)
      const map = L.map(mapContainerRef.current, {
        center: [16.85, 73.35],
        zoom: 8,
        zoomControl: true
      });

      // OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);

      mapInstanceRef.current = map;
      markersGroupRef.current = L.layerGroup().addTo(map);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers whenever destinations or filter changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    // Clear previous markers
    markersGroupRef.current.clearLayers();

    const filtered = selectedDistrict === 'All'
      ? destinations
      : destinations.filter(d => d.district.toLowerCase() === selectedDistrict.toLowerCase());

    filtered.forEach((dest) => {
      // Choose marker color by category
      let markerColor = '#0f766e'; // Teal default
      if (dest.category === 'Sea Forts') markerColor = '#9f2b2b'; // Laterite Red
      if (dest.category === 'Temples') markerColor = '#f59e0b'; // Gold
      if (dest.category === 'Hill Stations') markerColor = '#059669'; // Emerald

      const customHtml = `
        <div style="
          background-color: ${markerColor};
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          cursor: pointer;
          font-weight: bold;
          font-size: 14px;
        ">
          📍
        </div>
      `;

      const customIcon = L.divIcon({
        html: customHtml,
        className: 'custom-kokan-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([dest.coordinates.lat, dest.coordinates.lng], { icon: customIcon });

      // Create rich HTML popup
      const popupContent = document.createElement('div');
      popupContent.className = 'p-2 text-stone-900 max-w-[220px] font-sans';
      popupContent.innerHTML = `
        <img src="${dest.images[0]}" alt="${dest.name}" style="width: 100%; height: 90px; object-fit: cover; border-radius: 8px; margin-bottom: 6px;" referrerPolicy="no-referrer" />
        <p style="font-size: 10px; font-weight: bold; color: #0f766e; text-transform: uppercase;">${dest.category} • ${dest.district}</p>
        <h4 style="font-family: 'Playfair Display', serif; font-size: 14px; font-weight: bold; margin: 2px 0 4px 0;">${dest.name}</h4>
        <p style="font-size: 11px; color: #555; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 8px;">${dest.description}</p>
        <button id="view-dest-${dest.id}" style="width: 100%; background-color: #0f766e; color: white; border: none; padding: 6px; border-radius: 6px; font-size: 11px; font-weight: bold; cursor: pointer;">
          View Attraction Details
        </button>
      `;

      // Event listener inside popup button
      popupContent.querySelector(`#view-dest-${dest.id}`)?.addEventListener('click', () => {
        onSelectDestination(dest);
      });

      marker.bindPopup(popupContent);
      markersGroupRef.current?.addLayer(marker);
    });

  }, [destinations, selectedDistrict, onSelectDestination]);

  // Center map on selected destination if focus triggered
  useEffect(() => {
    if (selectedDestination && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(
        [selectedDestination.coordinates.lat, selectedDestination.coordinates.lng],
        11,
        { duration: 1.5 }
      );
    }
  }, [selectedDestination]);

  return (
    <div className="glass-panel text-white rounded-3xl overflow-hidden border border-white/12 shadow-2xl my-8 backdrop-blur-xl">
      
      {/* Map Control Bar */}
      <div className="p-4 sm:p-6 bg-slate-950/70 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md">
        <div>
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Interactive Laterite & Ocean Map</span>
          </div>
          <h3 className="font-serif-kokan text-xl font-bold text-white">
            Kokan Coastal Geography Explorer
          </h3>
          <p className="text-xs text-slate-300">
            Click on markers across Sindhudurg, Ratnagiri, Raigad & Palghar to inspect sea forts, beaches & temples.
          </p>
        </div>

        {/* District Selector Pill Row */}
        <div className="flex items-center space-x-1.5 overflow-x-auto max-w-full pb-1 no-scrollbar">
          {['All', 'Sindhudurg', 'Ratnagiri', 'Raigad', 'Palghar'].map((dist) => (
            <button
              key={dist}
              onClick={() => setSelectedDistrict(dist)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDistrict === dist
                  ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              {dist}
            </button>
          ))}
        </div>
      </div>

      {/* Leaflet Map DOM Container */}
      <div className="relative h-[500px] w-full z-10">
        <div ref={mapContainerRef} className="w-full h-full" />
        
        {/* Map Legend Floating Widget */}
        <div className="absolute bottom-4 left-4 z-20 p-3.5 bg-slate-950/85 backdrop-blur-md border border-white/15 rounded-2xl text-white text-[11px] shadow-2xl space-y-1.5 hidden sm:block">
          <p className="font-bold text-amber-300 text-xs border-b border-white/10 pb-1 mb-1">Map Legend</p>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-teal-500 inline-block shadow-sm" />
            <span className="text-slate-200">Beaches & Watersports</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-600 inline-block shadow-sm" />
            <span className="text-slate-200">Sea Forts & Ramparts</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-sm" />
            <span className="text-slate-200">Sacred Temples</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm" />
            <span className="text-slate-200">Hill Stations & Waterfalls</span>
          </div>
        </div>
      </div>

    </div>
  );
};
