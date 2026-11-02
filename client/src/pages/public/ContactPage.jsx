import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail, Phone, MapPin, Clock, Send, ChevronDown, ChevronUp,
  MessageCircle, Sprout, ArrowRight,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';

/**
 * ContactPage — Contact form, location info, and FAQ section.
 * Uses demo-only form submission (no real backend yet).
 */
export default function ContactPage() {
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // FAQ accordion state — tracks which question is expanded
  const [openFaq, setOpenFaq] = useState(null);

  // Handle input changes for the contact form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Demo form submission — simulates a network request delay
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    // Simulate API call delay (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));

    setFormLoading(false);
    setFormSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  // Toggle FAQ accordion item
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Frequently asked questions data
  const faqItems = [
    {
      question: 'How do I care for my plants after purchase?',
      answer: 'Every plant comes with a detailed care card. You can also add it to your "My Plants" journal for automated watering reminders, or consult our AI Plant Doctor for personalized advice based on your home conditions.',
    },
    {
      question: 'What areas do your gardening services cover?',
      answer: 'Currently, our gardening services are available within Dhaka city. We plan to expand to Chittagong and Sylhet in future phases. All service bookings include a location confirmation step.',
    },
    {
      question: 'How does the payment system work?',
      answer: 'Florva uses SSLCommerz sandbox environment for secure payment processing. In the production version, payments will be processed through the live SSLCommerz gateway supporting bKash, Nagad, and major bank cards.',
    },
    {
      question: 'Can I return or exchange a plant?',
      answer: 'Yes! If your plant arrives damaged or unhealthy, contact us within 48 hours with photos. Our 100% Healthy Plant Guarantee covers replacements for plants that don\'t meet our quality standards.',
    },
    {
      question: 'How do I become a gardener on the platform?',
      answer: 'Florva operates with a single verified gardener model for this practicum version. In a production environment, gardener applications would go through a verification and onboarding process managed by the administrator.',
    },
    {
      question: 'Is the AI Plant Doctor always available?',
      answer: 'The AI Plant Doctor is available 24/7 for registered users. It uses Google Gemini AI to provide context-aware botanical advice, disease diagnosis, and care recommendations based on your plant collection.',
    },
  ];

  // Contact information cards
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      primary: 'support@florva.com',
      secondary: 'We respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Call Us',
      primary: '+880 1XXX-XXXXXX',
      secondary: 'Saturday - Thursday, 10AM - 6PM',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      primary: 'Dhaka, Bangladesh',
      secondary: 'IUBAT Campus Area',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      primary: 'Sat - Thu: 10AM - 6PM',
      secondary: 'Friday: Closed',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">

      {/* ═══════════════════════════════════════════════
          SECTION 1: Page Hero
          ═══════════════════════════════════════════════ */}
      <section className="relative pt-8 pb-12 sm:pt-16 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="forest" size="lg" icon={MessageCircle}>Get in Touch</Badge>

          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-forest-900 leading-tight">
            We'd Love to Hear{' '}
            <span className="text-forest-700">From You</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
            Have a question about plants, services, or the platform? Drop us a message
            and our team will get back to you promptly.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: Contact Info Cards
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <Card key={info.title} padding="p-5" className="text-center">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-700 mx-auto">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-forest-900">{info.title}</h3>
                  <p className="text-sm font-semibold text-charcoal-800">{info.primary}</p>
                  <p className="text-xs text-charcoal-500">{info.secondary}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3: Contact Form + FAQ Side-by-Side
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Contact Form */}
          <Card className="border-forest-200">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-forest-900">Send a Message</h2>
                <p className="text-xs text-charcoal-500 mt-1">
                  Fill out the form below and we'll respond as soon as possible.
                </p>
              </div>

              {/* Success Feedback */}
              {formSubmitted && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
                  <Sprout className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-xs text-emerald-600 mt-0.5">
                      This is a demo — in production, this would send a real email.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Ayesha Rahman"
                    required
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ayesha@example.com"
                    required
                  />
                </div>

                <Input
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />

                <div className="w-full">
                  <label htmlFor="message" className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your query, plant care concerns, or feedback..."
                    className="block w-full rounded-lg border border-charcoal-200 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder-charcoal-400 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-forest-600 hover:border-charcoal-300 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={Send}
                  isLoading={formLoading}
                  className="w-full sm:w-auto"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </Card>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold text-forest-900">Frequently Asked Questions</h2>
              <p className="text-xs text-charcoal-500 mt-1">
                Quick answers to common questions about Florva.
              </p>
            </div>

            <div className="space-y-3">
              {faqItems.map((faq, index) => (
                <Card
                  key={index}
                  padding="p-0"
                  className={`overflow-hidden transition-colors ${
                    openFaq === index ? 'border-forest-300 bg-forest-50/30' : ''
                  }`}
                >
                  {/* Question Header — clickable toggle */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-offwhite-100 transition-colors"
                  >
                    <span className="text-sm font-semibold text-forest-900 leading-snug">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-4 h-4 text-forest-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-charcoal-400 flex-shrink-0" />
                    )}
                  </button>

                  {/* Answer Body — conditionally rendered */}
                  {openFaq === index && (
                    <div className="px-5 pb-4 border-t border-charcoal-100">
                      <p className="text-xs text-charcoal-600 leading-relaxed pt-3">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4: CTA Banner
          ═══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Card className="bg-gradient-to-r from-forest-50 to-sage-50 border-forest-200 shadow-botanical-lg text-center p-8 sm:p-12">
          <div className="max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-forest-900">
              Prefer to Explore on Your Own?
            </h2>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Browse our plant collection, discover gardening services, or create
              a free account to get personalized care recommendations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/shop">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Explore Plant Shop
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="lg">
                  View Services
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
