import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout, Heart, Target, Eye, Users, Shield, Leaf,
  GraduationCap, Code2, Cpu, ArrowRight, CheckCircle2,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

/**
 * AboutPage — Platform mission, technical overview, and team information.
 * Provides academic context (practicum project) and platform philosophy.
 */
export default function AboutPage() {
  // Core platform values displayed as feature cards
  const coreValues = [
    {
      icon: Leaf,
      title: 'Botanical Excellence',
      description: 'Every plant in our catalog is hand-inspected by verified horticulturists for health, root quality, and species authenticity.',
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Server-side price validation, authoritative payment processing, and immutable order snapshots ensure financial integrity.',
    },
    {
      icon: Users,
      title: 'Community Centered',
      description: 'Built around three distinct roles — Customer, Gardener, and Administrator — each with purpose-designed dashboards.',
    },
    {
      icon: Cpu,
      title: 'AI-Powered Care',
      description: 'Google Gemini integration provides context-aware botanical diagnosis, care recommendations, and species identification.',
    },
  ];

  // Technical stack items for the architecture section
  const techStack = [
    { name: 'React 18', role: 'Frontend SPA Framework' },
    { name: 'Vite 5', role: 'Build Tool & Dev Server' },
    { name: 'Tailwind CSS 3', role: 'Utility-First Styling' },
    { name: 'Node.js', role: 'Server Runtime' },
    { name: 'Express.js', role: 'API Framework' },
    { name: 'MongoDB Atlas', role: 'Cloud Database' },
    { name: 'Mongoose ODM', role: 'Data Modeling' },
    { name: 'JWT', role: 'Authentication Tokens' },
    { name: 'Google Gemini', role: 'AI Plant Assistant' },
    { name: 'SSLCommerz', role: 'Payment Gateway (Sandbox)' },
    { name: 'Lucide React', role: 'Icon Library' },
    { name: 'Recharts', role: 'Dashboard Analytics' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">

      {/* ═══════════════════════════════════════════════
          SECTION 1: Page Hero
          ═══════════════════════════════════════════════ */}
      <section className="relative pt-8 pb-12 sm:pt-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="forest" size="lg" icon={Sprout}>About Florva</Badge>

          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-forest-900 leading-tight">
            Cultivating Technology for{' '}
            <span className="text-forest-700">Plant Lovers</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-charcoal-600 max-w-3xl mx-auto leading-relaxed">
            Florva is an AI-powered botanical e-commerce and gardening services platform,
            built as an academic practicum project at IUBAT. We bridge the gap between
            technology and nature by making plant care accessible, intelligent, and joyful.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: Mission & Vision
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <Card className="border-forest-200 bg-gradient-to-br from-forest-50/50 to-white">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-forest-100 border border-forest-200 flex items-center justify-center text-forest-700">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-forest-900">Our Mission</h2>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                To democratize expert plant care by combining curated botanical commerce with
                on-demand horticulture services and AI-powered care guidance. We believe every
                home deserves the calming presence of thriving green life — regardless of
                gardening experience.
              </p>
              <ul className="space-y-2">
                {['Make plant care accessible to beginners', 'Connect customers with verified gardeners', 'Leverage AI for personalized care advice'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-charcoal-700">
                    <CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Vision Card */}
          <Card className="border-sage-200 bg-gradient-to-br from-sage-50/50 to-white">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sage-100 border border-sage-200 flex items-center justify-center text-sage-700">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-forest-900">Our Vision</h2>
              <p className="text-sm text-charcoal-600 leading-relaxed">
                To become Bangladesh's most trusted digital platform for botanical living —
                where technology nurtures nature, every plant has a care companion, and
                professional horticulture services are just a tap away.
              </p>
              <ul className="space-y-2">
                {['Bangladesh\'s leading botanical platform', 'AI-driven preventive plant care', 'Sustainable urban gardening ecosystem'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-charcoal-700">
                    <CheckCircle2 className="w-4 h-4 text-sage-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3: Core Values Grid
          ═══════════════════════════════════════════════ */}
      <section className="bg-sage-50/50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <Badge variant="default" size="md">What We Stand For</Badge>
            <h2 className="text-3xl font-bold text-forest-900 tracking-tight">
              Core Platform Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} hoverable padding="p-6" className="text-center">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 mx-auto">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-bold text-forest-900">{value.title}</h3>
                    <p className="text-xs text-charcoal-600 leading-relaxed">{value.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4: Academic Context & Developer
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Developer Profile Card */}
          <Card className="lg:col-span-2 text-center border-forest-200">
            <div className="space-y-5">
              {/* Avatar Circle with Initials */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-forest to-forest-800 border-4 border-sage-200 flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-botanical-lg">
                RBA
              </div>
              <div>
                <h3 className="text-xl font-bold text-forest-900">Rifat Bin Alam</h3>
                <p className="text-sm text-charcoal-500">Full-Stack Developer</p>
              </div>
              <Badge variant="forest" size="md" icon={GraduationCap}>
                IUBAT Practicum Project
              </Badge>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Florva is developed as a university practicum project at IUBAT,
                demonstrating full-stack MERN capabilities with modern UI/UX design,
                role-based access control, and AI integration.
              </p>
            </div>
          </Card>

          {/* Technical Architecture Summary */}
          <Card className="lg:col-span-3 border-charcoal-200">
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-charcoal-100 flex items-center justify-center text-charcoal-700">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-forest-900">Technical Architecture</h3>
                  <p className="text-xs text-charcoal-500">MERN Stack + AI Integration</p>
                </div>
              </div>

              <p className="text-xs text-charcoal-600 leading-relaxed">
                Built on the MERN stack (MongoDB, Express, React, Node.js) with a clean
                separation between client SPA and RESTful API server. The platform employs
                JWT authentication, role-based route guards, and server-side validation
                for all critical operations.
              </p>

              {/* Tech Stack Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 p-2 rounded-lg bg-offwhite border border-charcoal-100 text-xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-forest flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="font-semibold text-charcoal-800 block truncate">{tech.name}</span>
                      <span className="text-charcoal-500 text-[10px] block truncate">{tech.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5: CTA Banner
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Card className="bg-forest-900 border-forest-800 text-center p-8 sm:p-12 text-white">
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Explore What Florva Has to Offer
            </h2>
            <p className="text-sm text-sage-200 leading-relaxed">
              Browse our plant collection, discover professional gardening services,
              or create an account to start your botanical journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/shop">
                <Button variant="secondary" size="lg" icon={Leaf}>
                  Browse Plant Shop
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" icon={ArrowRight} className="border-sage-400 text-sage-200 hover:bg-forest-800 hover:text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
