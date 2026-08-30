import React from 'react';
import { Calendar, MapPin, Clock, FileText, Compass, Clock3, CheckCircle2, XCircle, User, Phone, Mail, Ban, AlertCircle } from 'lucide-react';

export default function MyBookingsView({ bookings = [], onCancelBooking, onExploreMore }) {
  
  const handleCancelClick = (bookingId, destination) => {
    const isConfirmed = window.confirm(`Are you sure you want to cancel your booking for ${destination} (Booking ID: ${bookingId})?`);
    if (isConfirmed && onCancelBooking) {
      onCancelBooking(bookingId);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <span className="text-teal-600 font-bold uppercase tracking-wider text-xs bg-teal-50 px-3 py-1 rounded-full border border-teal-200/50">
            Traveler Dashboard
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
            My Bookings
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage your holiday package reservations, check trip statuses, or cancel bookings.
          </p>
        </div>

        <button
          onClick={onExploreMore}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold shadow-md transition-colors self-start sm:self-auto"
        >
          <Compass className="w-4 h-4" />
          <span>Explore More Packages</span>
        </button>
      </div>

      {/* Bookings List or Empty State */}
      {bookings.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
          <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Compass className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">
            No Bookings Found
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            You have not booked any travel packages yet. Explore our handcrafted tour packages and reserve your next dream holiday!
          </p>
          <button
            onClick={onExploreMore}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold shadow-md shadow-teal-600/20 transition-all"
          >
            Explore Packages Now
          </button>
        </div>
      ) : (
        /* Bookings List */
        <div className="space-y-5">
          {bookings.map((b) => {
            const isCancelled = b.status === 'Cancelled';
            const isPending = b.status === 'Pending';
            const isConfirmed = b.status === 'Confirmed';

            return (
              <div
                key={b.bookingId}
                className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-200 ${
                  isCancelled 
                    ? 'border-slate-200 bg-slate-50/60 opacity-80' 
                    : 'border-slate-200 shadow-sm hover:shadow-md hover:border-teal-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  
                  {/* Left: Image & Main Package Info */}
                  <div className="flex items-start gap-4 w-full lg:w-auto">
                    <img
                      src={b.image}
                      alt={b.destination}
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0 shadow-sm"
                    />
                    <div className="space-y-1.5 flex-1">
                      
                      {/* Top Badges: ID + Status */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/50">
                          ID: {b.bookingId}
                        </span>

                        {isPending && (
                          <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <Clock3 className="w-3.5 h-3.5 text-amber-600" /> Pending
                          </span>
                        )}

                        {isConfirmed && (
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Confirmed
                          </span>
                        )}

                        {isCancelled && (
                          <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5 text-rose-600" /> Cancelled
                          </span>
                        )}
                      </div>

                      {/* Package Name & Destination */}
                      <h2 className="font-bold text-slate-900 text-lg leading-tight">
                        {b.packageName || b.title}
                      </h2>
                      
                      {/* Destination & Duration */}
                      <p className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                          <MapPin className="w-3.5 h-3.5 text-teal-600" /> {b.destination}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" /> {b.duration}
                        </span>
                      </p>

                      {/* Customer Info Snippet */}
                      <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" /> 
                          <strong className="text-slate-800">{b.customerName}</strong>
                        </span>
                        {b.customerPhone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-slate-400" /> {b.customerPhone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" /> Travel Date: <strong className="text-slate-800">{b.travelDate}</strong>
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Right: Pricing & Actions */}
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 gap-4">
                    
                    {/* Price Breakdown */}
                    <div className="text-left lg:text-right">
                      <div className="text-xs text-slate-500 font-medium">
                        {b.numberOfTravelers} {b.numberOfTravelers === 1 ? 'Traveler' : 'Travelers'} (₹{b.price?.toLocaleString('en-IN')} each)
                      </div>
                      <div className={`text-2xl font-black ${isCancelled ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        ₹{Number(b.totalAmount).toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Booked on {b.bookingDate || 'Recent'}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {!isCancelled ? (
                        <button
                          onClick={() => handleCancelClick(b.bookingId, b.destination)}
                          className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors"
                        >
                          <Ban className="w-3.5 h-3.5" />
                          <span>Cancel Booking</span>
                        </button>
                      ) : (
                        <span className="text-xs text-rose-600 font-medium italic bg-rose-50/50 px-3 py-1 rounded-lg border border-rose-100">
                          Booking Cancelled
                        </span>
                      )}

                      <button
                        onClick={() => alert(`Booking ID: ${b.bookingId}\nDestination: ${b.destination}\nCustomer: ${b.customerName}\nStatus: ${b.status}\nTotal: ₹${Number(b.totalAmount).toLocaleString('en-IN')}`)}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-teal-600" />
                        <span>Details</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
