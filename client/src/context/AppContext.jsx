import React, { createContext, useContext, useState, useEffect } from 'react';
import mockProductsData from '../data/mockProducts';
import mockServicesData from '../data/mockServices';

/**
 * Florva Application Context
 * Central, beginner-friendly state management for:
 * - Active user role (Customer, Gardener, Admin)
 * - Shopping cart (persisted in localStorage)
 * - Plant catalog with stock counts
 * - Customer personal plants journal ("My Plants")
 * - Orders and service bookings lifecycle
 * - Lightweight toast notifications
 */
const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ─── 1. User & Authentication State ───
  // Default to a logged-in customer for effortless practicum demonstration
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('florva_user');
    return saved ? JSON.parse(saved) : {
      _id: 'usr_customer_01',
      name: 'Rifat Bin Alam',
      email: 'customer@florva.com',
      role: 'customer', // 'customer' | 'gardener' | 'admin'
      phone: '+880 1711-223344',
      address: 'House 12, Road 4, Sector 10, Uttara, Dhaka'
    };
  });

  useEffect(() => {
    localStorage.setItem('florva_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Quick switch role helper (for demonstration ease)
  const switchRole = (role) => {
    if (role === 'gardener') {
      setCurrentUser({
        _id: 'usr_gardener_01',
        name: 'Md. Rafiqul Islam',
        email: 'gardener@florva.com',
        role: 'gardener',
        phone: '+880 1812-998877',
        specialty: 'Head Horticulturist & Urban Garden Specialist'
      });
      showToast('Switched to Gardener Portal View', 'info');
    } else if (role === 'admin') {
      setCurrentUser({
        _id: 'usr_admin_01',
        name: 'System Administrator',
        email: 'admin@florva.com',
        role: 'admin',
        phone: '+880 1700-112233',
        department: 'Operations & Platform Governance'
      });
      showToast('Switched to Administrator View', 'info');
    } else {
      setCurrentUser({
        _id: 'usr_customer_01',
        name: 'Rifat Bin Alam',
        email: 'customer@florva.com',
        role: 'customer',
        phone: '+880 1711-223344',
        address: 'House 12, Road 4, Sector 10, Uttara, Dhaka'
      });
      showToast('Switched to Customer View', 'info');
    }
  };

  // ─── 2. Products Catalog State ───
  // Initialized from mockProducts, allows Gardener to update stock or edit items
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('florva_products');
    return saved ? JSON.parse(saved) : mockProductsData;
  });

  useEffect(() => {
    localStorage.setItem('florva_products', JSON.stringify(products));
  }, [products]);

  const updateProductStock = (productId, delta) => {
    setProducts(prev => prev.map(p => {
      if (p._id === productId) {
        const newCount = Math.max(0, (p.stockCount || 0) + delta);
        return { ...p, stockCount: newCount, inStock: newCount > 0 };
      }
      return p;
    }));
  };

  const updateProductPrice = (productId, newPrice) => {
    setProducts(prev => prev.map(p => {
      if (p._id === productId) {
        return { ...p, price: Number(newPrice) };
      }
      return p;
    }));
  };

  // ─── 3. Shopping Cart State ───
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('florva_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('florva_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product._id === product._id);
      if (existing) {
        return prev.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to cart`, 'success');
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.product._id === productId
        ? { ...item, quantity }
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product._id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingFee = cartSubtotal > 2000 || cartSubtotal === 0 ? 0 : 50;
  const cartTotal = cartSubtotal + shippingFee;

  // ─── 4. Orders State ───
  const initialOrders = [
    {
      _id: 'ord_101',
      orderNumber: 'FLV-ORD-202611-0101',
      customerName: 'Rifat Bin Alam',
      customerEmail: 'customer@florva.com',
      date: '2026-11-08',
      items: [
        { name: 'Monstera Deliciosa', price: 1250, quantity: 1, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80' },
        { name: 'Snake Plant (Sansevieria)', price: 650, quantity: 1, image: 'https://images.unsplash.com/photo-1593482892540-d9cf9b2d5e6e?auto=format&fit=crop&w=600&q=80' }
      ],
      subtotal: 1900,
      shippingFee: 50,
      totalAmount: 1950,
      paymentMethod: 'SSLCommerz Sandbox (bKash)',
      paymentStatus: 'paid',
      orderStatus: 'delivered', // 'pending' | 'confirmed' | 'shipped' | 'delivered'
      shippingAddress: 'House 12, Road 4, Sector 10, Uttara, Dhaka'
    },
    {
      _id: 'ord_102',
      orderNumber: 'FLV-ORD-202611-0102',
      customerName: 'Rifat Bin Alam',
      customerEmail: 'customer@florva.com',
      date: '2026-11-10',
      items: [
        { name: 'Peace Lily (Spathiphyllum)', price: 850, quantity: 2, image: 'https://images.unsplash.com/photo-1616690248297-35d7b4e6090c?auto=format&fit=crop&w=600&q=80' }
      ],
      subtotal: 1700,
      shippingFee: 50,
      totalAmount: 1750,
      paymentMethod: 'SSLCommerz Sandbox (Card)',
      paymentStatus: 'paid',
      orderStatus: 'shipped',
      shippingAddress: 'House 12, Road 4, Sector 10, Uttara, Dhaka'
    },
    {
      _id: 'ord_103',
      orderNumber: 'FLV-ORD-202611-0103',
      customerName: 'Nusrat Jahan',
      customerEmail: 'nusrat@example.com',
      date: '2026-11-11',
      items: [
        { name: 'Fiddle Leaf Fig', price: 2200, quantity: 1, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=600&q=80' }
      ],
      subtotal: 2200,
      shippingFee: 0,
      totalAmount: 2200,
      paymentMethod: 'SSLCommerz Sandbox (Nagad)',
      paymentStatus: 'paid',
      orderStatus: 'confirmed',
      shippingAddress: 'Flat 4B, Road 18, Banani, Dhaka'
    }
  ];

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('florva_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  useEffect(() => {
    localStorage.setItem('florva_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderData) => {
    const newOrder = {
      _id: `ord_${Date.now()}`,
      orderNumber: `FLV-ORD-202611-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(item => ({
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image
      })),
      subtotal: cartSubtotal,
      shippingFee,
      totalAmount: cartTotal,
      paymentMethod: orderData.paymentMethod || 'SSLCommerz Sandbox (bKash)',
      paymentStatus: 'paid',
      orderStatus: 'confirmed',
      shippingAddress: `${orderData.address}, ${orderData.city}`
    };

    // Deduct stock for ordered items
    cart.forEach(item => {
      updateProductStock(item.product._id, -item.quantity);
    });

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast('Order confirmed and placed successfully!', 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
    showToast(`Order status updated to ${newStatus}`, 'info');
  };

  // ─── 5. Gardening Service Bookings State ───
  const initialBookings = [
    {
      _id: 'bkg_201',
      bookingNumber: 'FLV-BKG-202611-001',
      serviceName: 'Balcony Garden Setup',
      customerName: 'Rifat Bin Alam',
      customerPhone: '+880 1711-223344',
      serviceAddress: 'House 12, Road 4, Sector 10, Uttara',
      date: '2026-11-15',
      timeSlot: '09:00 AM - 11:00 AM',
      price: 3500,
      notes: 'East-facing balcony, receives morning sunlight for about 3-4 hours.',
      status: 'accepted', // 'pending' | 'accepted' | 'rejected' | 'completed'
      rejectionReason: ''
    },
    {
      _id: 'bkg_202',
      bookingNumber: 'FLV-BKG-202611-002',
      serviceName: 'Plant Health Consultation',
      customerName: 'Tanvir Hossain',
      customerPhone: '+880 1819-334455',
      serviceAddress: 'Apartment 3A, Road 7, Dhanmondi',
      date: '2026-11-18',
      timeSlot: '02:00 PM - 04:00 PM',
      price: 800,
      notes: 'Monstera and Calathea have yellow leaves and brown tips.',
      status: 'pending',
      rejectionReason: ''
    }
  ];

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('florva_bookings');
    return saved ? JSON.parse(saved) : initialBookings;
  });

  useEffect(() => {
    localStorage.setItem('florva_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const createBooking = (bookingData) => {
    const newBooking = {
      _id: `bkg_${Date.now()}`,
      bookingNumber: `FLV-BKG-202611-${Math.floor(100 + Math.random() * 900)}`,
      customerName: currentUser.name,
      customerPhone: bookingData.phone || currentUser.phone,
      serviceName: bookingData.serviceName,
      serviceAddress: bookingData.address,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      price: bookingData.price,
      notes: bookingData.notes || '',
      status: 'pending',
      rejectionReason: ''
    };
    setBookings(prev => [newBooking, ...prev]);
    showToast('Service appointment request submitted!', 'success');
    return newBooking;
  };

  const updateBookingStatus = (bookingId, status, rejectionReason = '') => {
    setBookings(prev => prev.map(b =>
      b._id === bookingId ? { ...b, status, rejectionReason } : b
    ));
    showToast(`Booking marked as ${status}`, 'info');
  };

  // ─── 6. Personal Plants Journal ("My Plants") State ───
  const initialPlants = [
    {
      _id: 'plant_001',
      nickname: 'Monty',
      species: 'Monstera Deliciosa',
      location: 'Living Room (East Window)',
      acquiredDate: '2026-09-15',
      wateringIntervalDays: 7,
      lastWateredDate: '2026-11-05', // 7 days ago -> Needs water today!
      fertilizingIntervalDays: 30,
      lastFertilizedDate: '2026-10-20',
      notes: 'Loves the bright morning light. Mist leaves twice weekly.',
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80'
    },
    {
      _id: 'plant_002',
      nickname: 'Ziggy',
      species: 'Snake Plant (Sansevieria)',
      location: 'Bedroom Desk',
      acquiredDate: '2026-10-01',
      wateringIntervalDays: 14,
      lastWateredDate: '2026-11-02', // 10 days ago -> 4 days remaining
      fertilizingIntervalDays: 45,
      lastFertilizedDate: '2026-10-10',
      notes: 'Extremely resilient. Do not overwater; allow soil to dry completely.',
      image: 'https://images.unsplash.com/photo-1593482892540-d9cf9b2d5e6e?auto=format&fit=crop&w=600&q=80'
    },
    {
      _id: 'plant_003',
      nickname: 'Serena',
      species: 'Peace Lily',
      location: 'Dining Table',
      acquiredDate: '2026-10-18',
      wateringIntervalDays: 5,
      lastWateredDate: '2026-11-10', // 2 days ago -> 3 days remaining
      fertilizingIntervalDays: 30,
      lastFertilizedDate: '2026-10-25',
      notes: 'Blooms steadily with indirect light. Protect from drafty windows.',
      image: 'https://images.unsplash.com/photo-1616690248297-35d7b4e6090c?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const [personalPlants, setPersonalPlants] = useState(() => {
    const saved = localStorage.getItem('florva_personal_plants');
    return saved ? JSON.parse(saved) : initialPlants;
  });

  useEffect(() => {
    localStorage.setItem('florva_personal_plants', JSON.stringify(personalPlants));
  }, [personalPlants]);

  const addPersonalPlant = (plantData) => {
    const today = new Date().toISOString().split('T')[0];
    const newPlant = {
      _id: `plant_${Date.now()}`,
      nickname: plantData.nickname,
      species: plantData.species,
      location: plantData.location || 'Indoor',
      acquiredDate: plantData.acquiredDate || today,
      wateringIntervalDays: Number(plantData.wateringIntervalDays) || 7,
      lastWateredDate: today,
      fertilizingIntervalDays: Number(plantData.fertilizingIntervalDays) || 30,
      lastFertilizedDate: today,
      notes: plantData.notes || '',
      image: plantData.image || 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80'
    };
    setPersonalPlants(prev => [newPlant, ...prev]);
    showToast(`Added ${plantData.nickname} to your plant journal!`, 'success');
  };

  const markPlantWatered = (plantId) => {
    const today = new Date().toISOString().split('T')[0];
    setPersonalPlants(prev => prev.map(p =>
      p._id === plantId ? { ...p, lastWateredDate: today } : p
    ));
    showToast('Plant watered! Schedule updated.', 'success');
  };

  const markPlantFertilized = (plantId) => {
    const today = new Date().toISOString().split('T')[0];
    setPersonalPlants(prev => prev.map(p =>
      p._id === plantId ? { ...p, lastFertilizedDate: today } : p
    ));
    showToast('Fertilizing recorded! Schedule updated.', 'success');
  };

  const removePersonalPlant = (plantId) => {
    setPersonalPlants(prev => prev.filter(p => p._id !== plantId));
    showToast('Plant removed from journal', 'info');
  };

  // ─── 7. Toast Notification System ───
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        products,
        services: mockServicesData,
        updateProductStock,
        updateProductPrice,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        shippingFee,
        cartTotal,
        orders,
        placeOrder,
        updateOrderStatus,
        bookings,
        createBooking,
        updateBookingStatus,
        personalPlants,
        addPersonalPlant,
        markPlantWatered,
        markPlantFertilized,
        removePersonalPlant,
        toast,
        showToast
      }}
    >
      {children}

      {/* Lightweight Botanical Floating Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
          <div className={`px-4 py-3 rounded-xl shadow-botanical-lg border text-sm font-medium flex items-center gap-2.5 ${
            toast.type === 'success'
              ? 'bg-forest-900 text-white border-forest-700'
              : toast.type === 'info'
              ? 'bg-sage-100 text-forest-900 border-sage-300'
              : 'bg-rose-50 text-rose-900 border-rose-200'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              toast.type === 'success' ? 'bg-emerald-400' : 'bg-forest-600'
            }`} />
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
