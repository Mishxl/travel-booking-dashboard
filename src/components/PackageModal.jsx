import React, { useState } from 'react';
import { X, MapPin, Clock, Star, CheckCircle, ShieldCheck, Calendar, Users, Heart, Share2, Sparkles } from 'lucide-react';

export default function PackageModal({ pkg, onClose, onBookNow }) {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [guestCount, setGuestCount] = useState(2);

  if (!pkg) return null;

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(pkg.price);

  const formattedOriginalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(pkg.originalPrice);

  const totalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(pkg.price * guestCount);

  const handleBook = () => {
    setBookingSuccess(true);
    if (onBookNow) {
      onBookNow({
        ...pkg,
        guests: guestCount,
        totalAmount: pkg.price * guestCount,
        bookingDate: new Date().toLocaleDateString(),
        bookingId: 'TE-' + Math.floor(100000 + Math.random() * 900000)
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image in Modal */}
        <div className="relative h-64 sm:h-72 w-full shrink-0 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
          
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 text-xs font-bold bg-teal-500 text-slate-950 rounded-full uppercase tracking-wider">
                {pkg.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {pkg.rating} ({pkg.reviewsCount} reviews)
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {pkg.title}
            </h2>
            <p className="text-sm text-teal-200 flex items-center gap-1 mt-1 font-medium">
              <MapPin className="w-4 h-4" /> {pkg.location} • <Clock className="w-4 h-4 ml-1" /> {pkg.duration}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {bookingSuccess ? (
            <div className="text-center py-8 bg-teal-50 rounded-2xl border border-teal-200 p-6 animate-fade-in">
              <div className="w-16 h-16 bg-teal-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/30">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Booking Request Confirmed!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                Thank you for choosing TravelEase for your <strong className="text-slate-900">{pkg.destination}</strong> adventure. Our tour manager will contact you with the complete itinerary.
              </p>
              <div className="bg-white p-4 rounded-xl max-w-xs mx-auto border border-teal-100 text-left text-xs space-y-1.5 shadow-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-bold text-slate-800">{pkg.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-bold text-slate-800">{pkg.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Travelers:</span>
                  <span className="font-bold text-slate-800">{guestCount} Guests</span>
                </div>
                <div className="flex justify-between border-t pt-1.5 font-bold text-teal-700">
                  <span>Total Amount:</span>
                  <span>{totalPrice}</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
              >
                Done & Return to Homepage
              </button>
            </div>
          ) : (
            <>
              {/* Overview Description */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Package Overview</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {pkg.description}
                </p>
              </div>

              {/* Itinerary Highlights */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Key Highlights & Sightseeing
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {pkg.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Package Inclusions</h3>
                <div className="flex flex-wrap gap-2">
                  {pkg.inclusions.map((item, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200/60 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Guest Selector & Price Breakdown */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block">Number of Travelers</label>
                    <div className="flex items-center gap-2 mt-1">
                      {[1, 2, 4, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestCount(num)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                            guestCount === num
                              ? 'bg-teal-600 text-white shadow-sm'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right w-full sm:w-auto">
                  <div className="text-xs text-slate-400 line-through">
                    {formattedOriginalPrice} per person
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {totalPrice}
                  </div>
                  <div className="text-[11px] text-teal-700 font-semibold">
                    Includes all taxes & fees
                  </div>
                </div>
              </div>

              {/* CTA Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleBook}
                  className="px-7 py-3 rounded-xl text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/30 hover:shadow-teal-600/50 transition-all"
                >
                  Book This Package
                </button>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
