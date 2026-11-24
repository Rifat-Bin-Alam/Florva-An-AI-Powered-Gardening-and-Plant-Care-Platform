import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sprout, Menu, X, User, Shield, Wrench, Sun, Moon,
  LogOut, LayoutDashboard, LogIn, UserPlus
} from 'lucide-react';
import clsx from 'clsx';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, theme, toggleTheme } = useAuth();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'gardener') return '/gardener';
    return '/customer';
  };

  const roleBadgeVariants = {
    admin: 'danger',
    gardener: 'warning',
    customer: 'forest'
  };

  const roleIcons = {
    admin: Shield,
    gardener: Wrench,
    customer: User
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-night-900/95 backdrop-blur-md border-b border-charcoal-100 dark:border-night-600 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-forest flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Sprout className="w-5 h-5 text-sage" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-forest-900 dark:text-gray-100">FLORVA</span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-forest-600 dark:text-sage-400 block -mt-1 font-semibold">
                Botanical Living
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={clsx(
                'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                location.pathname === '/'
                  ? 'text-forest dark:text-sage-300 bg-forest-50 dark:bg-night-800 font-semibold'
                  : 'text-charcoal-600 dark:text-charcoal-300 hover:text-forest dark:hover:text-sage-300 hover:bg-offwhite dark:hover:bg-night-800'
              )}
            >
              Home
            </Link>

            {isAuthenticated && (
              <Link
                to={getDashboardPath()}
                className={clsx(
                  'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5',
                  location.pathname.startsWith('/customer') || location.pathname.startsWith('/gardener') || location.pathname.startsWith('/admin')
                    ? 'text-forest dark:text-sage-300 bg-forest-50 dark:bg-night-800 font-semibold'
                    : 'text-charcoal-600 dark:text-charcoal-300 hover:text-forest dark:hover:text-sage-300 hover:bg-offwhite dark:hover:bg-night-800'
                )}
              >
                <LayoutDashboard className="w-4 h-4 text-forest dark:text-sage-400" />
                <span>Dashboard</span>
              </Link>
            )}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-lg text-charcoal-600 dark:text-charcoal-300 hover:text-forest dark:hover:text-sage-300 hover:bg-offwhite dark:hover:bg-night-800 border border-charcoal-200 dark:border-night-600 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-forest-700 transition-transform hover:-rotate-12" />
              )}
            </button>

            <div className="h-5 w-px bg-charcoal-200 dark:bg-night-600" />

            {/* Authenticated User Status or Guest Links */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-xs font-bold text-charcoal-900 dark:text-gray-100 block leading-tight">
                      {user.name}
                    </span>
                    <Badge
                      variant={roleBadgeVariants[user.role] || 'forest'}
                      size="sm"
                      icon={roleIcons[user.role]}
                      className="capitalize"
                    >
                      {user.role}
                    </Badge>
                  </div>
                </div>

                <Link to={getDashboardPath()}>
                  <Button variant="primary" size="sm" icon={LayoutDashboard}>
                    Dashboard
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  icon={LogOut}
                  onClick={handleLogout}
                  title="Sign Out"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" icon={LogIn}>
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" icon={UserPlus}>
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions Toggle */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-lg text-charcoal-600 dark:text-charcoal-300 hover:text-forest dark:hover:text-sage-300"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-forest" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal-600 dark:text-charcoal-300 hover:text-forest dark:hover:text-sage-300 hover:bg-offwhite dark:hover:bg-night-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-charcoal-100 dark:border-night-700 bg-white dark:bg-night-900 px-4 pt-2 pb-5 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={clsx(
              'block px-3 py-2 rounded-lg text-base font-medium transition-colors',
              location.pathname === '/'
                ? 'text-forest dark:text-sage-300 bg-forest-50 dark:bg-night-800 font-semibold'
                : 'text-charcoal-700 dark:text-gray-200 hover:bg-offwhite dark:hover:bg-night-800'
            )}
          >
            Home
          </Link>

          {isAuthenticated && user ? (
            <div className="pt-2 border-t border-charcoal-100 dark:border-night-700 space-y-2">
              <div className="px-3 py-2 bg-offwhite dark:bg-night-800 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-charcoal-900 dark:text-gray-100 block">{user.name}</span>
                  <span className="text-[11px] text-charcoal-500 dark:text-charcoal-400">{user.email}</span>
                </div>
                <Badge variant={roleBadgeVariants[user.role] || 'forest'} size="sm">
                  {user.role}
                </Badge>
              </div>

              <Link
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="block"
              >
                <Button variant="primary" size="sm" className="w-full" icon={LayoutDashboard}>
                  Go to {user.role.toUpperCase()} Dashboard
                </Button>
              </Link>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-rose-600 border-rose-300 hover:bg-rose-50"
                icon={LogOut}
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="pt-2 border-t border-charcoal-100 dark:border-night-700 flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full" icon={LogIn}>
                  Sign In
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="sm" className="w-full" icon={UserPlus}>
                  Create Account
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
