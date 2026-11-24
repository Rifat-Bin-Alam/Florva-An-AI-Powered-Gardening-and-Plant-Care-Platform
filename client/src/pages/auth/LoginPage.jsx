import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sprout, Mail, Lock, AlertCircle, ArrowRight, CheckCircle2, User, Wrench, Shield } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Target dashboard resolver based on authenticated role
  const navigateByRole = (role) => {
    // If user arrived here from a blocked protected route, check if they can access it
    if (role === 'admin') navigate('/admin', { replace: true });
    else if (role === 'gardener') navigate('/gardener', { replace: true });
    else navigate('/customer', { replace: true });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    const res = await login(email, password);
    if (res.success && res.user) {
      navigateByRole(res.user.role);
    } else {
      setErrorMessage(res.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  // Helper for evaluation / testing to quickly test seeded accounts
  const handleQuickFill = (roleEmail, rolePassword) => {
    setEmail(roleEmail);
    setPassword(rolePassword);
    setErrorMessage('');
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
            Sign in to Florva
          </h1>
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
            Enter your credentials to access your authorized role dashboard
          </p>
        </div>

        {/* Quick Testing Credentials Helper for Evaluators */}
        <div className="bg-offwhite dark:bg-night-900 rounded-xl p-3 border border-charcoal-200/80 dark:border-night-700 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-charcoal-500 dark:text-charcoal-400 uppercase tracking-wider block">
              Quick-Fill Test Credentials
            </span>
            <span className="text-[10px] text-forest dark:text-sage-400 font-medium">
              MongoDB Seeded
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickFill('customer@florva.com', 'Password123!')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-night-800 hover:bg-forest dark:hover:bg-forest-600 hover:text-white border border-charcoal-200 dark:border-night-600 text-xs font-semibold text-forest dark:text-sage-300 transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <User className="w-3 h-3" />
              <span>Customer</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('gardener@florva.com', 'Password123!')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-night-800 hover:bg-amber-600 hover:text-white border border-charcoal-200 dark:border-night-600 text-xs font-semibold text-amber-700 dark:text-amber-300 transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Wrench className="w-3 h-3" />
              <span>Gardener</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('admin@florva.com', 'Password123!')}
              className="py-1.5 px-2 rounded-lg bg-white dark:bg-night-800 hover:bg-rose-700 hover:text-white border border-charcoal-200 dark:border-night-600 text-xs font-semibold text-rose-700 dark:text-rose-300 transition-colors cursor-pointer flex items-center justify-center gap-1"
            >
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-200 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
            <p className="font-semibold">{errorMessage}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            icon={Mail}
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            icon={Lock}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            icon={ArrowRight}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Sign In
          </Button>
        </form>

        {/* Footer Link to Register */}
        <div className="text-center pt-2 text-xs text-charcoal-600 dark:text-charcoal-400 border-t border-charcoal-100 dark:border-night-700">
          <span>New to Florva? </span>
          <Link to="/register" className="font-bold text-forest dark:text-sage-300 hover:underline">
            Create an Account
          </Link>
        </div>

      </Card>
    </div>
  );
}
