import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock, ShieldCheck, CheckCircle2, Calendar, MapPin,
  Phone, User, ArrowLeft, ArrowRight, Check, AlertCircle
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { useApp } from '../../context/AppContext';

/**
 * ServiceDetailPage — Complete Service Details & Appointment Scheduling
 * Features interactive date & time slot selection, customer address input,
 * and instant booking confirmation.
 */
export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { services, currentUser, createBooking } = useApp();

  const service = services.find(s => s.slug === slug);

  // Form State
  const [scheduledDate, setScheduledDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('09:00 AM - 11:00 AM');
  const [address, setAddress] = useState(currentUser.address || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [notes, setNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '02:00 PM - 04:00 PM',
    '04:00 PM - 06:00 PM'
  ];

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-forest-900">Service Package Not Found</h2>
        <p className="text-sm text-charcoal-600">The gardening service you are looking for is currently unavailable.</p>
        <Link to="/services">
          <Button variant="primary" size="md" icon={ArrowLeft}>
            Back to Services Catalog
          </Button>
        </Link>
      </div>
    );
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!scheduledDate) {
      alert('Please select an appointment date');
      return;
    }
    if (!address.trim()) {
      alert('Please enter your service address');
      return;
    }

    const newBooking = createBooking({
      serviceName: service.name,
      date: scheduledDate,
      timeSlot: selectedSlot,
      address,
      phone,
      price: service.price,
      notes
    });

    setBookingConfirmed(newBooking);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* ─── Breadcrumb ─── */}
      <nav className="flex items-center gap-2 text-xs text-charcoal-500">
        <Link to="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link to="/services" className="hover:text-forest">Services</Link>
        <span>/</span>
        <span className="text-forest-900 font-semibold truncate max-w-xs">{service.name}</span>
      </nav>

      {/* ─── Confirmation Screen View (if booked) ─── */}
      {bookingConfirmed ? (
        <Card className="max-w-2xl mx-auto text-center p-8 sm:p-12 space-y-6 border-forest-200 shadow-botanical-lg">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <Badge variant="success" size="md">Appointment Requested</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900">
              Booking Confirmed!
            </h1>
            <p className="text-xs text-charcoal-600 max-w-md mx-auto leading-relaxed">
              Your appointment request has been assigned to our verified gardener.
              You will receive confirmation shortly.
            </p>
          </div>

          <div className="bg-offwhite rounded-xl p-4 text-xs text-left space-y-2 border border-charcoal-100 max-w-md mx-auto">
            <div className="flex justify-between border-b border-charcoal-100 pb-2">
              <span className="text-charcoal-500">Booking Reference:</span>
              <strong className="text-forest-900">{bookingConfirmed.bookingNumber}</strong>
            </div>
            <div className="flex justify-between border-b border-charcoal-100 pb-2">
              <span className="text-charcoal-500">Service:</span>
              <strong className="text-forest-900">{bookingConfirmed.serviceName}</strong>
            </div>
            <div className="flex justify-between border-b border-charcoal-100 pb-2">
              <span className="text-charcoal-500">Scheduled Date:</span>
              <strong className="text-forest-900">{bookingConfirmed.date}</strong>
            </div>
            <div className="flex justify-between border-b border-charcoal-100 pb-2">
              <span className="text-charcoal-500">Time Window:</span>
              <strong className="text-forest-900">{bookingConfirmed.timeSlot}</strong>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-charcoal-500">Estimated Total:</span>
              <strong className="text-forest-900 text-sm">৳{bookingConfirmed.price.toLocaleString()} BDT</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/my-plants">
              <Button variant="primary" size="md" icon={Calendar}>
                View in My Bookings
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" size="md">
                Browse More Services
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        /* ─── Two-Column Service Overview & Booking Form ─── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Service Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-charcoal-200/80 overflow-hidden shadow-sm">
              <div className="h-64 sm:h-72 w-full bg-offwhite relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="forest" size="md">{service.category}</Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-charcoal-700 shadow-sm border border-charcoal-100 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-forest" />
                  <span>{service.duration}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 tracking-tight">
                    {service.name}
                  </h1>
                  <span className="text-2xl font-extrabold text-forest-800">
                    ৳{service.price.toLocaleString()} BDT
                  </span>
                </div>

                <p className="text-sm text-charcoal-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Inclusions Check List */}
                <div className="pt-4 border-t border-charcoal-100 space-y-3">
                  <h3 className="text-xs font-bold text-charcoal-700 uppercase tracking-wider">
                    What is Included in This Package:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.includes.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-charcoal-700">
                        <Check className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assurance Guarantee */}
                <div className="bg-sage-50 rounded-xl p-4 flex items-center gap-3 border border-sage-200 text-xs text-forest-900 mt-4">
                  <ShieldCheck className="w-5 h-5 text-forest flex-shrink-0" />
                  <span>Verified Single Gardener: Our dedicated horticulturist arrives with sanitized tools, organic soils, and complete safety equipment.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Booking Form */}
          <div className="lg:col-span-5">
            <Card className="p-6 space-y-5 border-charcoal-200/80 shadow-botanical">
              <div className="border-b border-charcoal-100 pb-3">
                <h2 className="text-lg font-bold text-forest-900">Book Appointment</h2>
                <p className="text-xs text-charcoal-500">Pick your convenient date & time slot</p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-4">
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    Select Appointment Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-offwhite border border-charcoal-200 rounded-xl px-3.5 py-2.5 text-xs text-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>

                {/* Time Slot Radio Selection */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    Available Time Window *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-xl border text-[11px] font-medium text-center transition-colors ${
                          selectedSlot === slot
                            ? 'bg-forest text-white border-forest shadow-sm'
                            : 'bg-offwhite text-charcoal-700 border-charcoal-200 hover:bg-sage-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Address */}
                <Input
                  label="Service Address *"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, House No, Sector/Area, City"
                  icon={MapPin}
                />

                {/* Contact Phone */}
                <Input
                  label="Contact Phone *"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1700-000000"
                  icon={Phone}
                />

                {/* Special Instructions */}
                <div>
                  <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                    Special Notes / Balcony Details
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g. 4th floor balcony, morning sunlight only..."
                    className="w-full bg-offwhite border border-charcoal-200 rounded-xl p-3 text-xs text-charcoal placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-forest"
                  />
                </div>

                {/* Pricing Summary */}
                <div className="pt-2 border-t border-charcoal-100 flex items-center justify-between text-xs">
                  <span className="text-charcoal-600 font-medium">Payable upon service:</span>
                  <span className="text-lg font-bold text-forest-900">৳{service.price.toLocaleString()} BDT</span>
                </div>

                {/* Submit Action */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={Calendar}
                >
                  Confirm Appointment Request
                </Button>
              </form>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
