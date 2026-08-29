import React from 'react';
import { LayoutDashboard, Users, TrendingUp, Package, PlusCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { PACKAGES_DATA } from '../data/packagesData';

export default function AdminDemoView({ onBackToHome }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-teal-600 font-bold uppercase tracking-wider text-xs bg-teal-50 px-3 py-1 rounded-full border border-teal-200/50">
              Admin Portal (Preview)
            </span>
            <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
              Frontend Mockup
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
            Travel Operations Dashboard
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Overview of total tour package listings, customer bookings, and revenue metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('New Package creation will be connected when backend/database is implemented!')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-bold shadow-md transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Package</span>
          </button>
          <button
            onClick={onBackToHome}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-sm font-semibold transition-colors"
          >
            Exit Admin
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Revenue</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">₹12,48,500</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">↑ +18.4% from last month</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Active Packages</span>
            <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">{PACKAGES_DATA.length} Active</div>
          <div className="text-xs text-slate-500 font-medium mt-1">6 Top Indian Destinations</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Bookings Count</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <LayoutDashboard className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">84 Bookings</div>
          <div className="text-xs text-blue-600 font-semibold mt-1">94% Confirmation Rate</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Customer Rating</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2">4.86 / 5.0</div>
          <div className="text-xs text-amber-600 font-semibold mt-1">Based on 827 verified reviews</div>
        </div>
      </div>

      {/* Package Management Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-lg">Active Tour Packages Inventory</h2>
          <span className="text-xs font-medium text-slate-500">Showing all {PACKAGES_DATA.length} packages</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200/70 uppercase tracking-wider">
              <tr>
                <th className="p-4">Destination</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Price / Person</th>
                <th className="p-4">Category</th>
                <th className="p-4">Rating</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PACKAGES_DATA.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img src={pkg.image} alt={pkg.destination} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{pkg.destination}</div>
                      <div className="text-slate-400 text-[11px] truncate max-w-[200px]">{pkg.title}</div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-700">{pkg.duration}</td>
                  <td className="p-4 font-bold text-slate-900">₹{pkg.price.toLocaleString('en-IN')}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-semibold">
                      {pkg.category}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-amber-600">★ {pkg.rating}</td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
                      <CheckCircle className="w-3 h-3" /> Live
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
