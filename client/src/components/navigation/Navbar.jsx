import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, ShoppingBag, Menu, X, User } from 'lucide-react';
import clsx from 'clsx';
import Button from '../common/Button';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Plants', path: '/shop' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-charcoal-100 shadow-sm">
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
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'px-3.5 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive(link.path)
                    ? 'text-forest bg-forest-50 font-semibold'
                    : 'text-charcoal-600 hover:text-forest hover:bg-offwhite-100'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Header Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/cart"
              className="p-2 text-charcoal-600 hover:text-forest rounded-lg hover:bg-offwhite-100 relative transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-forest text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            <div className="h-5 w-px bg-charcoal-200" />

            <Link to="/login">
              <Button variant="ghost" size="sm" icon={User}>
                Sign In
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 sm:hidden">
            <Link
              to="/cart"
              className="p-2 text-charcoal-600 hover:text-forest relative"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-forest text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal-600 hover:text-forest hover:bg-offwhite-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-charcoal-100 bg-white px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={clsx(
                'block px-3 py-2 rounded-lg text-base font-medium',
                isActive(link.path)
                  ? 'text-forest bg-forest-50 font-semibold'
                  : 'text-charcoal-700 hover:bg-offwhite-100'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-charcoal-100 flex flex-col gap-2">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="md" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full">
                Create Free Account
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
