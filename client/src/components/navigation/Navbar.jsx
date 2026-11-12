import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, ShoppingBag, Menu, X, User, Shield, Wrench, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import Button from '../common/Button';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const location = useLocation();
  const { cartCount, currentUser, switchRole } = useApp();

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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-charcoal-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-forest flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Sprout className="w-5 h-5 text-sage" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-forest-900">FLORVA</span>
              <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-forest-600 block -mt-1 font-semibold">
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
                    ? 'text-forest bg-forest-50 font-semibold'
                    : 'text-charcoal-600 hover:text-forest hover:bg-offwhite'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Shopping Cart Pill */}
            <Link
              to="/cart"
              className="px-3 py-2 text-charcoal-700 hover:text-forest rounded-lg hover:bg-offwhite border border-charcoal-100 flex items-center gap-2 transition-colors relative"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-forest" />
              <span className="text-xs font-semibold">Cart</span>
              <span className="w-5 h-5 bg-forest text-white text-[11px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </Link>

            <div className="h-5 w-px bg-charcoal-200" />

            {/* Role Switcher Dropdown (Essential for Practicum Demonstration) */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="px-3 py-1.5 rounded-lg border border-charcoal-200 bg-offwhite hover:bg-white text-xs font-semibold text-charcoal-800 flex items-center gap-1.5 transition-colors"
                title="Switch Demonstration Role"
              >
                {currentUser.role === 'admin' ? (
                  <Shield className="w-3.5 h-3.5 text-rose-600" />
                ) : currentUser.role === 'gardener' ? (
                  <Wrench className="w-3.5 h-3.5 text-amber-600" />
                ) : (
                  <User className="w-3.5 h-3.5 text-forest" />
                )}
                <span className="capitalize">{currentUser.role}</span>
                <ChevronDown className="w-3 h-3 text-charcoal-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-charcoal-200 py-1.5 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 border-b border-charcoal-100 text-[11px] text-charcoal-400 uppercase tracking-wider font-semibold">
                    Demonstration View
                  </div>
                  <button
                    onClick={() => { switchRole('customer'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-offwhite ${
                      currentUser.role === 'customer' ? 'text-forest font-bold bg-forest-50' : 'text-charcoal-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-forest" /> Customer View
                    </span>
                    {currentUser.role === 'customer' && <span className="text-[10px] text-forest">Active</span>}
                  </button>
                  <button
                    onClick={() => { switchRole('gardener'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-offwhite ${
                      currentUser.role === 'gardener' ? 'text-amber-800 font-bold bg-amber-50' : 'text-charcoal-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5 text-amber-600" /> Gardener Portal
                    </span>
                    {currentUser.role === 'gardener' && <span className="text-[10px] text-amber-700">Active</span>}
                  </button>
                  <button
                    onClick={() => { switchRole('admin'); setRoleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-offwhite ${
                      currentUser.role === 'admin' ? 'text-rose-800 font-bold bg-rose-50' : 'text-charcoal-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-rose-600" /> Admin Dashboard
                    </span>
                    {currentUser.role === 'admin' && <span className="text-[10px] text-rose-700">Active</span>}
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

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/cart"
              className="p-2 text-charcoal-600 hover:text-forest relative"
            >
              <ShoppingBag className="w-5 h-5 text-forest" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-forest text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal-600 hover:text-forest hover:bg-offwhite"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-charcoal-100 bg-white px-4 pt-2 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={clsx(
                'block px-3 py-2 rounded-lg text-base font-medium',
                isActive(link.path)
                  ? 'text-forest bg-forest-50 font-semibold'
                  : 'text-charcoal-700 hover:bg-offwhite'
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Role Switcher */}
          <div className="pt-3 border-t border-charcoal-100 space-y-2">
            <span className="text-[11px] text-charcoal-400 font-semibold uppercase tracking-wider block px-3">
              Switch Role View
            </span>
            <div className="grid grid-cols-3 gap-1.5 px-3">
              <button
                onClick={() => { switchRole('customer'); setMobileMenuOpen(false); }}
                className={`py-1.5 px-2 text-xs rounded-lg border font-medium ${
                  currentUser.role === 'customer' ? 'bg-forest text-white border-forest' : 'bg-offwhite text-charcoal-700 border-charcoal-200'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => { switchRole('gardener'); setMobileMenuOpen(false); }}
                className={`py-1.5 px-2 text-xs rounded-lg border font-medium ${
                  currentUser.role === 'gardener' ? 'bg-amber-600 text-white border-amber-600' : 'bg-offwhite text-charcoal-700 border-charcoal-200'
                }`}
              >
                Gardener
              </button>
              <button
                onClick={() => { switchRole('admin'); setMobileMenuOpen(false); }}
                className={`py-1.5 px-2 text-xs rounded-lg border font-medium ${
                  currentUser.role === 'admin' ? 'bg-rose-700 text-white border-rose-700' : 'bg-offwhite text-charcoal-700 border-charcoal-200'
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
