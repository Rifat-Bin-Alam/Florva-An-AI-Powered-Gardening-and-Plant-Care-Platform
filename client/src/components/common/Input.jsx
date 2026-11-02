import React, { forwardRef } from 'react';
import clsx from 'clsx';

/**
 * Reusable Florva Form Input Field
 * Accessible, styled with botanical focus rings and clear error messaging.
 */
const Input = forwardRef(function Input({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  required = false,
  id,
  ...props
}, ref) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative rounded-lg shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-charcoal-400">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder-charcoal-400 transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-forest-600',
            Icon && 'pl-9',
            error
              ? 'border-red-400 text-red-900 focus:ring-red-500 focus:border-red-500'
              : 'border-charcoal-200 hover:border-charcoal-300',
            className
          )}
          {...props}
        />
      </div>

      {error ? (
        <p className="mt-1 text-xs text-red-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-charcoal-500">{helperText}</p>
      ) : null}
    </div>
  );
});

export default Input;
