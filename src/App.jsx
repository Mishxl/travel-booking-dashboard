import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import PopularDestinations from './components/PopularDestinations';
import PackageCard from './components/PackageCard';
import PackageModal from './components/PackageModal';
import Features from './components/Features';
import Footer from './components/Footer';
import MyBookingsView from './components/MyBookingsView';
import AdminDemoView from './components/AdminDemoView';
import { PACKAGES_DATA } from './data/packagesData';
import { Sparkles, MapPinOff } from 'lucide-react';

const LOCAL_STORAGE_BOOKINGS_KEY = 'travelease_bookings';
const LOCAL_STORAGE_PACKAGES_KEY = 'travelease_packages';

export default function App() {
  // Navigation State ('home', 'explore', 'bookings', 'admin')
  const [activeTab, setActiveTab] = useState('home');

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('All Destinations');
  const [sortBy, setSortBy] = useState('featured');

  // Selected package for Modal view
  const [selectedPackage, setSelectedPackage] = useState(null);

  // 1. Packages State initialized from localStorage (fallback to PACKAGES_DATA)
  const [packages, setPackages] = useState(() => {
    try {
      const savedPackages = localStorage.getItem(LOCAL_STORAGE_PACKAGES_KEY);
      if (savedPackages) {
        const parsed = JSON.parse(savedPackages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Failed to load packages from localStorage:', error);
    }
    return PACKAGES_DATA;
  });

  // Sync packages to localStorage whenever modified
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PACKAGES_KEY, JSON.stringify(packages));
    } catch (error) {
      console.error('Failed to save packages to localStorage:', error);
    }
  }, [packages]);

  // 2. User Bookings State initialized from localStorage
  const [userBookings, setUserBookings] = useState(() => {
    try {
      const savedBookings = localStorage.getItem(LOCAL_STORAGE_BOOKINGS_KEY);
      if (savedBookings) {
        return JSON.parse(savedBookings);
      }
    } catch (error) {
      console.error('Failed to load bookings from localStorage:', error);
    }
    return [];
  });

  // Sync userBookings to localStorage whenever modified
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BOOKINGS_KEY, JSON.stringify(userBookings));
    } catch (error) {
      console.error('Failed to save bookings to localStorage:', error);
    }
  }, [userBookings]);

  // Filter & Sort the Packages dynamically from state
  const filteredPackages = useMemo(() => {
    let result = [...packages];

    // Filter by destination dropdown / tag
    if (selectedDestination && selectedDestination !== 'All Destinations') {
      result = result.filter(
        (pkg) => pkg.destination.toLowerCase() === selectedDestination.toLowerCase()
      );
    }

    // Filter by search text query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (pkg) =>
          pkg.destination.toLowerCase().includes(query) ||
          pkg.title.toLowerCase().includes(query) ||
          (pkg.location && pkg.location.toLowerCase().includes(query)) ||
          (pkg.category && pkg.category.toLowerCase().includes(query)) ||
          (pkg.description && pkg.description.toLowerCase().includes(query))
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'duration') {
      result.sort((a, b) => (b.durationDays || 0) - (a.durationDays || 0));
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [packages, searchQuery, selectedDestination, sortBy]);

  // Reset all filters helper
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDestination('All Destinations');
    setSortBy('featured');
  };

  // When a destination card is clicked in PopularDestinations
  const handleSelectPopularDestination = (destName) => {
    setSelectedDestination(destName);
    const targetElement = document.getElementById('packages-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to packages section
  const handleExploreClick = () => {
    const targetElement = document.getElementById('packages-section');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- Booking Handlers ---
  const handleNewBooking = (newBooking) => {
    setUserBookings((prev) => [newBooking, ...prev]);
  };

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    setUserBookings((prev) =>
      prev.map((b) => (b.bookingId === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const handleCancelBooking = (bookingId) => {
    handleUpdateBookingStatus(bookingId, 'Cancelled');
  };

  // --- Package CRUD Handlers ---
  const handleAddPackage = (newPkg) => {
    setPackages((prev) => [newPkg, ...prev]);
  };

  const handleUpdatePackage = (updatedPkg) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === updatedPkg.id ? updatedPkg : p))
    );
  };

  const handleDeletePackage = (pkgId) => {
    setPackages((prev) => prev.filter((p) => p.id !== pkgId));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Areas */}
      {activeTab === 'bookings' ? (
        <main className="flex-1">
          <MyBookingsView
            bookings={userBookings}
            onCancelBooking={handleCancelBooking}
            onExploreMore={() => {
              setActiveTab('home');
              handleExploreClick();
            }}
          />
        </main>
      ) : activeTab === 'admin' ? (
        <main className="flex-1">
          <AdminDemoView
            bookings={userBookings}
            packages={packages}
            onUpdateBookingStatus={handleUpdateBookingStatus}
            onAddPackage={handleAddPackage}
            onUpdatePackage={handleUpdatePackage}
            onDeletePackage={handleDeletePackage}
            onBackToHome={() => setActiveTab('home')}
          />
        </main>
      ) : (
        <main className="flex-1">
          
          {/* Hero Section */}
          <Hero onExploreClick={handleExploreClick} />

          {/* Interactive Floating Search & Filter Bar */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedDestination={selectedDestination}
            setSelectedDestination={setSelectedDestination}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onResetFilters={handleResetFilters}
            totalResults={filteredPackages.length}
          />

          {/* Popular Destinations Showcase */}
          <PopularDestinations
            onSelectDestination={handleSelectPopularDestination}
          />

          {/* Main Travel Packages Grid Section */}
          <section id="packages-section" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <div className="inline-flex items-center gap-1.5 text-teal-600 font-bold uppercase tracking-wider text-xs bg-teal-50 px-3 py-1 rounded-full border border-teal-200/50">
                  <Sparkles className="w-3.5 h-3.5" />
                  Handpicked Itineraries
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                  Featured Travel Packages
                </h2>
                <p className="text-slate-600 text-sm mt-1 max-w-xl">
                  All-inclusive vacation plans with verified stays, local sightseeing, meals, and dedicated transport.
                </p>
              </div>

              {/* Active Filter Indicator */}
              {selectedDestination !== 'All Destinations' && (
                <div className="flex items-center gap-2 bg-teal-50 text-teal-800 text-xs px-3.5 py-1.5 rounded-full border border-teal-200 self-start md:self-auto font-semibold">
                  <span>Filtered by: <strong>{selectedDestination}</strong></span>
                  <button
                    onClick={() => setSelectedDestination('All Destinations')}
                    className="ml-1 hover:text-teal-950 font-bold"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            {/* Packages Grid or Empty State */}
            {filteredPackages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredPackages.map((pkg) => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    onSelectPackage={setSelectedPackage}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <MapPinOff className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">
                  No Travel Packages Found
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  We couldn't find any packages matching "{searchQuery || selectedDestination}". Try resetting your filters to explore all available destinations.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold shadow-md transition-colors"
                >
                  Reset Filters & View All Packages
                </button>
              </div>
            )}

          </section>

          {/* Startup Value & Features Section */}
          <Features />

        </main>
      )}

      {/* Footer */}
      <Footer onSelectDestination={handleSelectPopularDestination} />

      {/* Package Details & Booking Modal */}
      {selectedPackage && (
        <PackageModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
          onBookNow={handleNewBooking}
        />
      )}

    </div>
  );
}
