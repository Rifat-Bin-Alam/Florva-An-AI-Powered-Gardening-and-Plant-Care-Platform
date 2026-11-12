import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, RotateCcw, Sprout, ArrowUpDown } from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { useApp } from '../../context/AppContext';

/**
 * ShopPage — Botanical Plant & Product Catalog
 * Supports category filtering, search, care difficulty filter,
 * price sorting, and instant cart addition.
 */
export default function ShopPage() {
  const { products } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedCareLevel, setSelectedCareLevel] = useState('All');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'rating'

  // Extract unique categories and care levels from current products
  const categories = ['All', ...new Set(products.map(p => p.category))];
  const careLevels = ['All', 'Beginner', 'Intermediate'];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Care difficulty filter
      if (selectedCareLevel !== 'All' && product.careLevel !== selectedCareLevel) {
        return false;
      }
      // Search query (matches name, description, or tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTag = product.tags?.some(tag => tag.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesTag) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0); // featured default
    });
  }, [products, selectedCategory, selectedCareLevel, searchQuery, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedCareLevel('All');
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || selectedCareLevel !== 'All' || sortBy !== 'featured';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* ─── Page Header & Breadcrumb ─── */}
      <div className="space-y-2">
        <Badge variant="forest" size="md" icon={Sprout}>Botanical Catalog</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-900 tracking-tight">
          Curated Plant Collection
        </h1>
        <p className="text-sm text-charcoal-600 max-w-2xl leading-relaxed">
          Discover hand-selected indoor air purifiers, resilient succulents, and flowering botanicals.
          Each specimen includes authentic care requirements tailored for home and apartment living.
        </p>
      </div>

      {/* ─── Search and Filter Control Bar ─── */}
      <div className="bg-white rounded-2xl border border-charcoal-200/80 p-4 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          
          {/* Live Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plants by name, tag, or trait..."
              className="w-full bg-offwhite border border-charcoal-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-charcoal placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest"
            />
          </div>

          {/* Care Level Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCareLevel}
              onChange={(e) => setSelectedCareLevel(e.target.value)}
              className="w-full bg-offwhite border border-charcoal-200 rounded-xl px-3 py-2 text-xs text-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-forest"
            >
              <option value="All">All Care Levels</option>
              <option value="Beginner">Beginner (Easy Care)</option>
              <option value="Intermediate">Intermediate (Moderate)</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-offwhite border border-charcoal-200 rounded-xl px-3 py-2 text-xs text-charcoal font-medium focus:outline-none focus:ring-2 focus:ring-forest"
            >
              <option value="featured">Sort by: Popular / Featured</option>
              <option value="price-asc">Price: Low to High (৳)</option>
              <option value="price-desc">Price: High to Low (৳)</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Reset Filters Button */}
          <div className="md:col-span-1 flex justify-end">
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                title="Reset all filters"
                className="p-2 rounded-xl text-charcoal-500 hover:text-forest hover:bg-offwhite border border-charcoal-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-charcoal-100 no-scrollbar">
          <span className="text-xs font-semibold text-charcoal-500 mr-2 flex-shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSearchParams(cat === 'All' ? {} : { category: cat });
              }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-forest text-white shadow-sm'
                  : 'bg-offwhite text-charcoal-700 hover:bg-sage-100 border border-charcoal-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Products Count & Results ─── */}
      <div className="flex items-center justify-between text-xs text-charcoal-500">
        <span>
          Showing <strong className="text-forest-900">{filteredProducts.length}</strong> botanical specimens
        </span>
        {hasActiveFilters && (
          <span className="text-forest-700 font-medium">
            Active filters applied
          </span>
        )}
      </div>

      {/* ─── Product Grid / Empty State ─── */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-charcoal-200 p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest mx-auto">
            <Sprout className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-forest-900">No Plants Match Your Filter</h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Try adjusting your search query, selecting another category, or clearing the active filters.
          </p>
          <Button variant="primary" size="sm" onClick={resetFilters} icon={RotateCcw}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
