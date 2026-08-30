import React from 'react';
import { Clock, Star, ArrowUpRight, CheckCircle2, MapPin } from 'lucide-react';

export default function PackageCard({ pkg, onSelectPackage }) {
  // Format price in Indian Rupee format (e.g. ₹24,999)
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(pkg.price);

  const formattedOriginalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(pkg.originalPrice || Math.round(pkg.price * 1.3));

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={pkg.image}
          alt={pkg.destination}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          {pkg.tag && (
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-teal-600 text-white rounded-full shadow-md">
              {pkg.tag}
            </span>
          )}
          <span className="px-2.5 py-1 text-xs font-semibold bg-black/50 text-white backdrop-blur-md rounded-full">
            {pkg.category}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur-md rounded-full shadow text-xs font-bold text-slate-800">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span>{pkg.rating || 4.8}</span>
          <span className="text-slate-400 font-normal">({pkg.reviewsCount || 40})</span>
        </div>

        {/* Destination Title on Image */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
          <div className="flex items-center gap-1.5 text-xs text-teal-300 font-semibold mb-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{pkg.location || pkg.destination}</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-sm line-clamp-1">
            {pkg.destination}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Duration & Package Name */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-2">
            <span className="flex items-center gap-1 text-slate-700 font-semibold bg-slate-100 px-2.5 py-1 rounded-md">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              {pkg.duration}
            </span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              Verified Tour
            </span>
          </div>

          <h4 className="text-base font-bold text-slate-900 line-clamp-1 mb-2 group-hover:text-teal-700 transition-colors">
            {pkg.title}
          </h4>

          <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
            {pkg.description}
          </p>

          {/* Quick Highlight Points */}
          <div className="space-y-1.5 mb-4">
            {(pkg.highlights || ['Guided sightseeing', 'Hotel & breakfast']).slice(0, 2).map((highlight, index) => (
              <div key={index} className="flex items-start gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA Section */}
        <div className="pt-4 border-t border-slate-100 flex items-end justify-between mt-auto">
          <div>
            <div className="text-[11px] text-slate-500 font-medium line-through">
              {formattedOriginalPrice}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">{formattedPrice}</span>
              <span className="text-xs text-slate-500 font-medium">/ person</span>
            </div>
          </div>

          <button
            onClick={() => onSelectPackage(pkg)}
            className="flex items-center gap-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white transition-all duration-200 border border-teal-200 hover:border-teal-600 shadow-sm"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
