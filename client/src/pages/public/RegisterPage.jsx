import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, User, Mail, Lock, Phone, MapPin, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { useApp } from '../../context/AppContext';

/**
 * RegisterPage — Customer Registration Form
 * Creates a new customer profile and redirects to the "My Plants" dashboard.
 */
export default function RegisterPage() {
  const navigate = useNavigate();
  const { setCurrentUser, showToast } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      _id: `usr_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: 'customer',
      phone: formData.phone,
      address: formData.address
    };

    setCurrentUser(newUser);
    showToast(`Welcome to Florva, ${formData.name}!`, 'success');
    navigate('/my-plants');
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
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
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

          <Button type="submit" variant="primary" size="lg" className="w-full" icon={ArrowRight}>
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
