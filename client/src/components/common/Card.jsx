import React from 'react';
import clsx from 'clsx';

/**
 * Reusable Florva Botanical Card Surface
 * Pure white background, subtle border, and soft organic elevation.
 */
export default function Card({
  children,
  className = '',
  hoverable = false,
  padding = 'p-6',
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white dark:bg-night-800 rounded-xl border border-charcoal-100/90 dark:border-night-600 shadow-botanical dark:shadow-botanical-dark transition-all duration-200',
        padding,
        hoverable && 'hover:shadow-botanical-lg dark:hover:shadow-none hover:border-sage-300 dark:hover:border-sage-500/50 hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
