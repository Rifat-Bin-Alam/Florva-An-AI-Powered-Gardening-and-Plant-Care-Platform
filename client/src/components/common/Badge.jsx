import React from 'react';
import clsx from 'clsx';

/**
 * Reusable Florva Botanical Status Badge
 */
export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon: Icon,
  className = '',
}) {
  const variants = {
    default: 'bg-sage-100 text-forest-800 border-sage-200',
    forest: 'bg-forest-50 text-forest-700 border-forest-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border-rose-200',
    info: 'bg-sky-50 text-sky-800 border-sky-200',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
      {children}
    </span>
  );
}
