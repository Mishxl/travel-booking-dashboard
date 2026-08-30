import React, { useState } from 'react';
import AdminSidebar from './admin/AdminSidebar';
import AdminStats from './admin/AdminStats';
import AdminBookingsTable from './admin/AdminBookingsTable';
import AdminPackagesView from './admin/AdminPackagesView';
import { Menu, X, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';

export default function AdminDemoView({
  bookings = [],
  packages = [],
  onUpdateBookingStatus,
  onAddPackage,
  onUpdatePackage,
  onDeletePackage,
  onBackToHome,
}) {
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-100/60 flex flex-col lg:flex-row">
      
      {/* Mobile Sidebar Toggle Header */}
      <div className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm">TravelEase Admin</span>
        </div>

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-200"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Admin Sidebar (Desktop & Mobile Drawer) */}
      <div className={`${mobileSidebarOpen ? 'block' : 'hidden'} lg:block shrink-0`}>
        <AdminSidebar
          activeAdminTab={activeAdminTab}
          setActiveAdminTab={(tab) => {
            setActiveAdminTab(tab);
            setMobileSidebarOpen(false);
          }}
          onBackToWebsite={onBackToHome}
          bookingsCount={bookings.length}
          packagesCount={packages.length}
        />
      </div>

      {/* Main Admin Workspace */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-8 max-w-7xl mx-auto w-full">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-teal-600 font-bold uppercase tracking-wider text-xs bg-teal-50 px-3 py-1 rounded-full border border-teal-200/50">
                Live Operations Panel
              </span>
              <span className="text-xs text-slate-500 font-medium">
                • Synced with LocalStorage
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              {activeAdminTab === 'dashboard' && 'Dashboard Overview'}
              {activeAdminTab === 'bookings' && 'Customer Reservations'}
              {activeAdminTab === 'packages' && 'Tour Packages Management'}
            </h1>
          </div>

          <button
            onClick={onBackToHome}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-teal-600" />
            <span>Return to Main Site</span>
          </button>
        </div>

        {/* Tab 1: Dashboard Overview */}
        {activeAdminTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Dynamic Statistics Cards */}
            <AdminStats bookings={bookings} packages={packages} />

            {/* Recent Bookings Table Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900">Recent Customer Bookings</h2>
                <button
                  onClick={() => setActiveAdminTab('bookings')}
                  className="text-xs text-teal-600 hover:text-teal-800 font-bold hover:underline"
                >
                  View All ({bookings.length}) →
                </button>
              </div>

              <AdminBookingsTable
                bookings={bookings}
                onUpdateStatus={onUpdateBookingStatus}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Bookings Management */}
        {activeAdminTab === 'bookings' && (
          <div className="space-y-6">
            <AdminBookingsTable
              bookings={bookings}
              onUpdateStatus={onUpdateBookingStatus}
            />
          </div>
        )}

        {/* Tab 3: Packages Management */}
        {activeAdminTab === 'packages' && (
          <AdminPackagesView
            packages={packages}
            onAddPackage={onAddPackage}
            onUpdatePackage={onUpdatePackage}
            onDeletePackage={onDeletePackage}
          />
        )}

      </main>

    </div>
  );
}
