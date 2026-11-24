import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sprout, User, Mail, Lock, Phone, MapPin,
  AlertCircle, ArrowRight, Wrench, ShieldAlert
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'customer', // Default role
    specialty: '' // For gardeners
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Frontend validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setErrorMessage('Please complete all required fields (Name, Email, Password).');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    // Explicit security check: protect administrator role
    if (formData.role === 'admin') {
      setErrorMessage('Administrator accounts cannot be self-registered publicly.');
      return;
    }

    const res = await register({
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      role: formData.role,
      specialty: formData.role === 'gardener' ? formData.specialty.trim() : undefined
    });

    if (res.success && res.user) {
      // Direct user to their permitted dashboard
      if (res.user.role === 'gardener') {
        navigate('/gardener', { replace: true });
      } else {
        navigate('/customer', { replace: true });
      }
    } else {
      setErrorMessage(res.error || 'Registration failed. Please check your information and try again.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full p-6 sm:p-8 space-y-6 border-charcoal-200/80 dark:border-night-600 shadow-botanical-lg bg-white dark:bg-night-800 transition-colors">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-forest dark:bg-forest-700 flex items-center justify-center text-white mx-auto shadow-sm">
            <Sprout className="w-6 h-6 text-sage" />
          </div>
          <h1 className="text-2xl font-bold text-forest-900 dark:text-gray-100">
            Create Florva Account
          </h1>
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
            Join the Florva botanical gardening platform
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-200 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <p className="font-semibold">{errorMessage}</p>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Public Role Selector (Customer vs Gardener) */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-charcoal-300 uppercase tracking-wider">
              Select Account Role *
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'customer' })}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  formData.role === 'customer'
                    ? 'bg-forest text-white border-forest shadow-xs'
                    : 'bg-offwhite dark:bg-night-900 text-charcoal-700 dark:text-gray-300 border-charcoal-200 dark:border-night-700 hover:border-forest-400'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Customer</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'gardener' })}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  formData.role === 'gardener'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-offwhite dark:bg-night-900 text-charcoal-700 dark:text-gray-300 border-charcoal-200 dark:border-night-700 hover:border-amber-400'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>Gardener</span>
              </button>
            </div>
            
            <p className="text-[11px] text-charcoal-500 dark:text-charcoal-400 flex items-center gap-1 mt-1">
              <ShieldAlert className="w-3.5 h-3.5 text-forest dark:text-sage-400" />
              <span>Administrator accounts are provisioned via secure seeding only.</span>
            </p>
          </div>

          <Input
            label="Full Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="E.g. Tanvir Ahmed"
            icon={User}
            autoComplete="name"
          />

          <Input
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@example.com"
            icon={Mail}
            autoComplete="email"
          />

          <Input
            label="Password (min 6 characters)"
            type="password"
            required
            minLength={6}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Choose a secure password"
            icon={Lock}
            autoComplete="new-password"
          />

          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+880 1700-000000"
            icon={Phone}
            autoComplete="tel"
          />

          {formData.role === 'gardener' ? (
            <Input
              label="Horticulture Specialty"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              placeholder="E.g. Urban Balcony Gardening & Plant Health"
              icon={Wrench}
            />
          ) : (
            <Input
              label="Delivery / Location Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="House, Road, Area, City"
              icon={MapPin}
            />
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-2"
            icon={ArrowRight}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Create {formData.role === 'gardener' ? 'Gardener' : 'Customer'} Account
          </Button>
        </form>

        {/* Footer Link to Login */}
        <div className="text-center pt-2 text-xs text-charcoal-600 dark:text-charcoal-400 border-t border-charcoal-100 dark:border-night-700">
          <span>Already registered? </span>
          <Link to="/login" className="font-bold text-forest dark:text-sage-300 hover:underline">
            Sign In Here
          </Link>
        </div>

      </Card>
    </div>
  );
}
