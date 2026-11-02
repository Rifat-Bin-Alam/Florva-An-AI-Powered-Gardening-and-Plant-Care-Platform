import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout, ShieldCheck, Sparkles, Calendar, ArrowRight, CheckCircle2,
  Leaf, Search, ShoppingCart, Star, Users, Package, TrendingUp,
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
 * HomePage — Main landing page for Florva botanical platform.
 * Sections: Hero, How It Works, Popular Plants, Services Preview,
 * Testimonials, Platform Stats, and CTA banner.
 */
export default function HomePage() {
  const popularProducts = getPopularProducts().slice(0, 4);
  const featuredProduct = getFeaturedProduct();
  const popularServices = getPopularServices().slice(0, 3);

  // Map step icon strings to actual Lucide components
  const stepIcons = { Search, ShoppingCart, Sprout };

  return (
    <div className="space-y-16 sm:space-y-24">

      {/* ═══════════════════════════════════════════════
          SECTION 1: Hero Banner with Featured Product
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <Badge variant="forest" size="lg" icon={Sprout}>
                Florva Botanical Living Platform
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-forest-900 leading-[1.15]">
                Cultivate Serenity in Your{' '}
                <span className="text-forest-700 underline decoration-sage-300 decoration-wavy decoration-2">
                  Living Spaces
                </span>.
              </h1>

              <p className="text-base sm:text-lg text-charcoal-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Connect with verified horticulturists, discover resilient botanical plants,
                track personal watering schedules, and consult our context-aware Gemini AI plant doctor.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/shop">
                  <Button variant="primary" size="lg" icon={ArrowRight}>
                    Explore Botanical Shop
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg" icon={Calendar}>
                    Book Gardening Services
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-charcoal-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  <span>Verified Single Gardener</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  <span>Authoritative SSLCommerz Sandbox</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-600" />
                  <span>Dynamic Care Reminders</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual — Featured Product Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative Botanical Glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-sage-200 to-forest-200 rounded-2xl blur-xl opacity-60 transform -rotate-1" />

                {featuredProduct && (
                  <Card className="relative overflow-hidden border-forest-100 shadow-botanical-lg p-0">
                    <div className="h-72 sm:h-80 w-full overflow-hidden bg-forest-900 relative">
                      <img
                        src={featuredProduct.image}
                        alt={featuredProduct.name}
                        className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sage-500/80 backdrop-blur-sm text-forest-950 mb-1">
                          Featured Specimen
                        </span>
                        <h3 className="text-xl font-bold">{featuredProduct.name}</h3>
                        <p className="text-xs text-sage-200">
                          {featuredProduct.tags.join(' • ')}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 bg-white space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-charcoal-400 uppercase tracking-wider block">Practicum Specimen</span>
                          <span className="text-2xl font-bold text-forest-900">
                            ৳ {featuredProduct.price.toLocaleString()} BDT
                          </span>
                        </div>
                        <Badge variant="success" size="md">
                          In Stock & Ready
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                        <div className="p-2 rounded-lg bg-offwhite border border-charcoal-100">
                          <span className="text-charcoal-400 block text-[10px]">Sunlight</span>
                          <span className="font-semibold text-forest-800">{featuredProduct.sunlight}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-offwhite border border-charcoal-100">
                          <span className="text-charcoal-400 block text-[10px]">Watering</span>
                          <span className="font-semibold text-forest-800">{featuredProduct.waterFrequency}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-offwhite border border-charcoal-100">
                          <span className="text-charcoal-400 block text-[10px]">Difficulty</span>
                          <span className="font-semibold text-forest-800">{featuredProduct.careLevel}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: How It Works — 3 Step Explainer
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Badge variant="default" size="md">Simple & Intuitive</Badge>
          <h2 className="text-3xl font-bold text-forest-900 tracking-tight">
            How Florva Works
          </h2>
          <p className="text-sm text-charcoal-600 leading-relaxed">
            From browsing to blooming — three simple steps to transform your living space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorksSteps.map((step) => {
            const StepIcon = stepIcons[step.icon] || Sprout;
            return (
              <div key={step.step} className="text-center space-y-4 relative">
                {/* Step Number Ring */}
                <div className="relative inline-flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-forest-50 border-2 border-forest-200 flex items-center justify-center text-forest-700 shadow-sm">
                    <StepIcon className="w-7 h-7" />
                  </div>
                  {/* Step number badge */}
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-forest text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-forest-900">{step.title}</h3>
                <p className="text-xs text-charcoal-600 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>

                {/* Connector Arrow — visible on desktop between steps */}
                {step.step < 3 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-sage-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3: Popular Plants Grid
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-2">
            <Badge variant="forest" size="md" icon={Leaf}>Popular Plants</Badge>
            <h2 className="text-3xl font-bold text-forest-900 tracking-tight">
              Most Loved Botanicals
            </h2>
            <p className="text-sm text-charcoal-600">
              Hand-picked favorites chosen by our community of plant parents.
            </p>
          </div>
          <Link to="/shop">
            <Button variant="outline" size="md" icon={ArrowRight}>
              View Full Shop
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
          SECTION 4: Platform Capabilities Feature Grid
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Badge variant="default" size="md">Architectural Capabilities</Badge>
          <h2 className="text-3xl font-bold text-forest-900 tracking-tight">
            Designed for Comprehensive Plant Care
          </h2>
          <p className="text-sm text-charcoal-600 leading-relaxed">
            Every module in Florva is engineered to solve authentic gardening challenges
            while maintaining clean MERN separation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Leaf,
              title: 'Botanical E-Commerce',
              description: 'Hand-inspected indoor, outdoor, succulent, and flowering specimens paired with botanical care guides.',
              badge: 'Curated Collection',
            },
            {
              icon: Calendar,
              title: 'On-Demand Horticulturists',
              description: 'Schedule balcony setup, repotting, pest control, and diagnostic appointments with our verified gardener.',
              badge: 'Verified Services',
            },
            {
              icon: Sprout,
              title: 'Personal "My Plants" Journal',
              description: 'Catalog your collection, compute dynamic watering schedules, and receive timely in-app care alerts.',
              badge: 'Care Engine',
            },
            {
              icon: Sparkles,
              title: 'Gemini AI Plant Doctor',
              description: 'Consult our context-aware botanical AI assistant for sunlight analysis, soil advice, and diagnostics.',
              badge: 'Google Gemini Powered',
            },
          ].map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} hoverable padding="p-6" className="flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="forest" size="sm">{feature.badge}</Badge>
                  <h3 className="text-lg font-bold text-forest-900">{feature.title}</h3>
                  <p className="text-xs text-charcoal-600 leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5: Gardening Services Preview
          ═══════════════════════════════════════════════ */}
      <section className="bg-sage-50/50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="space-y-2">
              <Badge variant="forest" size="md" icon={Calendar}>Expert Services</Badge>
              <h2 className="text-3xl font-bold text-forest-900 tracking-tight">
                Professional Gardening Services
              </h2>
              <p className="text-sm text-charcoal-600">
                Book verified horticulturists for setup, consultation, and maintenance.
              </p>
            </div>
            <Link to="/services">
              <Button variant="outline" size="md" icon={ArrowRight}>
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
          SECTION 6: Customer Testimonials
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <Badge variant="default" size="md" icon={Star}>Customer Stories</Badge>
          <h2 className="text-3xl font-bold text-forest-900 tracking-tight">
            Loved by Plant Parents
          </h2>
          <p className="text-sm text-charcoal-600 leading-relaxed">
            Real feedback from customers who transformed their spaces with Florva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 7: Platform Statistics Bar
          ═══════════════════════════════════════════════ */}
      <section className="bg-forest-900 text-white py-12 rounded-2xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 shadow-botanical-lg">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-forest-800">
          {[
            { value: platformStats.totalPlants, label: 'Plant Varieties Available', icon: Package },
            { value: platformStats.happyCustomers, label: 'Happy Plant Parents', icon: Users },
            { value: platformStats.servicesCompleted, label: 'Services Completed', icon: Calendar },
            { value: platformStats.plantSurvivalRate, label: 'Plant Survival Rate', icon: TrendingUp },
          ].map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <div key={stat.label} className={idx > 0 ? 'pt-6 lg:pt-0' : ''}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <StatIcon className="w-5 h-5 text-sage-400" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-sage-300 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-sage-100 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 8: Call-to-Action Banner
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Card className="bg-gradient-to-r from-forest-50 to-sage-50 border-forest-200 shadow-botanical-lg text-center p-8 sm:p-12">
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-forest border border-forest-600 flex items-center justify-center text-sage mx-auto">
              <Sprout className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-forest-900">
              Ready to Start Your Botanical Journey?
            </h2>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Join our community of plant parents. Create a free account to shop plants,
              book services, track your collection, and access AI-powered care advice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/register">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Create Free Account
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="ghost" size="lg">
                  Learn More About Florva
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
