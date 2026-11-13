import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, User, Mail, Lock, Phone, MapPin, AlertCircle, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { useApp } from '../../context/AppContext';

/**
 * RegisterPage — Customer Registration Form
 * Creates a real customer profile in MongoDB Atlas via /api/auth/register.
 */
export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, authLoading } = useApp();
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      address: { street: formData.address, country: 'Bangladesh' },
      role: 'customer'
    });

    if (res.success) {
      navigate('/my-plants');
    } else {
      setErrorMessage(res.error || 'Registration failed. Please check inputs.');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full p-6 sm:p-8 space-y-6 border-charcoal-200/80 shadow-botanical-lg">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-forest flex items-center justify-center text-white mx-auto shadow-sm">
            <Sprout className="w-6 h-6 text-sage" />
          </div>
          <h1 className="text-2xl font-bold text-forest-900">Create Florva Account</h1>
          <p className="text-xs text-charcoal-500">Join our urban botanical gardening community</p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p className="font-semibold">{errorMessage}</p>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name *"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="E.g. Rifat Bin Alam"
            icon={User}
          />

          <Input
            label="Email Address *"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="you@example.com"
            icon={Mail}
          />

          <Input
            label="Password *"
            type="password"
            required
            minLength={6}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Minimum 6 characters"
            icon={Lock}
          />

          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+880 1700-000000"
            icon={Phone}
          />

          <Input
            label="Delivery Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="House, Road, Area, City"
            icon={MapPin}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            icon={ArrowRight}
            isLoading={authLoading}
            disabled={authLoading}
          >
            Create Customer Account
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 text-xs text-charcoal-600 border-t border-charcoal-100">
          <span>Already have an account? </span>
          <Link to="/login" className="font-bold text-forest hover:underline">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  );
}
