import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Mail, Lock, User, Shield, Wrench, ArrowRight } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import { useApp } from '../../context/AppContext';

/**
 * LoginPage — Account Access & Demonstration Role Quick-Fill
 * Provides standard authentication and 1-click test role logins
 * for the university practicum supervisor presentation.
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const { switchRole, setCurrentUser } = useApp();
  const [email, setEmail] = useState('customer@florva.com');
  const [password, setPassword] = useState('Password123!');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.includes('gardener')) {
      switchRole('gardener');
      navigate('/gardener');
    } else if (email.includes('admin')) {
      switchRole('admin');
      navigate('/admin');
    } else {
      switchRole('customer');
      navigate('/my-plants');
    }
  };

  const handleQuickLogin = (role) => {
    switchRole(role);
    if (role === 'gardener') navigate('/gardener');
    else if (role === 'admin') navigate('/admin');
    else navigate('/my-plants');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full p-6 sm:p-8 space-y-6 border-charcoal-200/80 shadow-botanical-lg">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-forest flex items-center justify-center text-white mx-auto shadow-sm">
            <Sprout className="w-6 h-6 text-sage" />
          </div>
          <h1 className="text-2xl font-bold text-forest-900">Sign in to Florva</h1>
          <p className="text-xs text-charcoal-500">Access your digital garden, orders, and consultations</p>
        </div>

        {/* Quick Demo Login Triggers for Defense */}
        <div className="bg-offwhite rounded-xl p-3 border border-charcoal-200/80 space-y-2">
          <span className="text-[10px] font-bold text-charcoal-500 uppercase tracking-wider block text-center">
            Practicum Demonstration Quick-Login
          </span>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="py-1.5 px-2 rounded-lg bg-white hover:bg-forest hover:text-white border border-charcoal-200 text-xs font-semibold text-forest transition-colors shadow-2xs"
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('gardener')}
              className="py-1.5 px-2 rounded-lg bg-white hover:bg-amber-600 hover:text-white border border-charcoal-200 text-xs font-semibold text-amber-800 transition-colors shadow-2xs"
            >
              Gardener
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="py-1.5 px-2 rounded-lg bg-white hover:bg-rose-700 hover:text-white border border-charcoal-200 text-xs font-semibold text-rose-800 transition-colors shadow-2xs"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Standard Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
          />

          <Button type="submit" variant="primary" size="lg" className="w-full" icon={ArrowRight}>
            Sign In to Account
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 text-xs text-charcoal-600 border-t border-charcoal-100">
          <span>Don't have a Florva account? </span>
          <Link to="/register" className="font-bold text-forest hover:underline">
            Create an Account
          </Link>
        </div>
      </Card>
    </div>
  );
}
