import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Sun, Droplets, Heart } from 'lucide-react';
import clsx from 'clsx';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';

/**
 * Reusable Product Card for Shop Grids and Homepage Features
 * Displays plant image, pricing in BDT, care quick-stats, and action buttons.
 * Designed for both grid and carousel layouts with hover micro-interactions.
 */
export default function ProductCard({ product, compact = false, className = '' }) {
  const {
    _id, name, slug, category, price, originalPrice,
    image, careLevel, sunlight, waterFrequency,
    inStock, rating, reviewCount, tags = [],
  } = product;

  // Calculate discount percentage if original price exists
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <Card hoverable padding="p-0" className={clsx('group overflow-hidden flex flex-col', className)}>
      {/* Product Image Container */}
      <Link to={`/shop/${slug}`} className="block relative overflow-hidden">
        <div className={clsx('w-full overflow-hidden bg-sage-50', compact ? 'h-40' : 'h-52 sm:h-56')}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        {/* Overlay Badges — discount tag and stock status */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {discountPercent && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
          {!inStock && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-charcoal-700 text-white shadow-sm">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Heart Button (decorative, no logic yet) */}
        <button
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-charcoal-400 hover:text-rose-500 hover:bg-white transition-all shadow-sm opacity-0 group-hover:opacity-100"
          title="Add to Wishlist"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="w-4 h-4" />
        </button>

        {/* Category Label */}
        <div className="absolute bottom-2.5 left-2.5">
          <Badge variant="forest" size="sm">{category}</Badge>
        </div>
      </Link>

      {/* Product Info */}
      <div className={clsx('flex flex-col flex-grow', compact ? 'p-3' : 'p-4')}>
        {/* Name and Rating Row */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <Link to={`/shop/${slug}`} className="hover:text-forest transition-colors">
            <h3 className={clsx('font-bold text-forest-900 leading-snug', compact ? 'text-sm' : 'text-base')}>
              {name}
            </h3>
          </Link>
          {rating && (
            <div className="flex items-center gap-0.5 flex-shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-charcoal-700">{rating}</span>
            </div>
          )}
        </div>

        {/* Price Line */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className={clsx('font-bold text-forest-800', compact ? 'text-base' : 'text-lg')}>
            ৳{price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-xs text-charcoal-400 line-through">
              ৳{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Quick Care Stats — hidden in compact mode */}
        {!compact && (
          <div className="flex items-center gap-3 text-[11px] text-charcoal-500 mb-3">
            <span className="flex items-center gap-1">
              <Sun className="w-3 h-3 text-amber-500" />
              {sunlight}
            </span>
            <span className="flex items-center gap-1">
              <Droplets className="w-3 h-3 text-sky-500" />
              {waterFrequency}
            </span>
          </div>
        )}

        {/* Care Level Tag */}
        <div className="mt-auto pt-2">
          <div className="flex items-center justify-between gap-2">
            <Badge
              variant={careLevel === 'Beginner' ? 'success' : careLevel === 'Intermediate' ? 'warning' : 'danger'}
              size="sm"
            >
              {careLevel}
            </Badge>
            <Button
              variant="primary"
              size="sm"
              icon={ShoppingBag}
              disabled={!inStock}
              className="text-[11px]"
            >
              {compact ? 'Add' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
