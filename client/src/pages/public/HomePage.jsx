import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout, ShieldCheck, Sparkles, Calendar, ArrowRight, CheckCircle2,
  Leaf, Search, ShoppingCart, Star, Users, Package, TrendingUp, Check
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import ProductCard from '../../components/common/ProductCard';
import ServiceCard from '../../components/common/ServiceCard';
import TestimonialCard from '../../components/common/TestimonialCard';
import { getPopularProducts, getFeaturedProduct } from '../../data/mockProducts';
import { getPopularServices } from '../../data/mockServices';
import { mockTestimonials, platformStats, howItWorksSteps } from '../../data/mockTestimonials';

/**
 * HomePage — Refined Main Landing Page for Florva Botanical Platform
 * Natural, grounded gardening business aesthetic. Clean typography,
 * consistent cards, no excessive gradients or decorative blur artifacts.
 */
export default function HomePage() {
  const popularProducts = getPopularProducts().slice(0, 4);
  const featuredProduct = getFeaturedProduct();
  const popularServices = getPopularServices().slice(0, 3);

  // Map step icon strings to Lucide components
  const stepIcons = { Search, ShoppingCart, Sprout };

  return (
    <div className="space-y-16 sm:space-y-24">

      {/* ═══════════════════════════════════════════════
          SECTION 1: Hero Banner with Featured Specimen
          ═══════════════════════════════════════════════ */}
      <section className="pt-8 pb-12 sm:pt-14 sm:pb-20 border-b border-charcoal-100/60 dark:border-night-700 bg-offwhite dark:bg-night-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <Badge variant="forest" size="lg" icon={Sprout}>
                Florva Botanical Living Platform
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-forest-900 dark:text-gray-100 leading-[1.12]">
                Cultivate Serenity in Your <span className="text-forest-700 dark:text-sage-400">Living Spaces</span>.
              </h1>

              <p className="text-base sm:text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Connect with our verified horticulturist, discover resilient botanical plants,
                track personal watering schedules, and consult our context-aware Gemini AI plant doctor.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
                <Link to="/shop">
                  <Button variant="primary" size="lg" icon={ArrowRight}>
                    Explore Plant Shop
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" icon={Calendar}>
                    Book Gardening Services
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-charcoal-600 dark:text-charcoal-300">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-forest dark:text-sage-400" />
                  <span>Verified Single Gardener</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-forest dark:text-sage-400" />
                  <span>Authoritative SSLCommerz Sandbox</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-forest dark:text-sage-400" />
                  <span>Dynamic Care Reminders</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual — Featured Product Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {featuredProduct && (
                  <Card className="overflow-hidden border-charcoal-200/80 dark:border-night-600 shadow-botanical dark:shadow-botanical-dark p-0 bg-white dark:bg-night-800 rounded-2xl">
                    <div className="h-64 sm:h-72 w-full overflow-hidden bg-offwhite dark:bg-night-900 relative">
                      <img
                        src={featuredProduct.image}
                        alt={featuredProduct.name}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold bg-forest text-white shadow-sm">
                          Featured Specimen
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 bg-white/95 dark:bg-night-800/95 backdrop-blur-xs p-3 rounded-xl border border-charcoal-100 dark:border-night-600 shadow-sm flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-forest-900 dark:text-gray-100 text-sm">{featuredProduct.name}</h3>
                          <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400">{featuredProduct.tags?.join(' • ')}</p>
                        </div>
                        <span className="text-base font-extrabold text-forest-800 dark:text-sage-300">
                          ৳{featuredProduct.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-night-800 space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 rounded-lg bg-offwhite dark:bg-night-900 border border-charcoal-100 dark:border-night-700">
                          <span className="text-charcoal-400 dark:text-charcoal-500 block text-[10px]">Sunlight</span>
                          <span className="font-semibold text-forest-900 dark:text-gray-200">{featuredProduct.sunlight}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-offwhite dark:bg-night-900 border border-charcoal-100 dark:border-night-700">
                          <span className="text-charcoal-400 dark:text-charcoal-500 block text-[10px]">Watering</span>
                          <span className="font-semibold text-forest-900 dark:text-gray-200">{featuredProduct.waterFrequency}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-offwhite dark:bg-night-900 border border-charcoal-100 dark:border-night-700">
                          <span className="text-charcoal-400 dark:text-charcoal-500 block text-[10px]">Difficulty</span>
                          <span className="font-semibold text-forest-900 dark:text-gray-200">{featuredProduct.careLevel}</span>
                        </div>
                      </div>

                      <Link to={`/shop/${featuredProduct.slug}`} className="block">
                        <Button variant="outline" size="sm" className="w-full">
                          View Specimen Details
                        </Button>
                      </Link>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: How It Works — 3 Simple Steps
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <Badge variant="default" size="md">Simple & Intuitive</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-gray-100 tracking-tight">
            How Florva Works
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
            From browsing to blooming — three straightforward steps to transform your living space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {howItWorksSteps.map((step) => {
            const StepIcon = stepIcons[step.icon] || Sprout;
            return (
              <div key={step.step} className="bg-white dark:bg-night-800 rounded-2xl border border-charcoal-200/80 dark:border-night-600 p-6 text-center space-y-3 relative shadow-sm">
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-14 h-14 rounded-xl bg-forest-50 dark:bg-night-900 border border-forest-200 dark:border-forest-800 flex items-center justify-center text-forest-800 dark:text-sage-300">
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-forest text-white text-[11px] font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-forest-900 dark:text-gray-100">{step.title}</h3>
                <p className="text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3: Popular Plants Grid
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
          <div className="space-y-1">
            <Badge variant="forest" size="md" icon={Leaf}>Popular Specimens</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-gray-100 tracking-tight">
              Most Loved Botanical Plants
            </h2>
            <p className="text-xs text-charcoal-600 dark:text-charcoal-300">
              Hand-picked favorites chosen by our urban plant parents.
            </p>
          </div>
          <Link to="/shop">
            <Button variant="outline" size="sm" icon={ArrowRight}>
              View All Plants
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4: Gardening Services Preview
          ═══════════════════════════════════════════════ */}
      <section className="bg-sage-50/50 dark:bg-night-950/40 py-12 sm:py-16 border-y border-charcoal-100 dark:border-night-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
            <div className="space-y-1">
              <Badge variant="forest" size="md" icon={Calendar}>Expert Care On-Demand</Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-gray-100 tracking-tight">
                Professional Gardening Services
              </h2>
              <p className="text-xs text-charcoal-600 dark:text-charcoal-300">
                Book verified horticulturists for balcony setups, repotting, and health diagnostics.
              </p>
            </div>
            <Link to="/services">
              <Button variant="outline" size="sm" icon={ArrowRight}>
                All Services
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5: Customer Testimonials
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <Badge variant="default" size="md" icon={Star}>Verified Feedback</Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-gray-100 tracking-tight">
            Loved by Urban Plant Parents
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
            Real feedback from customers who transformed their homes with Florva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 6: Platform Statistics Bar
          ═══════════════════════════════════════════════ */}
      <section className="bg-forest-900 dark:bg-night-800 text-white py-10 rounded-2xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-botanical dark:border dark:border-night-600">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-forest-800 dark:divide-night-700">
          {[
            { value: platformStats.totalPlants, label: 'Plant Varieties Available', icon: Package },
            { value: platformStats.happyCustomers, label: 'Happy Plant Parents', icon: Users },
            { value: platformStats.servicesCompleted, label: 'Services Completed', icon: Calendar },
            { value: platformStats.plantSurvivalRate, label: 'Plant Survival Rate', icon: TrendingUp },
          ].map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <div key={stat.label} className={idx > 0 ? 'pt-4 lg:pt-0' : ''}>
                <div className="flex items-center justify-center gap-1.5 mb-1 text-sage-400">
                  <StatIcon className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-sage-300 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-sage-100 font-medium mt-0.5">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 7: Call-to-Action Banner
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="bg-forest dark:bg-night-800 text-white rounded-2xl p-8 sm:p-12 text-center space-y-4 shadow-botanical dark:border dark:border-night-600">
          <div className="w-12 h-12 rounded-xl bg-forest-800 dark:bg-night-900 border border-sage-400/40 flex items-center justify-center text-sage mx-auto">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Ready to Start Your Botanical Journey?
          </h2>
          <p className="text-xs sm:text-sm text-sage-200 dark:text-sage-300 max-w-xl mx-auto leading-relaxed">
            Create your digital garden, schedule an on-site horticulture service, or ask our
            Gemini AI botanical assistant for instant plant care guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/shop">
              <Button variant="secondary" size="lg" icon={ArrowRight}>
                Browse Plant Shop
              </Button>
            </Link>
            <Link to="/my-plants">
              <Button variant="outline" size="lg" className="border-sage-400 text-white hover:bg-forest-800 dark:hover:bg-night-700">
                Open My Plants Journal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
