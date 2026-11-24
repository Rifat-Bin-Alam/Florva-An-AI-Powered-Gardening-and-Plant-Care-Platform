import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout, ShieldCheck, Sparkles, Calendar, ArrowRight,
  Leaf, Users, Check, Heart, Shield, Wrench, Lock, Database
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* ═══════════════════════════════════════════════
          SECTION 1: Botanical Hero Banner
          ═══════════════════════════════════════════════ */}
      <section className="pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-charcoal-100/60 dark:border-night-700 bg-offwhite dark:bg-night-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <Badge variant="forest" size="lg" icon={Sprout}>
                Florva Botanical Living Platform V2
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-forest-900 dark:text-gray-100 leading-[1.12]">
                Cultivate Serenity in Your <span className="text-forest-700 dark:text-sage-400">Living Spaces</span>.
              </h1>

              <p className="text-base sm:text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Florva connects plant enthusiasts with verified horticulture specialists. Experience secure role-based access, botanical management, and personalized plant care diagnostics.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                {isAuthenticated && user ? (
                  <Link to={user.role === 'admin' ? '/admin' : user.role === 'gardener' ? '/gardener' : '/customer'}>
                    <Button variant="primary" size="lg" icon={ArrowRight}>
                      Go to Your {user.role.toUpperCase()} Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button variant="primary" size="lg" icon={ArrowRight}>
                        Join Florva — Register
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" size="lg" icon={Lock}>
                        Sign In to Your Account
                      </Button>
                    </Link>
                  </>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-charcoal-600 dark:text-charcoal-300">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-forest dark:text-sage-400" />
                  <span>Real MongoDB Storage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-forest dark:text-sage-400" />
                  <span>Bcrypt Password Encryption</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-forest dark:text-sage-400" />
                  <span>Role-Based Access Control</span>
                </div>
              </div>
            </div>

            {/* Right Column Featured Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <Card className="overflow-hidden border-charcoal-200/80 dark:border-night-600 shadow-botanical-lg p-0 bg-white dark:bg-night-800 rounded-2xl">
                  {/* Hero Specimen Image */}
                  <div className="h-64 sm:h-72 w-full overflow-hidden bg-forest-900 relative">
                    <img
                      src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80"
                      alt="Monstera Deliciosa Botanical Specimen"
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="forest" size="sm">
                        Curated Specimen
                      </Badge>
                    </div>
                  </div>

                  {/* Specimen Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-forest-900 dark:text-gray-100">
                          Monstera Deliciosa
                        </h3>
                        <p className="text-xs text-charcoal-500 dark:text-charcoal-400 italic">
                          Swiss Cheese Plant • Tropical Foliage
                        </p>
                      </div>
                      <span className="text-base font-extrabold text-forest-700 dark:text-sage-300">
                        ৳1,850
                      </span>
                    </div>

                    <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                      Lush fenestrated leaves that naturally purify indoor air and bring architectural elegance to any modern living sanctuary.
                    </p>

                    <div className="pt-2 border-t border-charcoal-100 dark:border-night-700 flex items-center justify-between text-xs text-charcoal-500 dark:text-charcoal-400">
                      <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                        <Check className="w-3.5 h-3.5" /> Ready for Delivery
                      </span>
                      <span>Verified Rootball</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: Three Role Portals Foundation
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Badge variant="default" size="md">
            Role-Based Architecture
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-gray-100">
            Tailored Experiences for Every Platform Role
          </h2>
          <p className="text-sm text-charcoal-600 dark:text-charcoal-300">
            Florva features three distinct portals, each guarded by JWT authentication and backend role authorization middleware.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Customer Portal Card */}
          <Card className="p-6 border-charcoal-200/80 dark:border-night-600 hover:border-forest-300 dark:hover:border-sage-500/50 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest-50 dark:bg-forest-950/70 text-forest dark:text-sage-300 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-forest-900 dark:text-gray-100">
                  Customer Portal
                </h3>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
                  For Urban Plant Enthusiasts
                </p>
              </div>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                Maintain a personal botanical plant journal, schedule care reminders, view order histories, and consult with our horticulturist.
              </p>
              <ul className="space-y-1.5 text-xs text-charcoal-600 dark:text-charcoal-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-forest dark:text-sage-400 shrink-0" />
                  <span>Public registration available</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-forest dark:text-sage-400 shrink-0" />
                  <span>Personal account profile</span>
                </li>
              </ul>
            </div>

            <Link to="/register" className="pt-2">
              <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
                Register as Customer
              </Button>
            </Link>
          </Card>

          {/* Gardener Portal Card */}
          <Card className="p-6 border-charcoal-200/80 dark:border-night-600 hover:border-amber-400 dark:hover:border-amber-600/50 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-forest-900 dark:text-gray-100">
                  Gardener Portal
                </h3>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
                  For Verified Horticulture Specialists
                </p>
              </div>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                Dedicated operational workbench for managing service appointments, plant inventory stock levels, and order fulfillment.
              </p>
              <ul className="space-y-1.5 text-xs text-charcoal-600 dark:text-charcoal-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Specialized horticulture profile</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Operational task dashboard</span>
                </li>
              </ul>
            </div>

            <Link to="/register" className="pt-2">
              <Button variant="outline" size="sm" className="w-full" icon={ArrowRight}>
                Register as Gardener
              </Button>
            </Link>
          </Card>

          {/* Administrator Portal Card */}
          <Card className="p-6 border-charcoal-200/80 dark:border-night-600 hover:border-rose-400 dark:hover:border-rose-600/50 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-forest-900 dark:text-gray-100">
                  Administrator Panel
                </h3>
                <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
                  Platform Governance & Security
                </p>
              </div>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
                Platform-wide user directory oversight, financial audit logs, and catalog supervision. Protected from unauthorized public registration.
              </p>
              <ul className="space-y-1.5 text-xs text-charcoal-600 dark:text-charcoal-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>Controlled database seeding only</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span>Strict backend authorization</span>
                </li>
              </ul>
            </div>

            <Link to="/login" className="pt-2">
              <Button variant="outline" size="sm" className="w-full" icon={Lock}>
                Admin Sign In
              </Button>
            </Link>
          </Card>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3: Technology Architecture Highlights
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-forest-900 text-white rounded-3xl p-8 sm:p-12 shadow-botanical-lg">
          <div className="max-w-3xl space-y-4">
            <Badge variant="forest" size="md" className="bg-forest-800 text-sage-200 border-forest-700">
              MERN Stack Architecture
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Grounded, Incremental Engineering
            </h2>
            <p className="text-sm text-sage-200 leading-relaxed">
              Florva V2 is developed clean and feature-oriented for CSE undergraduate practicum evaluation. Every milestone is validated with genuine database records, unit tests, and browser flows.
            </p>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-xl bg-forest-800/60 border border-forest-700/60 text-center">
                <Database className="w-5 h-5 text-sage-300 mx-auto mb-1.5" />
                <span className="text-xs font-bold block text-white">MongoDB</span>
                <span className="text-[10px] text-sage-300">Port 27017</span>
              </div>
              <div className="p-3 rounded-xl bg-forest-800/60 border border-forest-700/60 text-center">
                <Sparkles className="w-5 h-5 text-sage-300 mx-auto mb-1.5" />
                <span className="text-xs font-bold block text-white">Express.js</span>
                <span className="text-[10px] text-sage-300">Port 5000</span>
              </div>
              <div className="p-3 rounded-xl bg-forest-800/60 border border-forest-700/60 text-center">
                <Leaf className="w-5 h-5 text-sage-300 mx-auto mb-1.5" />
                <span className="text-xs font-bold block text-white">React 18</span>
                <span className="text-[10px] text-sage-300">Vite 5</span>
              </div>
              <div className="p-3 rounded-xl bg-forest-800/60 border border-forest-700/60 text-center">
                <ShieldCheck className="w-5 h-5 text-sage-300 mx-auto mb-1.5" />
                <span className="text-xs font-bold block text-white">JWT + Bcrypt</span>
                <span className="text-[10px] text-sage-300">Salted 10-Rounds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
