import React, { useState, useEffect } from 'react';
import { Shield, Lock, Plus, Trash2, Edit3, CheckCircle2, Clock, Mail, Phone, Calendar, LogOut, Loader2, Sparkles } from 'lucide-react';
import { Destination, Enquiry, AdminUser, DistrictName, DestinationCategory, SeasonType } from '../types';

interface AdminDashboardProps {
  destinations: Destination[];
  onRefreshDestinations: () => void;
  onLogout: () => void;
  adminUser: AdminUser | null;
  onLoginSuccess: (user: AdminUser) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  destinations,
  onRefreshDestinations,
  onLogout,
  adminUser,
  onLoginSuccess
}) => {
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Admin Sub-tab
  const [adminTab, setAdminTab] = useState<'destinations' | 'enquiries'>('enquiries');

  // Enquiries List
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  // Add / Edit Destination Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDest, setNewDest] = useState<Partial<Destination>>({
    name: '',
    marathiName: '',
    category: 'Beaches',
    district: 'Sindhudurg',
    description: '',
    longDescription: '',
    bestTimeToVisit: 'October to May',
    seasonBadge: 'Winter Bliss',
    coordinates: { lat: 16.0353, lng: 73.4682 },
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
    highlights: ['Beach walk', 'Sunset view'],
    travelTips: 'Carry sunscreen and light cotton clothes.',
    distanceKm: { mumbai: 500, pune: 380 },
    estimatedCostPerDay: 2500,
    popularFoodNearby: ['Sol Kadhi', 'Fish Fry'],
    rating: 4.8
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        onLoginSuccess(data);
      } else {
        setLoginError(data.error || 'Login failed');
      }
    } catch (err) {
      setLoginError('Server error logging in.');
    } finally {
      setLoggingIn(false);
    }
  };

  const fetchEnquiries = async () => {
    if (!adminUser) return;
    setLoadingEnquiries(true);
    try {
      const res = await fetch('/api/enquiries', {
        headers: { Authorization: `Bearer ${adminUser.token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setEnquiries(data);
      }
    } catch (err) {
      console.error('Fetch enquiries error:', err);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  useEffect(() => {
    if (adminUser) {
      fetchEnquiries();
    }
  }, [adminUser]);

  const handleUpdateEnquiryStatus = async (id: string, status: 'New' | 'Contacted' | 'Resolved') => {
    if (!adminUser) return;
    try {
      const res = await fetch(`/api/enquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminUser.token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchEnquiries();
      }
    } catch (err) {
      console.error('Update status error:', err);
    }
  };

  const handleDeleteDestination = async (id: string) => {
    if (!adminUser || !confirm('Are you sure you want to delete this destination?')) return;
    try {
      const res = await fetch(`/api/destinations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminUser.token}` }
      });
      if (res.ok) {
        onRefreshDestinations();
      }
    } catch (err) {
      console.error('Delete dest error:', err);
    }
  };

  const handleCreateDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;

    try {
      const res = await fetch('/api/destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminUser.token}`
        },
        body: JSON.stringify(newDest)
      });
      if (res.ok) {
        setShowAddModal(false);
        onRefreshDestinations();
      }
    } catch (err) {
      console.error('Create dest error:', err);
    }
  };

  // If not logged in, show Login Screen
  if (!adminUser) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 glass-panel text-white rounded-3xl border border-white/15 shadow-2xl backdrop-blur-xl">
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-bold mx-auto flex items-center justify-center text-xl shadow-lg">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-serif-kokan text-2xl font-bold text-white">Talkokan Admin Portal</h3>
          <p className="text-xs text-slate-300">Secure access to manage tourism places & incoming enquiries</p>
        </div>

        {loginError && (
          <div className="p-3 mb-4 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs font-medium backdrop-blur-md">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Admin Email</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@talkokan.com"
              className="w-full p-3 bg-slate-950/80 text-white border border-white/15 rounded-xl text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 bg-slate-950/80 text-white border border-white/15 rounded-xl text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <p className="text-[11px] text-slate-400 italic">
            Demo Credentials: <strong>admin@talkokan.com</strong> / <strong>kokan2026</strong>
          </p>

          <button
            type="submit"
            disabled={loggingIn}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            {loggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            <span>Login to Admin Console</span>
          </button>
        </form>
      </div>
    );
  }

  // Logged In Admin Panel
  return (
    <div className="glass-panel text-white rounded-3xl p-6 sm:p-10 border border-white/12 shadow-2xl my-8 space-y-8 backdrop-blur-xl">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>Authenticated Admin Session</span>
          </div>
          <h2 className="font-serif-kokan text-2xl sm:text-3xl font-extrabold text-white">
            Talkokan Content & Lead Dashboard
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Logged in as <strong>{adminUser.email}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg flex items-center space-x-1.5 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Destination</span>
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold rounded-xl border border-white/15 flex items-center space-x-1.5 backdrop-blur-md"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 w-fit backdrop-blur-md">
        <button
          onClick={() => setAdminTab('enquiries')}
          className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
            adminTab === 'enquiries'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Tour Enquiries ({enquiries.length})
        </button>
        <button
          onClick={() => setAdminTab('destinations')}
          className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
            adminTab === 'destinations'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          Manage Places ({destinations.length})
        </button>
      </div>

      {/* Tab 1: Enquiries Management */}
      {adminTab === 'enquiries' && (
        <div className="space-y-4 animate-fadeIn">
          {loadingEnquiries ? (
            <div className="py-12 text-center text-slate-300 flex justify-center items-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
              <span>Loading tourist leads...</span>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-8 text-center text-slate-300 bg-slate-950/60 rounded-2xl border border-white/10 backdrop-blur-md">
              No enquiries received yet.
            </div>
          ) : (
            <div className="space-y-3">
              {enquiries.map((enq) => (
                <div key={enq.id} className="p-5 rounded-2xl bg-slate-950/60 border border-white/10 space-y-3 hover:border-amber-400/40 transition-colors backdrop-blur-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-serif-kokan text-lg font-bold text-amber-300">{enq.name}</h4>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          enq.status === 'New' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          enq.status === 'Contacted' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' :
                          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {enq.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">{enq.preferredDistrict} District • {enq.numTravelers} Travelers</p>
                    </div>

                    {/* Status Toggle Buttons */}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleUpdateEnquiryStatus(enq.id, 'New')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${enq.status === 'New' ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-slate-300'}`}
                      >
                        New
                      </button>
                      <button
                        onClick={() => handleUpdateEnquiryStatus(enq.id, 'Contacted')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${enq.status === 'Contacted' ? 'bg-sky-400 text-slate-950' : 'bg-white/10 text-slate-300'}`}
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => handleUpdateEnquiryStatus(enq.id, 'Resolved')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${enq.status === 'Resolved' ? 'bg-emerald-400 text-slate-950' : 'bg-white/10 text-slate-300'}`}
                      >
                        Resolved
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 bg-white/5 p-3 rounded-xl border border-white/10">
                    "{enq.message}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-1">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Mail className="w-3.5 h-3.5 text-teal-300" />
                        <a href={`mailto:${enq.email}`} className="hover:underline text-slate-200">{enq.email}</a>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Phone className="w-3.5 h-3.5 text-amber-300" />
                        <a href={`tel:${enq.phone}`} className="hover:underline text-slate-200">{enq.phone}</a>
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Dates: {enq.travelDates || 'Not specified'} • {
                        enq.createdAt && !isNaN(new Date(enq.createdAt).getTime())
                          ? new Date(enq.createdAt).toLocaleDateString('en-IN')
                          : 'Date unavailable'
                      }
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Manage Destinations CRUD */}
      {adminTab === 'destinations' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {destinations.map((dest) => (
              <div key={dest.id} className="p-4 rounded-2xl bg-slate-950/60 border border-white/10 flex flex-col justify-between space-y-3 backdrop-blur-md">
                <div className="flex items-center space-x-3">
                  <img src={dest.images[0]} alt={dest.name} className="w-14 h-14 rounded-xl object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-teal-300">{dest.category} • {dest.district}</span>
                    <h4 className="font-serif-kokan text-base font-bold text-white line-clamp-1">{dest.name}</h4>
                    <p className="text-xs text-amber-300">₹{dest.estimatedCostPerDay} / day</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-[10px] text-slate-400">ID: {dest.id}</span>
                  <button
                    onClick={() => handleDeleteDestination(dest.id)}
                    className="p-1.5 rounded-lg bg-rose-950/80 text-rose-300 hover:bg-rose-900 text-xs flex items-center space-x-1 border border-rose-500/30"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Destination Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg glass-panel text-white rounded-3xl p-6 border border-white/15 shadow-2xl max-h-[85vh] overflow-y-auto">
            <h3 className="font-serif-kokan text-xl font-bold mb-4">Add New Kokan Destination</h3>

            <form onSubmit={handleCreateDestination} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-bold">Attraction Name *</label>
                <input
                  type="text"
                  required
                  value={newDest.name || ''}
                  onChange={(e) => setNewDest({ ...newDest, name: e.target.value })}
                  placeholder="e.g. Kunkeshwar Temple & Beach"
                  className="w-full p-2.5 bg-slate-950/80 border border-white/15 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1 font-bold">District</label>
                  <select
                    value={newDest.district || 'Sindhudurg'}
                    onChange={(e) => setNewDest({ ...newDest, district: e.target.value as DistrictName })}
                    className="w-full p-2.5 bg-slate-950/80 border border-white/15 rounded-xl text-white font-medium"
                  >
                    <option value="Sindhudurg">Sindhudurg</option>
                    <option value="Ratnagiri">Ratnagiri</option>
                    <option value="Raigad">Raigad</option>
                    <option value="Palghar">Palghar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Category</label>
                  <select
                    value={newDest.category || 'Beaches'}
                    onChange={(e) => setNewDest({ ...newDest, category: e.target.value as DestinationCategory })}
                    className="w-full p-2.5 bg-slate-950/80 border border-white/15 rounded-xl text-white font-medium"
                  >
                    <option value="Beaches">Beaches</option>
                    <option value="Sea Forts">Sea Forts</option>
                    <option value="Temples">Temples</option>
                    <option value="Hill Stations">Hill Stations</option>
                    <option value="Waterfalls">Waterfalls</option>
                    <option value="Wildlife">Wildlife</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-bold">Short Description</label>
                <textarea
                  rows={2}
                  value={newDest.description || ''}
                  onChange={(e) => setNewDest({ ...newDest, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-950/80 border border-white/15 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-bold">Image URL</label>
                <input
                  type="text"
                  value={newDest.images?.[0] || ''}
                  onChange={(e) => setNewDest({ ...newDest, images: [e.target.value] })}
                  className="w-full p-2.5 bg-slate-950/80 border border-white/15 rounded-xl text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-white/10 text-slate-300 rounded-xl font-bold hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 text-slate-950 rounded-xl font-extrabold hover:bg-amber-300"
                >
                  Save Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
