import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import PublicLayout from './layouts/PublicLayout';

// Public & Customer Views
import HomePage from './pages/public/HomePage';
import ShopPage from './pages/public/ShopPage';
import ProductDetailPage from './pages/public/ProductDetailPage';
import ServicesPage from './pages/public/ServicesPage';
import ServiceDetailPage from './pages/public/ServiceDetailPage';
import CartPage from './pages/public/CartPage';
import CheckoutPage from './pages/public/CheckoutPage';
import MyPlantsPage from './pages/public/MyPlantsPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Multi-Role Dashboards
import GardenerDashboardPage from './pages/public/GardenerDashboardPage';
import AdminDashboardPage from './pages/public/AdminDashboardPage';

/**
 * Root Application Component
 * Wraps the app with AppProvider for unified cart, plant journal, and role state.
 * Defines comprehensive routing for Customer, Gardener, and Administrator views.
 */
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* ─── Main Unified Botanical Layout ─── */}
          <Route element={<PublicLayout />}>
            {/* Storefront & Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:slug" element={<ProductDetailPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Customer Commerce & Plant Journal Routes */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/my-plants" element={<MyPlantsPage />} />

            {/* Authentication & Role Switcher Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Dedicated Role Portals */}
            <Route path="/gardener" element={<GardenerDashboardPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />

            {/* 404 Fallback Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
