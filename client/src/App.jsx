import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PublicLayout from './components/layout/PublicLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public & Authentication Views
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/public/NotFoundPage';

// Multi-Role Protected Dashboards
import CustomerDashboard from './pages/dashboard/CustomerDashboard';
import GardenerDashboard from './pages/dashboard/GardenerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            {/* Public Storefront & Authentication Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Role-Protected Dashboards */}
            <Route
              path="/customer"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/gardener"
              element={
                <ProtectedRoute allowedRoles={['gardener']}>
                  <GardenerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Dashboard Redirect Shortcuts */}
            <Route path="/customer/dashboard" element={<Navigate to="/customer" replace />} />
            <Route path="/gardener/dashboard" element={<Navigate to="/gardener" replace />} />
            <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />

            {/* 404 Not Found Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
