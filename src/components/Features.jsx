import React from 'react';
import { ShieldCheck, HeartHandshake, Headphones, BadgePercent } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <BadgePercent className="w-6 h-6 text-teal-600" />,
      title: 'Best Price Guarantee',
      desc: 'Transparent pricing with no hidden charges and direct partner rates.',
      bgColor: 'bg-teal-50',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Verified 4★ & 5★ Stays',
      desc: 'Personally vetted hotels, houseboats, and resorts for top hygiene.',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: <Headphones className="w-6 h-6 text-blue-600" />,
      title: '24/7 Travel Assistance',
      desc: 'Dedicated tour managers available on WhatsApp & call throughout your trip.',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-amber-600" />,
      title: 'Flexible Rescheduling',
      desc: 'Hassle-free date change and transparent cancellation protection.',
      bgColor: 'bg-amber-50',
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-teal-600 font-bold uppercase tracking-wider text-xs bg-teal-50 px-3 py-1 rounded-full border border-teal-200/50">
            Why TravelEase?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
            We Craft Seamless Journeys
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Every holiday package is planned by local experts to ensure you get the absolute best vacation experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-white hover:shadow-lg hover:border-teal-200 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl ${feat.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {feat.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                {feat.title}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
