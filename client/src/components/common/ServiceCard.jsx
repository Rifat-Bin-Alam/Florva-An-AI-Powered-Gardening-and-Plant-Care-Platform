import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, ArrowRight } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';

/**
 * Service Card for displaying gardening services.
 * Shows service image, pricing, duration, and included items.
 */
export default function ServiceCard({ service, compact = false }) {
  const { _id, name, slug, category, price, duration, description, includes = [], image, rating, reviewCount } = service;

  return (
    <Card hoverable padding="p-0" className="group overflow-hidden flex flex-col">
      {/* Service Image */}
      <Link to={`/services/${slug}`} className="block relative overflow-hidden">
        <div className={compact ? 'h-36' : 'h-44 sm:h-48'}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />

          {/* Category Badge */}
          <div className="absolute bottom-2.5 left-2.5">
            <Badge variant="forest" size="sm">{category}</Badge>
          </div>

          {/* Duration Badge */}
          <div className="absolute top-2.5 right-2.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/90 backdrop-blur-sm text-charcoal-700 shadow-sm">
              <Clock className="w-3 h-3" />
              {duration}
            </span>
          </div>
        </div>
      </Link>

      {/* Service Info */}
      <div className="flex flex-col flex-grow p-4">
        {/* Title and Rating */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <Link to={`/services/${slug}`} className="hover:text-forest transition-colors">
            <h3 className="text-base font-bold text-forest-900 leading-snug">{name}</h3>
          </Link>
          {rating && (
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-charcoal-700">{rating}</span>
            </div>
          )}
        </div>

        {/* Description — truncated in compact mode */}
        <p className={`text-xs text-charcoal-600 leading-relaxed mb-3 ${compact ? 'line-clamp-2' : 'line-clamp-3'}`}>
          {description}
        </p>

        {/* Included Items Preview — hidden in compact */}
        {!compact && includes.length > 0 && (
          <ul className="space-y-1 mb-3">
            {includes.slice(0, 3).map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-[11px] text-charcoal-500">
                <span className="w-1 h-1 rounded-full bg-sage-400 flex-shrink-0" />
                {item}
              </li>
            ))}
            {includes.length > 3 && (
              <li className="text-[11px] text-forest-600 font-medium pl-2.5">
                +{includes.length - 3} more included
              </li>
            )}
          </ul>
        )}

        {/* Price and Action */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-2 border-t border-charcoal-50">
          <div className="pt-2">
            <span className="text-xs text-charcoal-400">Starting from</span>
            <p className="text-lg font-bold text-forest-800">৳{price.toLocaleString()}</p>
          </div>
          <Link to={`/services/${slug}`}>
            <Button variant="outline" size="sm" icon={ArrowRight} className="text-[11px] mt-2">
              {compact ? 'View' : 'View Details'}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
