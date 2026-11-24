import React, { useState, useEffect } from 'react';
import {
  User, Sprout, ShoppingBag, Calendar, Clock,
  MapPin, Phone, Mail, CheckCircle2, AlertCircle, ShieldCheck
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export default function CustomerDashboard() {
  const { user, token } = useAuth();
  const [backendData, setBackendData] = useState(null);
  const [loadingBackend, setLoadingBackend] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Fetch backend protected customer endpoint to prove backend role authorization
  const testBackendAuthorization = async () => {
    setLoadingBackend(true);
    setApiError(null);
    try {
      const res = await fetch('/api/dashboard/customer', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch customer data');
      setBackendData(data);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoadingBackend(false);
    }
  };

  useEffect(() => {
    if (token) {
      testBackendAuthorization();
    }
  }, [token]);

  const sidebarLinks = [
    { label: 'My Plant Journal', icon: Sprout },
    { label: 'Order History', icon: ShoppingBag },
    { label: 'Service Bookings', icon: Calendar },
    { label: 'Care Reminders', icon: Clock },
  ];

  return (
    <DashboardLayout
      title={`Welcome back, ${user?.name || 'Customer'}!`}
      subtitle="Here is your personal botanical overview and plant care hub."
      role="customer"
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-6">
        
        {/* ─── Profile Overview Card ─── */}
        <Card className="p-6 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-100 dark:border-night-700 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-forest-50 dark:bg-forest-950/70 text-forest dark:text-sage-300 flex items-center justify-center font-bold text-lg">
                {user?.name?.charAt(0) || 'C'}
              </div>
              <div>
                <h2 className="text-lg font-bold text-forest-900 dark:text-gray-100">
                  {user?.name}
                </h2>
                <Badge variant="forest" size="sm">
                  Verified Customer Account
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={ShieldCheck}
                onClick={testBackendAuthorization}
                isLoading={loadingBackend}
              >
                Verify Backend Authorization
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-charcoal-400 font-semibold uppercase flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-forest dark:text-sage-400" /> Email
              </span>
              <p className="font-medium text-charcoal-800 dark:text-gray-200">{user?.email}</p>
            </div>

            <div className="space-y-1">
              <span className="text-charcoal-400 font-semibold uppercase flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-forest dark:text-sage-400" /> Phone
              </span>
              <p className="font-medium text-charcoal-800 dark:text-gray-200">
                {user?.phone || 'Not provided'}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-charcoal-400 font-semibold uppercase flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-forest dark:text-sage-400" /> Delivery Address
              </span>
              <p className="font-medium text-charcoal-800 dark:text-gray-200">
                {typeof user?.address === 'object'
                  ? [user.address.street, user.address.city, user.address.country].filter(Boolean).join(', ') || 'Not specified'
                  : user?.address || 'Not specified'}
              </p>
            </div>
          </div>

          {/* Backend API verification badge */}
          {backendData && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-semibold">Backend API Connected:</span>
                <span>{backendData.message}</span>
              </div>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900 px-2 py-0.5 rounded font-mono font-bold">
                HTTP 200 OK
              </span>
            </div>
          )}

          {apiError && (
            <div className="mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{apiError}</span>
            </div>
          )}
        </Card>

        {/* ─── Metric Summary Cards ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 space-y-1">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">
              Saved Plants
            </span>
            <div className="text-2xl font-extrabold text-forest-900 dark:text-gray-100">
              0
            </div>
            <span className="text-[10px] text-charcoal-400">Milestone 2</span>
          </Card>

          <Card className="p-4 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 space-y-1">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">
              Active Orders
            </span>
            <div className="text-2xl font-extrabold text-forest-900 dark:text-gray-100">
              0
            </div>
            <span className="text-[10px] text-charcoal-400">Milestone 2</span>
          </Card>

          <Card className="p-4 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 space-y-1">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">
              Consultations
            </span>
            <div className="text-2xl font-extrabold text-forest-900 dark:text-gray-100">
              0
            </div>
            <span className="text-[10px] text-charcoal-400">Milestone 2</span>
          </Card>

          <Card className="p-4 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 space-y-1">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">
              Care Reminders
            </span>
            <div className="text-2xl font-extrabold text-forest-900 dark:text-gray-100">
              0
            </div>
            <span className="text-[10px] text-charcoal-400">Milestone 2</span>
          </Card>
        </div>

        {/* ─── Placeholder Feature Sections for Upcoming Milestones ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Section 1: Plant Journal Preview */}
          <Card className="p-6 border-dashed border-2 border-charcoal-200 dark:border-night-700 bg-offwhite/50 dark:bg-night-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-forest-900 dark:text-gray-100 font-bold">
                <Sprout className="w-5 h-5 text-forest dark:text-sage-400" />
                <span>My Plant Journal</span>
              </div>
              <Badge variant="default" size="sm">Coming in Milestone 2</Badge>
            </div>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
              Track your living room specimens, indoor humidity requirements, potting schedules, and automated watering alerts.
            </p>
            <div className="p-4 rounded-xl bg-white dark:bg-night-800 border border-charcoal-200/80 dark:border-night-700 text-center text-xs text-charcoal-400">
              🌱 No personal plants added yet.
            </div>
          </Card>

          {/* Section 2: Order History Preview */}
          <Card className="p-6 border-dashed border-2 border-charcoal-200 dark:border-night-700 bg-offwhite/50 dark:bg-night-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-forest-900 dark:text-gray-100 font-bold">
                <ShoppingBag className="w-5 h-5 text-forest dark:text-sage-400" />
                <span>Recent Botanical Orders</span>
              </div>
              <Badge variant="default" size="sm">Coming in Milestone 2</Badge>
            </div>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
              Track live plant shipments with courier updates, delivery invoices, and plant nursery dispatch confirmations.
            </p>
            <div className="p-4 rounded-xl bg-white dark:bg-night-800 border border-charcoal-200/80 dark:border-night-700 text-center text-xs text-charcoal-400">
              📦 No orders placed yet.
            </div>
          </Card>

        </div>

      </div>
    </DashboardLayout>
  );
}
