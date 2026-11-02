import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Florva Botanical Button Component
 * Supports multiple visual variants, responsive sizes, and interactive loading states.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed btn-press';

  const variants = {
    primary: 'bg-forest text-white hover:bg-forest-800 focus:ring-forest-600 shadow-sm',
    secondary: 'bg-sage text-forest-900 hover:bg-sage-400 focus:ring-sage-500 shadow-sm',
    outline: 'border border-forest text-forest hover:bg-forest-50 focus:ring-forest-600',
    outlineSage: 'border border-sage-400 text-forest-800 hover:bg-sage-50 focus:ring-sage-400',
    ghost: 'text-charcoal-700 hover:bg-offwhite-100 hover:text-forest focus:ring-forest-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-2.5 gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className={clsx(size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4')} />}
          {children}
        </>
      )}
    </button>
  );
}
