import React, { useState, useMemo } from 'react';
import { Calendar, ShieldCheck, Clock, CheckCircle2, Sprout, ArrowRight, Wrench } from 'lucide-react';
import ServiceCard from '../../components/common/ServiceCard';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useApp } from '../../context/AppContext';

/**
 * ServicesPage — Professional Horticulture Services Catalog
 * Displays on-site balcony setup, plant health consultation,
 * and seasonal garden maintenance packages.
 */
export default function ServicesPage() {
  const { services } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(services.map(s => s.category))];

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'All') return services;
    return services.filter(s => s.category === selectedCategory);
  }, [services, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* ─── Page Header ─── */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <Badge variant="forest" size="md" icon={Calendar}>Expert Care On-Demand</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-900 tracking-tight">
          Professional Gardening Services
        </h1>
        <p className="text-sm text-charcoal-600 leading-relaxed">
          From full balcony garden setups to plant health diagnostic visits, our verified horticulturist
          brings premium organic soils, specialized tools, and expert plant guidance directly to your home.
        </p>
      </div>

      {/* ─── Category Filter Pills ─── */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors flex-shrink-0 ${
              selectedCategory === cat
                ? 'bg-forest text-white shadow-sm'
                : 'bg-white text-charcoal-700 hover:bg-sage-100 border border-charcoal-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ─── Services Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>

      {/* ─── How Service Appointments Work Explainer ─── */}
      <div className="bg-white rounded-2xl border border-charcoal-200/80 p-8 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="default" size="sm">Simple Booking Process</Badge>
          <h2 className="text-2xl font-bold text-forest-900">How On-Site Services Work</h2>
          <p className="text-xs text-charcoal-600">Three straightforward steps to transform your garden space.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-center">
          <div className="p-4 rounded-xl bg-offwhite border border-charcoal-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest font-bold flex items-center justify-center mx-auto text-sm border border-forest-200">
              1
            </div>
            <h3 className="font-bold text-forest-900 text-sm">Select Service & Slot</h3>
            <p className="text-xs text-charcoal-600">
              Pick the required service and choose your preferred date and 2-hour morning or afternoon time slot.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-offwhite border border-charcoal-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest font-bold flex items-center justify-center mx-auto text-sm border border-forest-200">
              2
            </div>
            <h3 className="font-bold text-forest-900 text-sm">Gardener Confirmation</h3>
            <p className="text-xs text-charcoal-600">
              Our verified horticulturist confirms your appointment and prepares appropriate organic soil and tools.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-offwhite border border-charcoal-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-forest-50 text-forest font-bold flex items-center justify-center mx-auto text-sm border border-forest-200">
              3
            </div>
            <h3 className="font-bold text-forest-900 text-sm">On-Site Execution</h3>
            <p className="text-xs text-charcoal-600">
              We complete the work cleanly, dispose of old soil waste, and leave you with tailored plant care guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
