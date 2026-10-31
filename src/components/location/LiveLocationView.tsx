import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  Compass,
  Shield,
  Clock,
  AlertOctagon,
  XCircle,
  Home,
  Briefcase,
  Coffee,
  Dumbbell,
  Search,
  Crosshair,
} from 'lucide-react';
import { useApp } from '../../state/AppContext';

export const LiveLocationView: React.FC = () => {
  const {
    contacts,
    user,
    sendMessage,
    activeConversationId,
    setActiveModal,
  } = useApp();

  const [selectedContactId, setSelectedContactId] = useState<string>('contact_elena');
  const [zoomLevel, setZoomLevel] = useState<number>(13);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number }>({
    lat: 37.7749, // San Francisco default
    lng: -122.4194,
  });
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Request actual browser geolocation if supported
  const requestCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setIsLocating(false);
        },
        () => {
          setIsLocating(false);
          alert('Geolocation permission not granted. Using Cupertino demo coordinates.');
        }
      );
    }
  };

  const sharingContacts = contacts.filter((c) => c.currentLocation);
  const activeSelectedContact = contacts.find((c) => c.id === selectedContactId) || contacts[0];

  const handleShareCurrentLocation = () => {
    sendMessage(`📍 Current Location Shared: (${userCoords.lat.toFixed(4)}, ${userCoords.lng.toFixed(4)})`, {
      locationData: {
        lat: userCoords.lat,
        lng: userCoords.lng,
        address: 'Current Device Location',
        isLive: true,
        etaMinutes: 15,
      },
    });
    alert('Location shared into active conversation!');
  };

  const handleStopAllSharing = () => {
    alert('All outgoing location sessions have been terminated.');
  };

  return (
    <div className="flex-1 h-full flex flex-col md:flex-row bg-[var(--bg-app)] overflow-hidden select-none">
      {/* Left Sidebar: Contacts Sharing & Saved Places */}
      <div className="w-full md:w-80 lg:w-96 h-auto md:h-full border-r border-[var(--border-subtle)] bg-[var(--bg-sidebar)] backdrop-blur-[28px] p-4 flex flex-col overflow-y-auto space-y-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">Live Location</h2>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Real-time peer tracking, geofences, and safety radar.
          </p>
        </div>

        {/* Master Stop Sharing Privacy Kill-Switch */}
        <div className="p-3 rounded-[16px] bg-rose-500/10 border border-rose-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-rose-400" />
            <span className="text-xs font-bold text-rose-300">Location Privacy</span>
          </div>
          <button
            onClick={handleStopAllSharing}
            className="px-2.5 py-1 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold active:scale-95 transition-all"
          >
            Stop Sharing
          </button>
        </div>

        {/* Quick Location Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleShareCurrentLocation}
            className="glass-btn glass-btn-primary w-full text-xs py-2 flex items-center justify-center gap-2"
          >
            <Navigation size={15} />
            <span>Share My Location Now</span>
          </button>

          <button
            onClick={() => setActiveModal('saved_places')}
            className="glass-btn w-full text-xs py-2 flex items-center justify-center gap-2"
          >
            <Home size={15} />
            <span>Manage Saved Places</span>
          </button>
        </div>

        {/* Contacts Sharing Locations (Find My Friends Radar) */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-2.5">
            Active Contact Radar ({sharingContacts.length})
          </h3>

          <div className="space-y-2">
            {sharingContacts.map((c) => {
              const isSelected = selectedContactId === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedContactId(c.id)}
                  className={`p-3 rounded-[14px] cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-[var(--accent-primary)]/15 border-[var(--accent-primary)] text-white'
                      : 'bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-white/20 text-[var(--text-primary)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 flex-shrink-0">
                      <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold truncate">{c.name}</h4>
                        <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          Live
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--text-secondary)] truncate mt-0.5">
                        {c.currentLocation?.address}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emergency SOS Beacon Button */}
        <div className="pt-2">
          <button
            onClick={() => {
              sendMessage('🚨 EMERGENCY SOS BROADCAST: Priority location alert sent from Place de la Concorde.');
              alert('Emergency SOS Beacon broadcast to all emergency contacts!');
            }}
            className="w-full p-3 rounded-[16px] bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 active:scale-95 transition-all"
          >
            <AlertOctagon size={16} />
            <span>Emergency SOS Location Beacon</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Map Viewer Stage */}
      <div className="flex-1 h-full relative overflow-hidden bg-[#10121a]">
        {/* Map Header Overlay */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto bg-black/60 backdrop-blur-xl border border-white/15 px-4 py-2 rounded-full text-xs font-medium text-white shadow-xl flex items-center gap-2">
            <Compass size={15} className="text-cyan-400 animate-spin" />
            <span>Viewing: {activeSelectedContact?.currentLocation?.address || 'San Francisco, CA'}</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={requestCurrentLocation}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/15 text-white transition-all shadow-xl"
              title="Locate Me (GPS)"
            >
              <Crosshair size={17} className={isLocating ? 'animate-spin' : ''} />
            </button>
            <div className="flex flex-col bg-black/60 backdrop-blur-xl border border-white/15 rounded-full overflow-hidden shadow-xl text-white">
              <button
                onClick={() => setZoomLevel((z) => Math.min(18, z + 1))}
                className="px-3 py-1 hover:bg-white/10 font-bold"
              >
                +
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(3, z - 1))}
                className="px-3 py-1 hover:bg-white/10 font-bold"
              >
                -
              </button>
            </div>
          </div>
        </div>

        {/* OpenStreetMap Interactive Simulated Canvas Surface */}
        <div className="w-full h-full relative flex items-center justify-center">
          {/* Subtle Grid Simulation */}
          <div className="absolute inset-0 bg-[radial-gradient(#2d3148_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70" />

          {/* Centered Target Location Radar Simulation */}
          <div className="relative flex flex-col items-center">
            {/* Geofence Safety Zone Circle */}
            <div className="w-80 h-80 rounded-full border border-emerald-500/40 bg-emerald-500/5 flex items-center justify-center animate-pulse">
              <div className="w-56 h-56 rounded-full border border-emerald-500/60 bg-emerald-500/10" />
            </div>

            {/* Contact Marker Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-emerald-400 overflow-hidden shadow-2xl bg-black">
                  <img
                    src={activeSelectedContact?.avatar}
                    alt={activeSelectedContact?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black" />
              </div>

              {/* Speech bubble label */}
              <div className="mt-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20 whitespace-nowrap shadow-xl">
                {activeSelectedContact?.name} • 18m away
              </div>
            </div>
          </div>

          {/* Bottom Turn-by-Turn Route ETA Card */}
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-black/70 backdrop-blur-xl border border-white/20 p-4 rounded-[22px] shadow-2xl text-white space-y-2 z-20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400">Driving Directions</span>
              <span className="text-xs font-bold text-white/80">ETA 18 min (8.4 km)</span>
            </div>
            <div className="text-sm font-bold truncate">
              {activeSelectedContact?.currentLocation?.address}
            </div>
            {/* Trip progress bar */}
            <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div className="w-[65%] h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
            </div>
            <div className="flex items-center justify-between text-[10px] text-white/70 pt-1">
              <span>Departed: 14:10</span>
              <span>Arriving: 14:28</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
