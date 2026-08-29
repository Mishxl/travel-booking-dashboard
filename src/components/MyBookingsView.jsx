import React from 'react';
import { Calendar, MapPin, CheckCircle, Clock, FileText, ArrowRight, Compass } from 'lucide-react';

export default function MyBookingsView({ bookings = [], onExploreMore }) {
  // Default sample booking if user hasn't made one yet
  const sampleBookings = bookings.length > 0 ? bookings : [
    {
      id: 'sample-1',
      bookingId: 'TE-849201',
      title: 'Enchanting Kashmir & Dal Lake',
      destination: 'Kashmir',
      duration: '6 Days / 5 Nights',
      price: 24999,
      totalAmount: 49998,
      guests: 2,
      bookingDate: '24 Aug 2026',
      status: 'Confirmed',
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=400&q=80',
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <span className="text-teal-600 font-bold uppercase tracking-wider text-xs bg-teal-50 px-3 py-1 rounded-full border border-teal-200/50">
            Traveler Dashboard
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
            My Bookings
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Manage your booked holiday packages, check trip status, and view travel vouchers.
          </p>
        </div>

        <button
          onClick={onExploreMore}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold shadow-md transition-colors"
        >
          <Compass className="w-4 h-4" />
          <span>Book Another Trip</span>
        </button>
      </div>

      <div className="space-y-4">
        {sampleBookings.map((b) => (
          <div
            key={b.bookingId || b.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 w-full md:w-auto">
              <img
                src={b.image}
                alt={b.destination}
                className="w-24 h-24 rounded-xl object-cover shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/50">
                    ID: {b.bookingId}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" /> Confirmed
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  {b.title || b.destination}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {b.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> Booked: {b.bookingDate || 'Recent'}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
              <div className="text-left md:text-right">
                <div className="text-xs text-slate-400">{b.guests || 2} Travelers</div>
                <div className="text-xl font-black text-slate-900">
                  ₹{Number(b.totalAmount || b.price).toLocaleString('en-IN')}
                </div>
              </div>

              <button
                onClick={() => alert(`Downloading Travel Voucher for Booking ID: ${b.bookingId} (${b.destination})`)}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
              >
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Voucher</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
