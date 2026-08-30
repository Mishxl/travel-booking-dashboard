import React, { useState } from 'react';
import { Search, Clock3, CheckCircle2, XCircle, Filter, Ban, Check } from 'lucide-react';

export default function AdminBookingsTable({ bookings = [], onUpdateStatus }) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter bookings by status & search term
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === 'ALL' || b.status === filterStatus;
    const searchLower = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !searchLower ||
      (b.bookingId && b.bookingId.toLowerCase().includes(searchLower)) ||
      (b.customerName && b.customerName.toLowerCase().includes(searchLower)) ||
      (b.customerEmail && b.customerEmail.toLowerCase().includes(searchLower)) ||
      (b.customerPhone && b.customerPhone.toLowerCase().includes(searchLower)) ||
      (b.destination && b.destination.toLowerCase().includes(searchLower)) ||
      (b.packageName && b.packageName.toLowerCase().includes(searchLower));

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Table Header & Controls */}
      <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Customer Bookings Directory</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage reservation status, view traveler contact info, and review revenue.
          </p>
        </div>

        {/* Filter Pills & Search Input */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ID, customer, place..."
              className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all w-52 sm:w-60"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {['ALL', 'Pending', 'Confirmed', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  filterStatus === status
                    ? 'bg-white text-teal-700 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Bookings Table */}
      {filteredBookings.length === 0 ? (
        <div className="p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Filter className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-800 text-base mb-1">No Bookings Found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {bookings.length === 0
              ? 'No bookings have been submitted by customers yet.'
              : 'No bookings match your current search and status filter criteria.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Booking ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Package</th>
                <th className="py-3.5 px-4">Travel Date</th>
                <th className="py-3.5 px-4">Travelers</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((b) => {
                const isPending = b.status === 'Pending';
                const isConfirmed = b.status === 'Confirmed';
                const isCancelled = b.status === 'Cancelled';

                return (
                  <tr key={b.bookingId} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Booking ID */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200/50">
                        {b.bookingId}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900">{b.customerName}</div>
                      <div className="text-[11px] text-slate-500 flex flex-col">
                        {b.customerEmail && <span>{b.customerEmail}</span>}
                        {b.customerPhone && <span className="text-slate-400">{b.customerPhone}</span>}
                      </div>
                    </td>

                    {/* Package */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-800">{b.destination}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[160px]">{b.packageName || b.title}</div>
                    </td>

                    {/* Travel Date */}
                    <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {b.travelDate}
                    </td>

                    {/* Travelers */}
                    <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {b.numberOfTravelers} Guests
                    </td>

                    {/* Amount */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className={`font-bold ${isCancelled ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        ₹{Number(b.totalAmount).toLocaleString('en-IN')}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {isPending && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                          <Clock3 className="w-3 h-3 text-amber-600" /> Pending
                        </span>
                      )}
                      {isConfirmed && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Confirmed
                        </span>
                      )}
                      {isCancelled && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3 text-rose-600" /> Cancelled
                        </span>
                      )}
                    </td>

                    {/* Action Controls */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {isPending && (
                          <>
                            <button
                              onClick={() => onUpdateStatus(b.bookingId, 'Confirmed')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors shadow-sm"
                              title="Confirm booking"
                            >
                              <Check className="w-3 h-3" /> Confirm
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Cancel booking ${b.bookingId}?`)) {
                                  onUpdateStatus(b.bookingId, 'Cancelled');
                                }
                              }}
                              className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors"
                              title="Cancel booking"
                            >
                              <Ban className="w-3 h-3" /> Cancel
                            </button>
                          </>
                        )}

                        {isConfirmed && (
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to cancel confirmed booking ${b.bookingId}?`)) {
                                onUpdateStatus(b.bookingId, 'Cancelled');
                              }
                            }}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors"
                            title="Cancel booking"
                          >
                            <Ban className="w-3 h-3" /> Cancel
                          </button>
                        )}

                        {isCancelled && (
                          <span className="text-[11px] text-slate-400 italic">No action</span>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
