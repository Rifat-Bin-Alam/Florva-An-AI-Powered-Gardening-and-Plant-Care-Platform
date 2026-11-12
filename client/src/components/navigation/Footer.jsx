import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Heart, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-offwhite border-t border-forest-800 mt-20">
      {/* Guarantees Banner */}
      <div className="border-b border-forest-800/80 bg-forest-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest-800 flex items-center justify-center text-sage">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">100% Healthy Plant Guarantee</h4>
                <p className="text-xs text-sage-200">Inspected by verified horticulturists</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest-800 flex items-center justify-center text-sage">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Careful Botanical Delivery</h4>
                <p className="text-xs text-sage-200">Hydrated root protection packaging</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest-800 flex items-center justify-center text-sage">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">AI Botanical Diagnostics</h4>
                <p className="text-xs text-sage-200">Powered by Gemini plant care intelligence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-white">
                <Sprout className="w-4 h-4 text-sage" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">FLORVA</span>
            </div>
            <p className="text-xs text-sage-200 leading-relaxed">
              An AI-powered gardening and plant care platform designed to help urban plant lovers discover resilient botanicals, schedule expert horticulture services, and nurture their indoor jungle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-sage-300 uppercase tracking-wider mb-3">Botanical Store</h4>
            <ul className="space-y-2 text-xs text-sage-200">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Plant Varieties</Link></li>
              <li><Link to="/shop?category=Indoor" className="hover:text-white transition-colors">Indoor Air Purifiers</Link></li>
              <li><Link to="/shop?category=Flowering" className="hover:text-white transition-colors">Flowering Beauties</Link></li>
              <li><Link to="/shop?category=Succulent" className="hover:text-white transition-colors">Resilient Succulents</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-sage-300 uppercase tracking-wider mb-3">Gardening Services</h4>
            <ul className="space-y-2 text-xs text-sage-200">
              <li><Link to="/services" className="hover:text-white transition-colors">All Services</Link></li>
              <li><Link to="/services/balcony-garden-setup" className="hover:text-white transition-colors">Balcony Garden Setup</Link></li>
              <li><Link to="/services/plant-health-consultation" className="hover:text-white transition-colors">Doctor Health Visit</Link></li>
              <li><Link to="/services/seasonal-repotting-soil-refresh" className="hover:text-white transition-colors">Repotting & Soil Refresh</Link></li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-xs font-semibold text-sage-300 uppercase tracking-wider mb-3">Platform Portals</h4>
            <ul className="space-y-2 text-xs text-sage-200">
              <li><Link to="/my-plants" className="hover:text-white transition-colors">Customer "My Plants" Journal</Link></li>
              <li><Link to="/gardener" className="hover:text-white transition-colors">Gardener Operational Portal</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Administrator Dashboard</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About & Practicum Overview</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="border-t border-forest-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-sage-300 gap-3">
          <p>© 2026 Florva Botanical Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-sage fill-sage" /> by <span className="text-white font-medium">Rifat Bin Alam</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
