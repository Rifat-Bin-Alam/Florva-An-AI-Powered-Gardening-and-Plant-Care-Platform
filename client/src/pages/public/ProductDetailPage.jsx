import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Sun, Droplets, ShieldCheck, ShoppingBag, ArrowLeft,
  CheckCircle2, Star, Truck, Heart, Sprout, Plus, Minus
} from 'lucide-react';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Card from '../../components/common/Card';
import ProductCard from '../../components/common/ProductCard';
import { useApp } from '../../context/AppContext';

/**
 * ProductDetailPage — Detailed botanical specimen view
 * Displays comprehensive care specifications, image showcase,
 * stock status, and add-to-cart controls.
 */
export default function ProductDetailPage() {
  const { slug } = useParams();
  const { products, addToCart, addPersonalPlant } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('care'); // 'care' | 'overview' | 'delivery'

  // Look up product by slug
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-forest-900">Specimen Not Found</h2>
        <p className="text-sm text-charcoal-600">The plant you are looking for is currently unavailable in our catalog.</p>
        <Link to="/shop">
          <Button variant="primary" size="md" icon={ArrowLeft}>
            Back to Plant Shop
          </Button>
        </Link>
      </div>
    );
  }

  // Related products in same category
  const relatedProducts = products
    .filter(p => p.category === product.category && p._id !== product._id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* ─── Breadcrumbs ─── */}
      <nav className="flex items-center gap-2 text-xs text-charcoal-500 dark:text-charcoal-400">
        <Link to="/" className="hover:text-forest dark:hover:text-sage-300">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-forest dark:hover:text-sage-300">Shop Plants</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-forest dark:hover:text-sage-300">{product.category}</Link>
        <span>/</span>
        <span className="text-forest-900 dark:text-sage-300 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* ─── Main Product Showcase Grid ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Product Image */}
        <div className="lg:col-span-6">
          <div className="bg-white dark:bg-night-800 rounded-2xl border border-charcoal-200/80 dark:border-night-600 overflow-hidden shadow-sm relative transition-colors">
            <div className="h-80 sm:h-96 md:h-[420px] w-full bg-offwhite dark:bg-night-900">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* In-Stock Badge */}
            <div className="absolute top-4 left-4">
              <Badge variant={product.inStock ? 'success' : 'danger'} size="md">
                {product.inStock ? `In Stock (${product.stockCount} units)` : 'Out of Stock'}
              </Badge>
            </div>

            {/* Category Tag */}
            <div className="absolute bottom-4 left-4">
              <Badge variant="forest" size="md">{product.category}</Badge>
            </div>
          </div>
        </div>

        {/* Right Column: Specimen Details & Purchase Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="default" size="sm">{product.careLevel} Care</Badge>
              {product.rating && (
                <div className="flex items-center gap-1 text-xs text-charcoal-700 dark:text-charcoal-300 font-medium">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-charcoal-400 dark:text-charcoal-500">({product.reviewCount || 12} reviews)</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-900 dark:text-gray-100 tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl font-extrabold text-forest-800 dark:text-sage-300">
                ৳{product.price.toLocaleString()} BDT
              </span>
              {product.originalPrice && (
                <span className="text-sm text-charcoal-400 dark:text-charcoal-500 line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
            {product.description}
          </p>

          {/* Quick Care Attributes Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-white dark:bg-night-800 rounded-xl border border-charcoal-200/80 dark:border-night-600 shadow-sm text-center">
            <div className="p-2 rounded-lg bg-offwhite dark:bg-night-900">
              <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400 mx-auto mb-1" />
              <span className="text-[10px] text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider block">Sunlight</span>
              <span className="text-xs font-bold text-forest-900 dark:text-gray-200">{product.sunlight}</span>
            </div>

            <div className="p-2 rounded-lg bg-offwhite dark:bg-night-900">
              <Droplets className="w-4 h-4 text-sky-600 dark:text-sky-400 mx-auto mb-1" />
              <span className="text-[10px] text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider block">Watering</span>
              <span className="text-xs font-bold text-forest-900 dark:text-gray-200">{product.waterFrequency}</span>
            </div>

            <div className="p-2 rounded-lg bg-offwhite dark:bg-night-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
              <span className="text-[10px] text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider block">Difficulty</span>
              <span className="text-xs font-bold text-forest-900 dark:text-gray-200">{product.careLevel}</span>
            </div>

            <div className="p-2 rounded-lg bg-offwhite dark:bg-night-900">
              <Sprout className="w-4 h-4 text-forest dark:text-sage-400 mx-auto mb-1" />
              <span className="text-[10px] text-charcoal-400 dark:text-charcoal-500 uppercase tracking-wider block">Size</span>
              <span className="text-xs font-bold text-forest-900 dark:text-gray-200">{product.size || 'Medium'}</span>
            </div>
          </div>

          {/* Quantity Selector & Add to Cart Action */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Quantity Counter */}
              <div className="flex items-center border border-charcoal-200 dark:border-night-600 rounded-xl bg-white dark:bg-night-800 shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="p-2.5 text-charcoal-600 dark:text-charcoal-300 hover:text-forest dark:hover:text-sage-300 disabled:opacity-40 cursor-pointer"
                  title="Decrease Quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-forest-900 dark:text-gray-100 min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 text-charcoal-600 dark:text-charcoal-300 hover:text-forest dark:hover:text-sage-300 cursor-pointer"
                  title="Increase Quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="primary"
                size="lg"
                icon={ShoppingBag}
                disabled={!product.inStock}
                onClick={() => addToCart(product, quantity)}
                className="flex-1"
              >
                {product.inStock ? `Add to Cart • ৳${(product.price * quantity).toLocaleString()}` : 'Out of Stock'}
              </Button>
            </div>

            {/* Quick Adopt to My Plants Journal Button */}
            <button
              onClick={() => {
                addPersonalPlant({
                  nickname: product.name,
                  species: product.name,
                  location: 'Living Room',
                  wateringIntervalDays: product.waterFrequency.includes('14') ? 14 : 7,
                  image: product.image
                });
              }}
              className="w-full py-2 px-3 rounded-xl border border-forest-200 dark:border-night-600 bg-forest-50 dark:bg-night-700 hover:bg-forest-100 dark:hover:bg-night-600 text-forest-800 dark:text-sage-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sprout className="w-4 h-4 text-forest dark:text-sage-400" />
              <span>Adopt to "My Plants" Care Journal</span>
            </button>
          </div>

          {/* Guarantee Highlights */}
          <div className="pt-4 border-t border-charcoal-200/80 dark:border-night-700 space-y-2 text-xs text-charcoal-600 dark:text-charcoal-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-600 dark:text-sage-400" />
              <span>Inspected and hydrated prior to dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-forest-600 dark:text-sage-400" />
              <span>Next-day careful delivery across Dhaka metropolitan area</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Detailed Care Guide Section ─── */}
      <div className="bg-white dark:bg-night-800 rounded-2xl border border-charcoal-200/80 dark:border-night-600 p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
        <div className="flex items-center gap-3 border-b border-charcoal-100 dark:border-night-700 pb-3">
          <button
            onClick={() => setActiveTab('care')}
            className={`pb-2 text-sm font-bold transition-colors relative cursor-pointer ${
              activeTab === 'care' ? 'text-forest dark:text-sage-300' : 'text-charcoal-400 dark:text-charcoal-500 hover:text-charcoal-700 dark:hover:text-gray-300'
            }`}
          >
            Botanical Care Instructions
            {activeTab === 'care' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest dark:bg-sage-400" />}
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`pb-2 text-sm font-bold transition-colors relative cursor-pointer ${
              activeTab === 'delivery' ? 'text-forest dark:text-sage-300' : 'text-charcoal-400 dark:text-charcoal-500 hover:text-charcoal-700 dark:hover:text-gray-300'
            }`}
          >
            Delivery & Guarantee
            {activeTab === 'delivery' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest dark:bg-sage-400" />}
          </button>
        </div>

        {activeTab === 'care' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed">
            <div className="space-y-2 p-4 bg-offwhite dark:bg-night-900 rounded-xl border border-charcoal-100 dark:border-night-700">
              <div className="flex items-center gap-2 text-forest-900 dark:text-gray-100 font-bold">
                <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Light & Placement</span>
              </div>
              <p>
                Prefers {product.sunlight.toLowerCase()} sunlight. Place near east or north-facing windows.
                Avoid harsh afternoon direct sun which can scorch tender foliage.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-offwhite dark:bg-night-900 rounded-xl border border-charcoal-100 dark:border-night-700">
              <div className="flex items-center gap-2 text-forest-900 dark:text-gray-100 font-bold">
                <Droplets className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Watering Routine</span>
              </div>
              <p>
                Water roughly {product.waterFrequency.toLowerCase()}. Always check soil dryness with your index finger.
                Allow excess water to fully drain through the drainage hole.
              </p>
            </div>

            <div className="space-y-2 p-4 bg-offwhite dark:bg-night-900 rounded-xl border border-charcoal-100 dark:border-night-700">
              <div className="flex items-center gap-2 text-forest-900 dark:text-gray-100 font-bold">
                <Sprout className="w-4 h-4 text-forest dark:text-sage-400" />
                <span>Soil & Nutrients</span>
              </div>
              <p>
                Thrives in a well-aerated potting mix containing coco peat, perlite, and vermicompost.
                Feed with mild organic fertilizer once monthly during spring and monsoon.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs text-charcoal-600 dark:text-charcoal-300 leading-relaxed max-w-2xl">
            <p>
              Each plant is carefully packed with a protective root wrap and organic moisture lock.
              Our horticulturists hand-check leaves, stem firmness, and root vitality before packing.
            </p>
            <p>
              <strong>7-Day Health Guarantee:</strong> If your plant arrives damaged or shows signs of root stress,
              contact our support team or consult our AI plant doctor for immediate replacement or care guidance.
            </p>
          </div>
        )}
      </div>

      {/* ─── Related Specimens Section ─── */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-forest-900 dark:text-gray-100">More {product.category} Specimens</h2>
            <Link to={`/shop?category=${product.category}`} className="text-xs font-semibold text-forest dark:text-sage-300 hover:underline flex items-center gap-1">
              <span>View All {product.category}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
