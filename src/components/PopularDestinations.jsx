import React from 'react';

export default function PopularDestinations({ onSelectDestination }) {
  const destinations = [
    {
      name: 'Kashmir',
      tagline: 'Paradise on Earth',
      image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=600&q=80',
      trips: '24+ Trips Available',
    },
    {
      name: 'Kerala',
      tagline: 'God’s Own Country',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
      trips: '18+ Trips Available',
    },
    {
      name: 'Goa',
      tagline: 'Sun, Sand & Parties',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
      trips: '35+ Trips Available',
    },
    {
      name: 'Manali',
      tagline: 'Himalayan Escape',
      image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
      trips: '15+ Trips Available',
    },
    {
      name: 'Rajasthan',
      tagline: 'Land of Kings',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
      trips: '20+ Trips Available',
    },
    {
      name: 'Himachal Pradesh',
      tagline: 'Scenic Valleys',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      trips: '12+ Trips Available',
    },
  ];

  return (
    <section id="destinations" className="py-16 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-teal-600 font-bold uppercase tracking-wider text-xs bg-teal-50 px-3 py-1 rounded-full border border-teal-200/50">
              Trending Escapes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Popular Destinations
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-xl">
              Explore India's most sought-after holiday destinations with handcrafted local experiences.
            </p>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.name}
              onClick={() => onSelectDestination(dest.name)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5 border border-slate-200/70"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-bold text-base sm:text-lg leading-tight group-hover:text-teal-300 transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-0.5 truncate font-medium">
                    {dest.tagline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
