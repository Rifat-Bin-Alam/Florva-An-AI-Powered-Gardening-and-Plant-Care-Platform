import React from 'react';
import clsx from 'clsx';
import { Sprout } from 'lucide-react';

/**
 * Botanical Loading Indicator
 */
export default function Loader({
  size = 'md',
  message = 'Loading botanical data...',
  className = '',
  inline = false
}) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const content = (
    <div className={clsx('flex flex-col items-center justify-center text-center gap-3', className)}>
      <div className="relative">
        <div className={clsx('animate-spin rounded-full border-2 border-sage-200 border-t-forest-700', sizes[size])} />
        <Sprout className="w-3.5 h-3.5 text-forest-700 absolute inset-0 m-auto animate-pulse" />
      </div>
      {message && <p className="text-xs font-medium text-charcoal-500 animate-pulse">{message}</p>}
    </div>
  );

  if (inline) {
    return content;
  }

  return (
    <div className="min-h-[200px] flex items-center justify-center p-6">
      {content}
    </div>
  );
}
