import React, { useState } from 'react';
import { X, MapPin, Clock, Star, CheckCircle2, Calendar, Users, Sparkles, User, Mail, Phone, AlertCircle, Clock3 } from 'lucide-react';

export default function PackageModal({ pkg, onClose, onBookNow }) {
  const [guestCount, setGuestCount] = useState(2);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  
  // Default travel date to 7 days from now in YYYY-MM-DD
  const getDefaultDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  };
  const [travelDate, setTravelDate] = useState(getDefaultDate());
  const [formError, setFormError] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!pkg) return null;

  const todayStr = new Date().toISOString().split('T')[0];

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

  const totalCalculatedAmount = pkg.price * guestCount;

  const formattedTotalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(totalCalculatedAmount);

  const handleSubmitBooking = (e) => {
    e.preventDefault();

    // Validation
    if (!customerName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 8) {
      setFormError('Please enter a valid phone number.');
      return;
    }
    if (!travelDate) {
      setFormError('Please select your preferred travel date.');
      return;
    }

    setFormError('');

    const newBooking = {
      bookingId: 'TE-' + Math.floor(100000 + Math.random() * 900000),
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      packageName: pkg.title,
      destination: pkg.destination,
      travelDate: travelDate,
      numberOfTravelers: guestCount,
      price: pkg.price,
      totalAmount: totalCalculatedAmount,
      status: 'Pending', // Default status per requirement
      bookingDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      createdAt: new Date().toISOString(),
      image: pkg.image,
      duration: pkg.duration,
      location: pkg.location,
      category: pkg.category,
    };

    setConfirmedBooking(newBooking);
    if (onBookNow) {
      onBookNow(newBooking);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
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

        {/* Hero Image Banner in Modal */}
        <div className="relative h-56 sm:h-64 w-full shrink-0 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.destination}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent" />
          
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
          
          {confirmedBooking ? (
            /* Booking Confirmation Screen */
            <div className="text-center py-6 bg-teal-50/70 rounded-2xl border border-teal-200 p-6 animate-fade-in">
              <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-600/30">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full mb-3">
                <Clock3 className="w-3.5 h-3.5 text-amber-600" />
                Status: Pending Confirmation
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Booking Request Submitted!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                Thank you <strong className="text-slate-800">{confirmedBooking.customerName}</strong>! Your booking for <strong className="text-slate-800">{confirmedBooking.destination}</strong> has been received and saved.
              </p>

              {/* Stored Booking Summary Card */}
              <div className="bg-white p-5 rounded-2xl max-w-md mx-auto border border-teal-100 text-left text-xs space-y-2.5 shadow-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Booking ID:</span>
                  <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    {confirmedBooking.bookingId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer Name:</span>
                  <span className="font-bold text-slate-800">{confirmedBooking.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="font-medium text-slate-800">{confirmedBooking.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Travel Date:</span>
                  <span className="font-bold text-slate-800">{confirmedBooking.travelDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Travelers:</span>
                  <span className="font-bold text-slate-800">{confirmedBooking.numberOfTravelers} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Package Rate:</span>
                  <span className="font-medium text-slate-800">₹{confirmedBooking.price.toLocaleString('en-IN')} / person</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-2 font-bold text-slate-900 text-sm">
                  <span>Total Amount:</span>
                  <span className="text-teal-700 font-extrabold">₹{confirmedBooking.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Close & Explore More
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form & Itinerary Overview */
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
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Key Highlights & Sightseeing
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pkg.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Booking Form */}
              <form onSubmit={handleSubmitBooking} className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <User className="w-4 h-4 text-teal-600" />
                    Traveler & Booking Details
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">* Required details</span>
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Customer Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="e.g. john@example.com"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Travel Date *
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="date"
                        required
                        min={todayStr}
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Number of Travelers Selector */}
                <div className="pt-2 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-800 block">
                        Number of Travelers
                      </label>
                      <div className="flex items-center gap-1.5 mt-1">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setGuestCount(num)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
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

                  {/* Price Calculation (package price × number of travelers) */}
                  <div className="text-left sm:text-right bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-200">
                    <div className="text-[11px] text-slate-400">
                      {formattedPrice} × {guestCount} {guestCount === 1 ? 'Traveler' : 'Travelers'}
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                      {formattedTotalPrice}
                    </div>
                    <div className="text-[10px] text-teal-700 font-semibold">
                      Total Payable Amount
                    </div>
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/70 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/30 hover:shadow-teal-600/50 transition-all"
                  >
                    Confirm & Submit Booking
                  </button>
                </div>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
