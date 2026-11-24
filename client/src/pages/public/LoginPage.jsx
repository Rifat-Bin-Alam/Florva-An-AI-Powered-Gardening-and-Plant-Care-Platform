import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, Mail, Lock, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { useApp } from '../../context/AppContext';

/**
 * LoginPage — Account Access & Demonstration Role Quick-Fill
 * Authenticates against MongoDB Atlas via /api/auth/login,
 * with graceful fallback to demo mode for university defense.
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const { login, switchRole, authLoading } = useApp();
  const [email, setEmail] = useState('customer@florva.com');
  const [password, setPassword] = useState('Password123!');
  const [errorMessage, setErrorMessage] = useState('');

  const navigateByRole = (role) => {
    if (role === 'gardener') navigate('/gardener');
    else if (role === 'admin') navigate('/admin');
    else navigate('/my-plants');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const res = await login(email, password);
    if (res.success) {
      navigateByRole(res.user.role);
    } else {
      setErrorMessage(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleQuickLogin = async (role) => {
    setErrorMessage('');
    const demoAccounts = {
      customer: { email: 'customer@florva.com', password: 'Password123!' },
      gardener: { email: 'gardener@florva.com', password: 'Password123!' },
      admin: { email: 'admin@florva.com', password: 'Password123!' }
    };

    const target = demoAccounts[role];
    if (target) {
      setEmail(target.email);
      setPassword(target.password);

      // Attempt live database login first
      const res = await login(target.email, target.password);
      if (res.success) {
        navigateByRole(res.user.role);
        return;
      }
    }

    // Graceful fallback for defense presentation if database is not active
    switchRole(role);
    navigateByRole(role);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full p-6 sm:p-8 space-y-6 border-charcoal-200/80 dark:border-night-600 shadow-botanical-lg bg-white dark:bg-night-800 transition-colors">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-forest dark:bg-forest-700 flex items-center justify-center text-white mx-auto shadow-sm">
            <Sprout className="w-6 h-6 text-sage" />
          </div>
          <h1 className="text-2xl font-bold text-forest-900 dark:text-gray-100">Sign in to Florva</h1>
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Access your digital garden, orders, and consultations</p>
        </div>

        {/* Quick Demo Login Triggers for Defense */}
        <div className="bg-offwhite dark:bg-night-900 rounded-xl p-3 border border-charcoal-200/80 dark:border-night-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider block">
              Practicum 1-Click Quick Login
            </span>
            <span className="text-[10px] text-forest dark:text-sage-400 font-medium">MongoDB + Demo</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              disabled={authLoading}
              onClick={() => handleQuickLogin('customer')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-night-800 hover:bg-forest dark:hover:bg-forest-600 hover:text-white dark:hover:text-white border border-charcoal-200 dark:border-night-600 text-xs font-semibold text-forest dark:text-sage-300 transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
            >
              Customer
            </button>
            <button
              type="button"
              disabled={authLoading}
              onClick={() => handleQuickLogin('gardener')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-night-800 hover:bg-amber-600 dark:hover:bg-amber-600 hover:text-white dark:hover:text-white border border-charcoal-200 dark:border-night-600 text-xs font-semibold text-amber-800 dark:text-amber-300 transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
            >
              Gardener
            </button>
            <button
              type="button"
              disabled={authLoading}
              onClick={() => handleQuickLogin('admin')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-night-800 hover:bg-rose-700 dark:hover:bg-rose-600 hover:text-white dark:hover:text-white border border-charcoal-200 dark:border-night-600 text-xs font-semibold text-rose-800 dark:text-rose-300 transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Error Notification Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-200">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">{errorMessage}</p>
              <button
                type="button"
                onClick={() => {
                  switchRole('customer');
                  navigate('/my-plants');
                }}
                className="text-[11px] text-forest dark:text-sage-400 font-bold underline hover:text-forest-800 cursor-pointer"
              >
                Or continue with Offline Demo Mode &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Standard Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={Mail}
            placeholder="e.g. customer@florva.com"
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={Lock}
            placeholder="••••••••"
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
            Sign In to Account
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center pt-2 text-xs text-charcoal-600 dark:text-charcoal-400 border-t border-charcoal-100 dark:border-night-700">
          <span>Don't have a Florva account? </span>
          <Link to="/register" className="font-bold text-forest dark:text-sage-300 hover:underline">
            Create an Account
          </Link>
        </div>
      </Card>
    </div>
  );
}
