import React from 'react';
import { CalendarCheck, Users, Package, TrendingUp } from 'lucide-react';

export default function AdminStats({ bookings = [], packages = [] }) {
  // 1. Total Bookings
  const totalBookings = bookings.length;

  // 2. Total Unique Customers (by Email or Name)
  const uniqueCustomers = new Set(
    bookings
      .map((b) => (b.customerEmail || b.customerName || '').toLowerCase().trim())
      .filter(Boolean)
  ).size;

  // 3. Total Packages
  const totalPackages = packages.length;

  // 4. Total Active Revenue (exclude 'Cancelled' bookings)
  const totalRevenue = bookings
    .filter((b) => b.status !== 'Cancelled')
    .reduce((sum, b) => sum + Number(b.totalAmount || 0), 0);

  const formattedRevenue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(totalRevenue);

  const stats = [
    {
      title: 'Total Bookings',
      value: totalBookings,
      subtitle: `${bookings.filter((b) => b.status === 'Pending').length} Pending • ${bookings.filter((b) => b.status === 'Confirmed').length} Confirmed`,
      icon: <CalendarCheck className="w-6 h-6 text-teal-600" />,
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-100',
    },
    {
      title: 'Total Customers',
      value: uniqueCustomers,
      subtitle: `${uniqueCustomers} Unique Registered Travelers`,
      icon: <Users className="w-6 h-6 text-blue-600" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
    },
    {
      title: 'Total Packages',
      value: totalPackages,
      subtitle: 'Active Holiday Destinations',
      icon: <Package className="w-6 h-6 text-indigo-600" />,
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
    },
    {
      title: 'Total Revenue',
      value: formattedRevenue,
      subtitle: 'From active & confirmed bookings',
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`bg-white p-5 sm:p-6 rounded-2xl border ${stat.borderColor} shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {stat.title}
            </span>
            <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
              {stat.icon}
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
            {stat.value}
          </div>
          <div className="text-xs text-slate-500 font-medium mt-1">
            {stat.subtitle}
          </div>
        </div>
      ))}
    </div>
  );
}
