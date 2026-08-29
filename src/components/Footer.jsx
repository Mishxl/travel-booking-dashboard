import React, { useState } from 'react';
import { Compass, Mail, Phone, MapPin, Send, Heart, CheckCircle } from 'lucide-react';

export default function Footer({ onSelectDestination }) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-teal-500/20">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Travel<span className="text-teal-400">Ease</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your trusted partner for personalized travel and holiday packages across India. Designed for wanderers, adventurers, and families.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400" />
                <span>+91 (800) 123-4567 • Mon-Sun (9am-9pm)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>support@travelease.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#packages-section" className="hover:text-teal-400 transition-colors">Tour Packages</a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-teal-400 transition-colors">Top Destinations</a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">Custom Group Tours</a>
              </li>
              <li>
                <a href="#" className="hover:text-teal-400 transition-colors">Customer Reviews</a>
              </li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Destinations
            </h4>
            <ul className="space-y-2.5 text-xs">
              {['Kashmir Packages', 'Kerala Backwaters', 'Goa Beach Tours', 'Manali Solang Trips', 'Rajasthan Forts', 'Himachal Treks'].map((dest, i) => (
                <li key={i}>
                  <button 
                    onClick={() => onSelectDestination && onSelectDestination(dest.split(' ')[0])}
                    className="hover:text-teal-400 transition-colors text-left"
                  >
                    {dest}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Special Offers
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get exclusive secret discounts and weekend deal alerts directly in your inbox.
            </p>
            {subscribed ? (
              <div className="bg-teal-950/60 border border-teal-800 text-teal-300 p-3 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-500 block">We respect your privacy. No spam ever.</span>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} TravelEase Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Cookie Settings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
