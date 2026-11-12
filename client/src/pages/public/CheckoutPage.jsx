import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck, CreditCard, CheckCircle2, ArrowRight,
  Package, MapPin, Phone, User, Sprout, ArrowLeft
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import { useApp } from '../../context/AppContext';

/**
 * CheckoutPage — Order Placement & Sandbox Payment Verification
 * Collects shipping information, simulates authoritative gateway transaction,
 * saves order into state, decrements inventory, and issues confirmation receipt.
 */
export default function CheckoutPage() {
  const { cart, cartSubtotal, shippingFee, cartTotal, currentUser, placeOrder } = useApp();
  const navigate = useNavigate();

  // Form State pre-populated with currentUser info
  const [fullName, setFullName] = useState(currentUser.name || 'Rifat Bin Alam');
  const [phone, setPhone] = useState(currentUser.phone || '+880 1711-223344');
  const [street, setStreet] = useState(currentUser.address || 'House 12, Road 4, Sector 10');
  const [city, setCity] = useState('Uttara, Dhaka');
  const [zipCode, setZipCode] = useState('1230');
  const [paymentMethod, setPaymentMethod] = useState('SSLCommerz Sandbox (bKash)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-forest-900">Your Cart is Empty</h2>
        <p className="text-sm text-charcoal-600">Please add plants to your cart before proceeding to checkout.</p>
        <Link to="/shop">
          <Button variant="primary" size="md" icon={Sprout}>
            Explore Plant Shop
          </Button>
        </Link>
      </div>
    );
  }

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate authoritative sandbox payment gateway delay (1.2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1200));

    const orderResult = placeOrder({
      fullName,
      phone,
      address: street,
      city,
      zipCode,
      paymentMethod
    });

    setIsProcessing(false);
    setPlacedOrder(orderResult);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* ─── Breadcrumb ─── */}
      <nav className="flex items-center gap-2 text-xs text-charcoal-500">
        <Link to="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link to="/cart" className="hover:text-forest">Cart</Link>
        <span>/</span>
        <span className="text-forest-900 font-semibold">Checkout</span>
      </nav>

      {/* ─── Order Confirmation Receipt Screen ─── */}
      {placedOrder ? (
        <Card className="max-w-2xl mx-auto text-center p-8 sm:p-12 space-y-6 border-forest-200 shadow-botanical-lg">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <Badge variant="success" size="md">Payment Succeeded • Order Confirmed</Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900">
              Thank You for Your Order!
            </h1>
            <p className="text-xs text-charcoal-600 max-w-md mx-auto leading-relaxed">
              Your botanical order has been registered and verified. Our horticulturist is preparing
              your plants with moisture-lock root protection.
            </p>
          </div>

          {/* Receipt Breakdown */}
          <div className="bg-offwhite rounded-xl p-5 text-xs text-left space-y-2.5 border border-charcoal-100 max-w-md mx-auto">
            <div className="flex justify-between border-b border-charcoal-100 pb-2">
              <span className="text-charcoal-500">Order Reference:</span>
              <strong className="text-forest-900 font-mono">{placedOrder.orderNumber}</strong>
            </div>
            <div className="flex justify-between border-b border-charcoal-100 pb-2">
              <span className="text-charcoal-500">Customer:</span>
              <strong className="text-forest-900">{placedOrder.customerName}</strong>
            </div>
            <div className="flex justify-between border-b border-charcoal-100 pb-2">
              <span className="text-charcoal-500">Payment Gateway:</span>
              <strong className="text-forest-900">{placedOrder.paymentMethod}</strong>
            </div>
            <div className="flex justify-between border-b border-charcoal-100 pb-2">
              <span className="text-charcoal-500">Delivery Address:</span>
              <strong className="text-forest-900">{placedOrder.shippingAddress}</strong>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-charcoal-500">Total Paid:</span>
              <strong className="text-forest-900 text-sm">৳{placedOrder.totalAmount.toLocaleString()} BDT</strong>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/my-plants">
              <Button variant="primary" size="md" icon={Package}>
                View in My Orders
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" size="md" icon={Sprout}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        /* ─── Two-Column Checkout Form ─── */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Delivery & Payment Details Form */}
          <div className="lg:col-span-7 space-y-6">
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-6">
              
              {/* Delivery Address Card */}
              <Card className="p-6 space-y-4 border-charcoal-200/80 shadow-sm">
                <div className="border-b border-charcoal-100 pb-3">
                  <h2 className="text-base font-bold text-forest-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-forest" />
                    Delivery Destination (Bangladesh)
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Recipient Name *"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    icon={User}
                  />

                  <Input
                    label="Contact Phone Number *"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    icon={Phone}
                  />

                  <div className="sm:col-span-2">
                    <Input
                      label="Street Address / House / Sector *"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="E.g. House 12, Road 4, Sector 10"
                    />
                  </div>

                  <Input
                    label="City / Area *"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Uttara, Dhaka"
                  />

                  <Input
                    label="Postal Code *"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="1230"
                  />
                </div>
              </Card>

              {/* Payment Gateway Selection Card */}
              <Card className="p-6 space-y-4 border-charcoal-200/80 shadow-sm">
                <div className="border-b border-charcoal-100 pb-3 flex items-center justify-between">
                  <h2 className="text-base font-bold text-forest-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-forest" />
                    Sandbox Payment Method
                  </h2>
                  <Badge variant="forest" size="sm">BDT Currency</Badge>
                </div>

                {/* Practicum Evaluation Banner */}
                <div className="bg-sage-50 border border-sage-200 rounded-xl p-3.5 text-xs text-forest-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4 text-forest" />
                    <span>Practicum Sandbox Demonstration Mode</span>
                  </div>
                  <p className="text-[11px] text-forest-800 leading-relaxed">
                    Test credentials simulate authentic Bangladeshi payment gateways. No real currency is charged.
                  </p>
                </div>

                {/* Radio Options */}
                <div className="space-y-2.5">
                  {[
                    { id: 'SSLCommerz Sandbox (bKash)', label: 'bKash Mobile Banking', desc: 'Simulated bKash sandbox wallet confirmation' },
                    { id: 'SSLCommerz Sandbox (Nagad)', label: 'Nagad Mobile Banking', desc: 'Simulated Nagad sandbox test payment' },
                    { id: 'SSLCommerz Sandbox (Card)', label: 'Bangladeshi Visa / Mastercard', desc: 'Simulated debit/credit card processing' },
                    { id: 'Cash on Delivery', label: 'Cash on Delivery', desc: 'Pay upon delivery across Dhaka metro area' }
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? 'border-forest bg-forest-50/50 shadow-sm'
                          : 'border-charcoal-200 hover:bg-offwhite'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-0.5 text-forest focus:ring-forest"
                      />
                      <div>
                        <span className="text-xs font-bold text-forest-900 block">{method.label}</span>
                        <span className="text-[11px] text-charcoal-500">{method.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </Card>
            </form>
          </div>

          {/* Right Column: Order Review Summary */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="p-6 space-y-4 border-charcoal-200/80 shadow-botanical">
              <h2 className="text-base font-bold text-forest-900 border-b border-charcoal-100 pb-3">
                Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} items)
              </h2>

              {/* Items List preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map(({ product, quantity }) => (
                  <div key={product._id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover bg-offwhite border border-charcoal-100 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-semibold text-forest-900 truncate">{product.name}</p>
                        <p className="text-[11px] text-charcoal-400">Qty: {quantity} × ৳{product.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <span className="font-bold text-forest-900 flex-shrink-0">
                      ৳{(product.price * quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="pt-3 border-t border-charcoal-100 space-y-2 text-xs">
                <div className="flex justify-between text-charcoal-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-charcoal-900">৳{cartSubtotal.toLocaleString()} BDT</span>
                </div>
                <div className="flex justify-between text-charcoal-600">
                  <span>Delivery Fee:</span>
                  <span className="font-semibold text-charcoal-900">
                    {shippingFee === 0 ? 'FREE' : `৳${shippingFee} BDT`}
                  </span>
                </div>
                <div className="pt-2 border-t border-charcoal-100 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-forest-900">Total Payable:</span>
                  <span className="text-xl font-extrabold text-forest-900">
                    ৳{cartTotal.toLocaleString()} BDT
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                form="checkout-form"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isProcessing}
                icon={CheckCircle2}
              >
                {isProcessing ? 'Verifying Sandbox Payment...' : `Confirm & Pay ৳${cartTotal.toLocaleString()}`}
              </Button>
            </Card>

            <Link to="/cart" className="text-xs font-semibold text-forest hover:underline flex items-center justify-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Shopping Cart</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
