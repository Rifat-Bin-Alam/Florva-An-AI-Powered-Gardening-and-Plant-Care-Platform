import React from 'react';
import { Star, Quote, Sprout } from 'lucide-react';
import Card from './Card';

/**
 * Testimonial Card for social proof sections.
 * Renders customer review with star rating, quote, and avatar initials.
 */
export default function TestimonialCard({ testimonial }) {
  const { name, role, rating, text, plantCount } = testimonial;

  // Generate initials from customer name for avatar fallback
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="flex flex-col justify-between h-full relative">
      {/* Decorative Quote Icon */}
      <Quote className="absolute top-4 right-4 w-8 h-8 text-sage-200 opacity-60" />

      <div className="space-y-4">
        {/* Star Rating */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating
                  ? 'text-amber-400 fill-amber-400'
                  : 'text-charcoal-200'
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-sm text-charcoal-700 leading-relaxed italic">
          "{text}"
        </p>
      </div>

      {/* Reviewer Identity */}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-charcoal-100">
        {/* Initials Avatar */}
        <div className="w-10 h-10 rounded-full bg-forest-50 border border-forest-200 flex items-center justify-center text-forest-700 font-bold text-sm flex-shrink-0">
          {initials}
        </div>
        <div className="flex-grow min-w-0">
          <p className="text-sm font-semibold text-forest-900 truncate">{name}</p>
          <p className="text-xs text-charcoal-500">{role}</p>
        </div>
        {/* Plant Count Badge */}
        {plantCount && (
          <div className="flex items-center gap-1 text-xs text-sage-600 bg-sage-50 px-2 py-1 rounded-full border border-sage-200 flex-shrink-0">
            <Sprout className="w-3 h-3" />
            <span className="font-medium">{plantCount}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
