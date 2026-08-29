import React from 'react';
import { ArrowRight, Star, ShieldCheck, MapPin, Compass } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  return (
    <div className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background Image with Dark & Vibrant Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-teal-950/70 backdrop-blur-[1px]" />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 md:pt-28 md:pb-36">
        <div className="max-w-3xl">
          
          {/* Startup Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
            <Compass className="w-4 h-4 text-teal-400" />
            <span>India's Premium Travel Experience</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Explore. <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300">Book.</span> Travel.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
            Discover breathtaking hill stations, tropical backwaters, royal palaces, and pristine beaches. Handcrafted holiday packages with verified stays and 24/7 travel assistance.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-all duration-200 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:translate-y-[-2px]"
            >
              <span>Explore Packages</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#destinations"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-base font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all duration-200"
            >
              <span>Popular Destinations</span>
            </a>
          </div>

          {/* Trust Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">50k+</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Happy Travelers</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 flex items-center gap-1">
                4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Trip Rating</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Verified Stays</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
