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
    default: 'bg-sage-100 dark:bg-night-700 text-forest-800 dark:text-sage-200 border-sage-200 dark:border-night-600',
    forest: 'bg-forest-50 dark:bg-forest-950/70 text-forest-700 dark:text-sage-300 border-forest-200 dark:border-forest-800',
    success: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    warning: 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    danger: 'bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
    info: 'bg-sky-50 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800/60',
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
