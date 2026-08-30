import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2, MapPin, Clock, Star, Search, Package, Sparkles } from 'lucide-react';
import PackageFormModal from './PackageFormModal';

export default function AdminPackagesView({ packages = [], onAddPackage, onUpdatePackage, onDeletePackage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const handleOpenAdd = () => {
    setEditingPackage(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (pkg) => {
    setEditingPackage(pkg);
    setModalOpen(true);
  };

  const handleDelete = (pkg) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the package "${pkg.title}" (${pkg.destination})?\n\nNote: Existing customer bookings for this package will not be deleted.`
    );
    if (isConfirmed && onDeletePackage) {
      onDeletePackage(pkg.id);
    }
  };

  const handleSave = (savedPackage) => {
    if (editingPackage) {
      onUpdatePackage(savedPackage);
    } else {
      onAddPackage(savedPackage);
    }
  };

  const filteredPackages = packages.filter((pkg) => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return true;
    return (
      pkg.destination.toLowerCase().includes(searchLower) ||
      pkg.title.toLowerCase().includes(searchLower) ||
      (pkg.category && pkg.category.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Holiday Packages Management</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Add new holiday destinations, update rates, or remove packages from the catalog.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search packages..."
              className="pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white w-48 sm:w-56"
            />
          </div>

          {/* Add Package Button */}
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md shadow-teal-600/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Package</span>
          </button>
        </div>
      </div>

      {/* Packages Grid / Table */}
      {filteredPackages.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Package className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-800 text-base mb-1">No Packages Found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            {packages.length === 0
              ? 'There are no active packages in the inventory. Click "Add Package" to create your first package.'
              : 'No packages match your search term.'}
          </p>
          {packages.length === 0 && (
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-xl shadow-md"
            >
              Add First Package
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Image Thumbnail */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={pkg.image}
                  alt={pkg.destination}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[11px] font-bold bg-teal-600 text-white rounded-full shadow">
                    {pkg.category || 'Package'}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1 text-[11px] text-teal-300 font-semibold">
                    <MapPin className="w-3 h-3" />
                    <span>{pkg.location || pkg.destination}</span>
                  </div>
                  <h4 className="text-base font-bold truncate text-white">{pkg.title}</h4>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      {pkg.duration}
                    </span>
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {pkg.rating || 4.8}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Price & Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Price / Person</span>
                    <span className="text-lg font-black text-slate-900">
                      ₹{Number(pkg.price).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(pkg)}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-xl transition-colors text-xs font-bold flex items-center gap-1"
                      title="Edit package"
                    >
                      <Edit className="w-3.5 h-3.5 text-teal-600" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDelete(pkg)}
                      className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl transition-colors text-xs font-bold flex items-center gap-1 border border-rose-200/60"
                      title="Delete package"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <PackageFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingPackage={editingPackage}
      />
    </div>
  );
}
