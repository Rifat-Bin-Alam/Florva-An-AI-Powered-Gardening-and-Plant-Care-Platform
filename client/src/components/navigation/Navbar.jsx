import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, ShoppingBag, Menu, X, User, Shield, Wrench, ChevronDown, Sun, Moon } from 'lucide-react';
import clsx from 'clsx';
import Button from '../common/Button';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const location = useLocation();
  const { cartCount, currentUser, switchRole, theme, toggleTheme } = useApp();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Plants', path: '/shop' },
    { name: 'Services', path: '/services' },
    { name: 'My Plants', path: '/my-plants' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
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
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive(link.path)
                    ? 'text-forest dark:text-sage-300 bg-forest-50 dark:bg-night-800 font-semibold'
                    : 'text-charcoal-600 dark:text-charcoal-300 hover:text-forest dark:hover:text-sage-300 hover:bg-offwhite dark:hover:bg-night-800'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
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

            {/* Shopping Cart Pill */}
            <Link
              to="/cart"
              className="px-3 py-2 text-charcoal-700 dark:text-charcoal-200 hover:text-forest dark:hover:text-sage-300 rounded-lg hover:bg-offwhite dark:hover:bg-night-800 border border-charcoal-200 dark:border-night-600 flex items-center gap-2 transition-colors relative"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-forest dark:text-sage-400" />
              <span className="text-xs font-semibold">Cart</span>
              <span className="w-5 h-5 bg-forest dark:bg-forest-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>

            <div className="h-5 w-px bg-charcoal-200 dark:bg-night-600" />

            {/* Role Switcher Dropdown (Essential for Practicum Demonstration) */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="px-3 py-1.5 rounded-lg border border-charcoal-200 dark:border-night-600 bg-offwhite dark:bg-night-800 hover:bg-white dark:hover:bg-night-700 text-xs font-semibold text-charcoal-800 dark:text-gray-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Switch Demonstration Role"
              >
                {currentUser.role === 'admin' ? (
                  <Shield className="w-3.5 h-3.5 text-rose-600" />
                ) : currentUser.role === 'gardener' ? (
                  <Wrench className="w-3.5 h-3.5 text-amber-600" />
                ) : (
                  <User className="w-3.5 h-3.5 text-forest dark:text-sage-400" />
                )}
                <span className="capitalize">{currentUser.role}</span>
                <ChevronDown className="w-3 h-3 text-charcoal-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-night-800 rounded-xl shadow-xl border border-charcoal-200 dark:border-night-600 py-1.5 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 border-b border-charcoal-100 dark:border-night-700 text-[11px] text-charcoal-400 dark:text-charcoal-400 uppercase tracking-wider font-semibold">
                    Demonstration View
                  </div>
                  <button
                    onClick={() => { switchRole('customer'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-offwhite dark:hover:bg-night-700 cursor-pointer ${
                      currentUser.role === 'customer' ? 'text-forest dark:text-sage-300 font-bold bg-forest-50 dark:bg-night-700' : 'text-charcoal-700 dark:text-gray-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-forest dark:text-sage-400" /> Customer View
                    </span>
                    {currentUser.role === 'customer' && <span className="text-[10px] text-forest dark:text-sage-300">Active</span>}
                  </button>
                  <button
                    onClick={() => { switchRole('gardener'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-offwhite dark:hover:bg-night-700 cursor-pointer ${
                      currentUser.role === 'gardener' ? 'text-amber-800 dark:text-amber-300 font-bold bg-amber-50 dark:bg-amber-950/40' : 'text-charcoal-700 dark:text-gray-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5 text-amber-600" /> Gardener Portal
                    </span>
                    {currentUser.role === 'gardener' && <span className="text-[10px] text-amber-700 dark:text-amber-400">Active</span>}
                  </button>
                  <button
                    onClick={() => { switchRole('admin'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-offwhite dark:hover:bg-night-700 cursor-pointer ${
                      currentUser.role === 'admin' ? 'text-rose-800 dark:text-rose-300 font-bold bg-rose-50 dark:bg-rose-950/40' : 'text-charcoal-700 dark:text-gray-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-rose-600" /> Admin Dashboard
                    </span>
                    {currentUser.role === 'admin' && <span className="text-[10px] text-rose-700 dark:text-rose-400">Active</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Quick Link to Current Role Dashboard */}
            {currentUser.role === 'gardener' ? (
              <Link to="/gardener">
                <Button variant="primary" size="sm" icon={Wrench}>
                  Gardener Portal
                </Button>
              </Link>
            ) : currentUser.role === 'admin' ? (
              <Link to="/admin">
                <Button variant="danger" size="sm" icon={Shield}>
                  Admin Panel
                </Button>
              </Link>
            ) : (
              <Link to="/my-plants">
                <Button variant="primary" size="sm" icon={Sprout}>
                  My Plants
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Actions Toggle */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-lg text-charcoal-600 dark:text-charcoal-300 hover:text-forest dark:hover:text-sage-300"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-forest" />}
            </button>

            {/* Mobile Cart */}
            <Link
              to="/cart"
              className="p-2 text-charcoal-600 dark:text-charcoal-300 hover:text-forest dark:hover:text-sage-300 relative"
            >
              <ShoppingBag className="w-5 h-5 text-forest dark:text-sage-400" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-forest dark:bg-forest-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Hamburger */}
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
        <div className="lg:hidden border-b border-charcoal-100 dark:border-night-700 bg-white dark:bg-night-900 px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={clsx(
                'block px-3 py-2 rounded-lg text-base font-medium transition-colors',
                isActive(link.path)
                  ? 'text-forest dark:text-sage-300 bg-forest-50 dark:bg-night-800 font-semibold'
                  : 'text-charcoal-700 dark:text-gray-200 hover:bg-offwhite dark:hover:bg-night-800'
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Role Switcher */}
          <div className="pt-3 border-t border-charcoal-100 dark:border-night-700 space-y-2">
            <span className="text-[11px] text-charcoal-400 uppercase tracking-wider font-semibold block px-3">
              Switch Role View
            </span>
            <div className="grid grid-cols-3 gap-1.5 px-3">
              <button
                onClick={() => { switchRole('customer'); setMobileMenuOpen(false); }}
                className={`py-1.5 px-2 text-xs rounded-lg border font-medium ${
                  currentUser.role === 'customer'
                    ? 'bg-forest text-white border-forest'
                    : 'bg-offwhite dark:bg-night-800 text-charcoal-700 dark:text-gray-300 border-charcoal-200 dark:border-night-600'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => { switchRole('gardener'); setMobileMenuOpen(false); }}
                className={`py-1.5 px-2 text-xs rounded-lg border font-medium ${
                  currentUser.role === 'gardener'
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-offwhite dark:bg-night-800 text-charcoal-700 dark:text-gray-300 border-charcoal-200 dark:border-night-600'
                }`}
              >
                Gardener
              </button>
              <button
                onClick={() => { switchRole('admin'); setMobileMenuOpen(false); }}
                className={`py-1.5 px-2 text-xs rounded-lg border font-medium ${
                  currentUser.role === 'admin'
                    ? 'bg-rose-700 text-white border-rose-700'
                    : 'bg-offwhite dark:bg-night-800 text-charcoal-700 dark:text-gray-300 border-charcoal-200 dark:border-night-600'
                }`}
              >
                Admin
              </button>
            </div>

            <div className="pt-2 px-3 flex flex-col gap-2">
              <Link to="/gardener" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Gardener Portal
                </Button>
              </Link>
              <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Admin Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
