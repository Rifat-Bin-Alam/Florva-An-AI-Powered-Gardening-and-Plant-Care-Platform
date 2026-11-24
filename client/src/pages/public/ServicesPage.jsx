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
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-900 dark:text-gray-100 tracking-tight">
          Professional Gardening Services
        </h1>
        <p className="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
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
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors flex-shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-forest dark:bg-forest-600 text-white shadow-sm'
                : 'bg-white dark:bg-night-800 text-charcoal-700 dark:text-gray-300 hover:bg-sage-100 dark:hover:bg-night-700 border border-charcoal-200 dark:border-night-600'
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
      <div className="bg-white dark:bg-night-800 rounded-2xl border border-charcoal-200/80 dark:border-night-600 p-8 shadow-sm space-y-6 transition-colors">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <Badge variant="default" size="sm">Simple Booking Process</Badge>
          <h2 className="text-2xl font-bold text-forest-900 dark:text-gray-100">How On-Site Services Work</h2>
          <p className="text-xs text-charcoal-600 dark:text-charcoal-300">Three straightforward steps to transform your garden space.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-center">
          <div className="p-4 rounded-xl bg-offwhite dark:bg-night-900 border border-charcoal-100 dark:border-night-700 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-forest-50 dark:bg-night-800 text-forest dark:text-sage-300 font-bold flex items-center justify-center mx-auto text-sm border border-forest-200 dark:border-forest-800">
              1
            </div>
            <h3 className="font-bold text-forest-900 dark:text-gray-100 text-sm">Select Service & Slot</h3>
            <p className="text-xs text-charcoal-600 dark:text-charcoal-300">
              Pick the required service and choose your preferred date and 2-hour morning or afternoon time slot.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-offwhite dark:bg-night-900 border border-charcoal-100 dark:border-night-700 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-forest-50 dark:bg-night-800 text-forest dark:text-sage-300 font-bold flex items-center justify-center mx-auto text-sm border border-forest-200 dark:border-forest-800">
              2
            </div>
            <h3 className="font-bold text-forest-900 dark:text-gray-100 text-sm">Gardener Confirmation</h3>
            <p className="text-xs text-charcoal-600 dark:text-charcoal-300">
              Our verified horticulturist confirms your appointment and prepares appropriate organic soil and tools.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-offwhite dark:bg-night-900 border border-charcoal-100 dark:border-night-700 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-forest-50 dark:bg-night-800 text-forest dark:text-sage-300 font-bold flex items-center justify-center mx-auto text-sm border border-forest-200 dark:border-forest-800">
              3
            </div>
            <h3 className="font-bold text-forest-900 dark:text-gray-100 text-sm">On-Site Execution</h3>
            <p className="text-xs text-charcoal-600 dark:text-charcoal-300">
              We complete the work cleanly, dispose of old soil waste, and leave you with tailored plant care guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
