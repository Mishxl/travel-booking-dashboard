import React from 'react';
import { LayoutDashboard, CalendarCheck, Package, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function AdminSidebar({ activeAdminTab, setActiveAdminTab, onBackToWebsite, bookingsCount, packagesCount }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: <CalendarCheck className="w-5 h-5" />,
      badge: bookingsCount > 0 ? bookingsCount : null,
    },
    {
      id: 'packages',
      label: 'Packages',
      icon: <Package className="w-5 h-5" />,
      badge: packagesCount > 0 ? packagesCount : null,
    },
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 lg:min-h-[calc(100vh-80px)]">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-teal-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-base font-extrabold text-white tracking-tight">Admin Portal</div>
            <div className="text-[10px] text-teal-400 font-semibold tracking-wider uppercase">TravelEase System</div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-4 space-y-1.5 flex-1">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Management
        </div>

        {menuItems.map((item) => {
          const isActive = activeAdminTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveAdminTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-teal-600 text-white font-bold shadow-md shadow-teal-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge !== null && (
                <span
                  className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-teal-400 border border-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Back to Website Link */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={onBackToWebsite}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors border border-slate-700"
        >
          <ArrowLeft className="w-4 h-4 text-teal-400" />
          <span>Back to Website</span>
        </button>
      </div>
    </aside>
  );
}
