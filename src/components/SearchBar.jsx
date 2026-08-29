import React from 'react';
import { Search, MapPin, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
import { DESTINATIONS_LIST } from '../data/packagesData';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedDestination,
  setSelectedDestination,
  sortBy,
  setSortBy,
  onResetFilters,
  totalResults
}) {
  return (
    <div className="w-full max-w-5xl mx-auto -mt-10 relative z-20 px-4">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-4 sm:p-6 backdrop-blur-xl">
        
        {/* Main Search Input & Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Destination Search Input */}
          <div className="md:col-span-6 relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              Where do you want to go?
            </label>
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Kashmir, Kerala, Goa, Manali..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-full w-5 h-5 flex items-center justify-center font-bold"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Quick Destination Dropdown */}
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Destination
            </label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full py-3 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all cursor-pointer"
            >
              {DESTINATIONS_LIST.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-3 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all cursor-pointer"
            >
              <option value="featured">Featured / Best Seller</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="duration">Duration (Days)</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Tags & Results Counter */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Popular:
            </span>
            {['Kashmir', 'Kerala', 'Goa', 'Manali', 'Rajasthan', 'Himachal Pradesh'].map((item) => (
              <button
                key={item}
                onClick={() => setSelectedDestination(selectedDestination === item ? 'All Destinations' : item)}
                className={`px-3 py-1 rounded-full font-medium transition-all ${
                  selectedDestination === item
                    ? 'bg-teal-600 text-white shadow-sm font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500 font-medium">
              Showing <strong className="text-slate-800 font-bold">{totalResults}</strong> {totalResults === 1 ? 'package' : 'packages'}
            </span>

            {(searchQuery || selectedDestination !== 'All Destinations' || sortBy !== 'featured') && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
