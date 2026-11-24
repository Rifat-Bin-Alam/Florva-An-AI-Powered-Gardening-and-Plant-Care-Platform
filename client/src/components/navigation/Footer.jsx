import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, Truck, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B1710] dark:bg-night-950 text-offwhite border-t border-forest-800 dark:border-night-700 mt-20 transition-colors">
      {/* Guarantees Banner */}
      <div className="border-b border-forest-800/80 dark:border-night-700 bg-forest-950/70 dark:bg-night-900/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest-800 dark:bg-night-800 flex items-center justify-center text-sage">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Botanical Quality Assurance</h4>
                <p className="text-xs text-sage-200 dark:text-sage-300">Vetted by certified horticulture specialists</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest-800 dark:bg-night-800 flex items-center justify-center text-sage">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Protected Root Delivery</h4>
                <p className="text-xs text-sage-200 dark:text-sage-300">Moisture-retaining botanical packaging</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-forest-800 dark:bg-night-800 flex items-center justify-center text-sage">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Role-Based Platform Governance</h4>
                <p className="text-xs text-sage-200 dark:text-sage-300">Customer, Gardener & Admin access controls</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-white">
                <Sprout className="w-4 h-4 text-sage" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">FLORVA V2</span>
            </div>
            <p className="text-xs text-sage-200 dark:text-gray-300 leading-relaxed max-w-md">
              Florva is an incremental full-stack MERN gardening platform. Built with MongoDB, Express, React, Node.js and Tailwind CSS for university CSE practicum development.
            </p>
          </div>

          {/* Platform Portals */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-sage-400 mb-3">Role Portals</h5>
            <ul className="space-y-2 text-xs text-sage-200">
              <li><Link to="/customer" className="hover:text-white transition-colors">Customer Dashboard</Link></li>
              <li><Link to="/gardener" className="hover:text-white transition-colors">Gardener Operational Portal</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Administrator Panel</Link></li>
            </ul>
          </div>

          {/* Authentication Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-sage-400 mb-3">Access & Security</h5>
            <ul className="space-y-2 text-xs text-sage-200">
              <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register Account</Link></li>
              <li><span className="text-charcoal-400">Milestone 1 — Active</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 mt-8 border-t border-forest-900 dark:border-night-800 flex flex-col sm:flex-row items-center justify-between text-xs text-sage-300 dark:text-charcoal-400">
          <p>© 2026 Florva Botanical Living Platform. CSE Practicum Project.</p>
          <div className="flex items-center gap-1 mt-2 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for botanical living</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
