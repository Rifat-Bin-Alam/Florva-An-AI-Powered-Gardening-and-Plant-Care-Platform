import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, ArrowRight, Check } from 'lucide-react';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';

/**
 * Service Card for displaying gardening services.
 * Shows service image, pricing in BDT, duration, and inclusions.
 */
export default function ServiceCard({ service, compact = false }) {
  const { _id, name, slug, category, price, duration, description, includes = [], image, rating } = service;

  return (
    <Card hoverable padding="p-0" className="overflow-hidden flex flex-col h-full bg-white border border-charcoal-100 rounded-xl">
      {/* Service Image */}
      <Link to={`/services/${slug}`} className="block relative overflow-hidden bg-offwhite">
        <div className={compact ? 'h-36' : 'h-44 sm:h-48'}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />

          {/* Category Badge */}
          <div className="absolute bottom-2.5 left-2.5">
            <Badge variant="forest" size="sm">{category}</Badge>
          </div>

          {/* Duration Badge */}
          <div className="absolute top-2.5 right-2.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/95 text-charcoal-700 shadow-sm border border-charcoal-100">
              <Clock className="w-3 h-3 text-forest" />
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

        {/* Description */}
        <p className={`text-xs text-charcoal-600 leading-relaxed mb-3 ${compact ? 'line-clamp-2' : 'line-clamp-3'}`}>
          {description}
        </p>

        {/* Included Items Preview */}
        {!compact && includes.length > 0 && (
          <ul className="space-y-1.5 mb-4">
            {includes.slice(0, 3).map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-[11px] text-charcoal-600">
                <Check className="w-3.5 h-3.5 text-forest-600 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
            {includes.length > 3 && (
              <li className="text-[11px] text-forest-600 font-medium pl-5">
                +{includes.length - 3} more included
              </li>
            )}
          </ul>
        )}

        {/* Price and Action */}
        <div className="mt-auto pt-3 flex items-center justify-between gap-2 border-t border-charcoal-100">
          <div>
            <span className="text-[11px] text-charcoal-400 block -mb-0.5">Service fee</span>
            <p className="text-lg font-bold text-forest-800">৳{price.toLocaleString()}</p>
          </div>
          <Link to={`/services/${slug}`}>
            <Button variant="outline" size="sm" icon={ArrowRight} className="text-[11px]">
              {compact ? 'Book' : 'Book Service'}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
