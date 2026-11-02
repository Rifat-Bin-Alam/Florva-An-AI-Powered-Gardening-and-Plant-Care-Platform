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
        'bg-white rounded-xl border border-charcoal-100/80 shadow-botanical transition-all duration-200',
        padding,
        hoverable && 'hover:shadow-botanical-lg hover:border-sage-300 hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
