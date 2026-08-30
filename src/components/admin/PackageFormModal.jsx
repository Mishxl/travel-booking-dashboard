import React, { useState } from 'react';
import { X, Package, AlertCircle } from 'lucide-react';

function PackageFormContent({ onClose, onSave, editingPackage }) {
  const isEditing = Boolean(editingPackage);

  const [formData, setFormData] = useState({
    title: editingPackage?.title || '',
    destination: editingPackage?.destination || '',
    duration: editingPackage?.duration || '5 Days / 4 Nights',
    price: editingPackage?.price || '',
    originalPrice: editingPackage?.originalPrice || '',
    image: editingPackage?.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    category: editingPackage?.category || 'Mountains & Nature',
    description: editingPackage?.description || '',
    location: editingPackage?.location || '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Please enter package name / title.');
      return;
    }
    if (!formData.destination.trim()) {
      setError('Please enter destination name.');
      return;
    }
    if (!formData.duration.trim()) {
      setError('Please specify duration (e.g. 5 Days / 4 Nights).');
      return;
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setError('Please enter a valid price per person.');
      return;
    }
    if (!formData.image.trim()) {
      setError('Please provide a valid image URL.');
      return;
    }
    if (!formData.description.trim()) {
      setError('Please provide a package description.');
      return;
    }

    const priceNum = Number(formData.price);
    const originalPriceNum = formData.originalPrice ? Number(formData.originalPrice) : Math.round(priceNum * 1.3);

    const packagePayload = {
      ...(editingPackage || {}),
      id: editingPackage?.id || formData.destination.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-4),
      title: formData.title.trim(),
      destination: formData.destination.trim(),
      duration: formData.duration.trim(),
      durationDays: parseInt(formData.duration) || 5,
      price: priceNum,
      originalPrice: originalPriceNum,
      image: formData.image.trim(),
      category: formData.category || 'Tour Package',
      description: formData.description.trim(),
      location: formData.location.trim() || formData.destination.trim(),
      rating: editingPackage?.rating || 4.8,
      reviewsCount: editingPackage?.reviewsCount || 45,
      tag: editingPackage?.tag || 'New',
      highlights: editingPackage?.highlights || [
        `Guided sightseeing in ${formData.destination}`,
        'Premium hotel stay with breakfast',
        'Private transport for sightseeing transfers',
      ],
      inclusions: editingPackage?.inclusions || [
        'Star Hotel Stay',
        'Breakfast & Dinner',
        'AC Transport',
        'Sightseeing Passes',
      ],
    };

    onSave(packagePayload);
    onClose();
  };

  return (
    <div 
      className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold">
              {isEditing ? 'Edit Travel Package' : 'Add New Travel Package'}
            </h3>
            <p className="text-xs text-slate-400">
              {isEditing ? 'Update package pricing, destination, and details' : 'Create and publish a new holiday package'}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Package Title & Destination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Package Name / Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Scenic Ladakh & Pangong Adventure"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Destination Name *
            </label>
            <input
              type="text"
              name="destination"
              required
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g. Ladakh"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Duration & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Duration (Days / Nights) *
            </label>
            <input
              type="text"
              name="duration"
              required
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 6 Days / 5 Nights"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Specific Locations
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Leh, Nubra Valley, Pangong Lake"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Price & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Price (INR / Person) *
            </label>
            <input
              type="number"
              name="price"
              required
              min="500"
              value={formData.price}
              onChange={handleChange}
              placeholder="24999"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Original Price (Optional)
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              placeholder="32000"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
            >
              <option value="Mountains & Lakes">Mountains & Lakes</option>
              <option value="Beach & Nightlife">Beach & Nightlife</option>
              <option value="Nature & Backwaters">Nature & Backwaters</option>
              <option value="Adventure & Snow">Adventure & Snow</option>
              <option value="Heritage & Culture">Heritage & Culture</option>
              <option value="Scenic & Nature">Scenic & Nature</option>
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Image URL *
          </label>
          <input
            type="url"
            name="image"
            required
            value={formData.image}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/photo-..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white"
          />
          {formData.image && (
            <div className="mt-2 h-24 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">
            Package Description *
          </label>
          <textarea
            name="description"
            required
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the holiday highlights, activities, and scenic viewpoints..."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white resize-none"
          />
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold shadow-md shadow-teal-600/30 transition-all"
          >
            {isEditing ? 'Save Changes' : 'Publish Package'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default function PackageFormModal({ isOpen, onClose, onSave, editingPackage }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <PackageFormContent
        key={editingPackage?.id || 'new-package'}
        onClose={onClose}
        onSave={onSave}
        editingPackage={editingPackage}
      />
    </div>
  );
}
