import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Sun, Droplets } from 'lucide-react';
import clsx from 'clsx';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';
import { useApp } from '../../context/AppContext';

/**
 * Reusable Product Card for Shop Grids and Homepage Features
 * Displays plant image, pricing in BDT, care quick-stats, and action buttons.
 * Uses clean botanical styling with natural green accents.
 */
export default function ProductCard({ product, compact = false, className = '' }) {
  const { addToCart } = useApp();

  const {
    _id, name, slug, category, price, originalPrice,
    image, careLevel, sunlight, waterFrequency,
    inStock, rating, tags = [],
  } = product;

  // Calculate discount percentage if original price exists
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <Card hoverable padding="p-0" className={clsx('overflow-hidden flex flex-col h-full bg-white border border-charcoal-100 rounded-xl', className)}>
      {/* Product Image Container */}
      <Link to={`/shop/${slug}`} className="block relative overflow-hidden bg-offwhite">
        <div className={clsx('w-full overflow-hidden', compact ? 'h-40' : 'h-52 sm:h-56')}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Overlay Badges — discount tag and stock status */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {discountPercent && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-600 text-white shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
          {!inStock && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-charcoal-700 text-white shadow-sm">
              Out of Stock
            </span>
          )}
        </div>

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

        {/* Quick Care Stats */}
        {!compact && (
          <div className="flex items-center gap-3 text-[11px] text-charcoal-500 mb-3">
            <span className="flex items-center gap-1">
              <Sun className="w-3 h-3 text-amber-600" />
              {sunlight}
            </span>
            <span className="flex items-center gap-1">
              <Droplets className="w-3 h-3 text-sky-600" />
              {waterFrequency}
            </span>
          </div>
        )}

        {/* Care Level Tag and Add to Cart Action */}
        <div className="mt-auto pt-2 border-t border-charcoal-50">
          <div className="flex items-center justify-between gap-2 pt-2">
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
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1);
              }}
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
