import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Sprout } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { useApp } from '../../context/AppContext';

/**
 * CartPage — Shopping Cart View
 * Displays line items, quantity adjustments, real-time total computation in BDT,
 * and direct progression to Checkout.
 */
export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart, cartSubtotal, shippingFee, cartTotal } = useApp();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-forest-50 dark:bg-night-800 border border-forest-100 dark:border-forest-800 flex items-center justify-center text-forest dark:text-sage-400 mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-gray-100">Your Botanical Cart is Empty</h2>
          <p className="text-xs sm:text-sm text-charcoal-600 dark:text-charcoal-300 max-w-md mx-auto">
            You haven't added any botanical specimens yet. Explore our curated shop to discover healthy plants for your home.
          </p>
        </div>
        <Link to="/shop">
          <Button variant="primary" size="lg" icon={Sprout}>
            Explore Plant Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* ─── Breadcrumb ─── */}
      <nav className="flex items-center gap-2 text-xs text-charcoal-500 dark:text-charcoal-400">
        <Link to="/" className="hover:text-forest dark:hover:text-sage-300">Home</Link>
        <span>/</span>
        <span className="text-forest-900 dark:text-sage-300 font-semibold">Shopping Cart</span>
      </nav>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-200 dark:border-night-700 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-gray-100">
            Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)
          </h1>
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400">Review your selected plants before proceeding to checkout</p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-charcoal-500 dark:text-charcoal-400 hover:text-rose-600 dark:hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      {/* ─── Two-Column Cart Table & Summary ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
              key={product._id}
              className="bg-white dark:bg-night-800 rounded-2xl border border-charcoal-200/80 dark:border-night-600 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm transition-colors"
            >
              <div className="flex items-center gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-offwhite dark:bg-night-900 flex-shrink-0 border border-charcoal-100 dark:border-night-700">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <Badge variant="forest" size="sm">{product.category}</Badge>
                  <Link to={`/shop/${product.slug}`} className="hover:text-forest dark:hover:text-sage-300 transition-colors block">
                    <h3 className="text-sm sm:text-base font-bold text-forest-900 dark:text-gray-100 leading-snug">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
                    ৳{product.price.toLocaleString()} each
                  </p>
                </div>
              </div>

              {/* Quantity Counter & Line Price */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-charcoal-100 dark:border-night-700">
                <div className="flex items-center border border-charcoal-200 dark:border-night-600 rounded-lg bg-white dark:bg-night-900 shadow-sm">
                  <button
                    onClick={() => updateCartQuantity(product._id, quantity - 1)}
                    className="p-1.5 text-charcoal-600 dark:text-charcoal-300 hover:text-forest dark:hover:text-sage-300 cursor-pointer"
                    title="Decrease Quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-xs font-bold text-forest-900 dark:text-gray-100 min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(product._id, quantity + 1)}
                    className="p-1.5 text-charcoal-600 dark:text-charcoal-300 hover:text-forest dark:hover:text-sage-300 cursor-pointer"
                    title="Increase Quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm sm:text-base font-extrabold text-forest-900 dark:text-sage-300 block">
                    ৳{(product.price * quantity).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(product._id)}
                  className="p-2 text-charcoal-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  title="Remove from Cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link to="/shop" className="text-xs font-semibold text-forest dark:text-sage-300 hover:underline flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping for Plants</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <div className="lg:col-span-4">
          <Card className="p-6 space-y-5 border-charcoal-200/80 dark:border-night-600 shadow-botanical bg-white dark:bg-night-800">
            <h2 className="text-lg font-bold text-forest-900 dark:text-gray-100 border-b border-charcoal-100 dark:border-night-700 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-charcoal-600 dark:text-charcoal-300">
                <span>Subtotal:</span>
                <span className="font-semibold text-charcoal-900 dark:text-gray-100">৳{cartSubtotal.toLocaleString()} BDT</span>
              </div>

              <div className="flex justify-between text-charcoal-600 dark:text-charcoal-300">
                <span>Estimated Delivery:</span>
                <span className="font-semibold text-charcoal-900 dark:text-gray-100">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE (Over ৳2,000)</span>
                  ) : (
                    `৳${shippingFee} BDT`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-charcoal-100 dark:border-night-700 flex justify-between items-baseline">
                <span className="text-sm font-bold text-forest-900 dark:text-gray-100">Estimated Total:</span>
                <span className="text-xl font-extrabold text-forest-900 dark:text-sage-300">
                  ৳{cartTotal.toLocaleString()} BDT
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              icon={ArrowRight}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </Button>

            <div className="pt-2 text-center text-[11px] text-charcoal-500 dark:text-charcoal-400 space-y-1">
              <div className="flex items-center justify-center gap-1 text-forest-700 dark:text-sage-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SSLCommerz Sandbox Payment Protection</span>
              </div>
              <p>Simulated test payment with instant order confirmation.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
