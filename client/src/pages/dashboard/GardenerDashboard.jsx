import React, { useState, useEffect } from 'react';
import {
  Wrench, Package, Calendar, Clock, MapPin,
  Phone, Mail, CheckCircle2, AlertCircle, ShieldCheck, Sparkles, Plus
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import GardenerProductManagement from '../../components/gardener/GardenerProductManagement';

export default function GardenerDashboard() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('inventory'); // default to inventory for immediate CRUD access
  const [backendData, setBackendData] = useState(null);
  const [loadingBackend, setLoadingBackend] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [productCount, setProductCount] = useState(0);

  // Fetch backend protected gardener endpoint to verify backend role authorization & stats
  const fetchGardenerOverview = async () => {
    setLoadingBackend(true);
    setApiError(null);
    try {
      const res = await fetch('/api/dashboard/gardener', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch gardener data');
      setBackendData(data);
      if (data.overview?.stats?.catalogStockManaged !== undefined) {
        setProductCount(data.overview.stats.catalogStockManaged);
      }
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoadingBackend(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchGardenerOverview();
    }
  }, [token]);

  const handleProductCountChange = (newCount) => {
    setProductCount(newCount);
  };

  const sidebarLinks = [
    {
      label: 'Plant Catalog (CRUD)',
      icon: Package,
      active: activeTab === 'inventory',
      onClick: () => setActiveTab('inventory'),
      badge: 'Active'
    },
    { label: 'Assigned Appointments', icon: Calendar },
    { label: 'Service Inquiries', icon: Clock },
  ];

  return (
    <DashboardLayout
      title={`Gardener Workbench — ${user?.name || 'Horticulturist'}`}
      subtitle="Operational hub for plant catalog management, 100x100 thumbnail processing, and service tasks."
      role="gardener"
      sidebarLinks={sidebarLinks}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <div className="space-y-6">
        
        {/* ─── Profile & Status Card ─── */}
        <Card className="p-6 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-100 dark:border-night-700 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-forest-900 dark:text-gray-100">
                  {user?.name}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="warning" size="sm">
                    Verified Horticulturist
                  </Badge>
                  <span className="text-xs text-charcoal-500 dark:text-charcoal-400">
                    • {user?.specialty || 'Urban Plant Care Specialist'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={ShieldCheck}
                onClick={fetchGardenerOverview}
                isLoading={loadingBackend}
              >
                Refresh Stats & Authorization
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-charcoal-400 font-semibold uppercase flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Professional Email
              </span>
              <p className="font-medium text-charcoal-800 dark:text-gray-200">{user?.email}</p>
            </div>

            <div className="space-y-1">
              <span className="text-charcoal-400 font-semibold uppercase flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Phone
              </span>
              <p className="font-medium text-charcoal-800 dark:text-gray-200">
                {user?.phone || 'Not provided'}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-charcoal-400 font-semibold uppercase flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Operating Location
              </span>
              <p className="font-medium text-charcoal-800 dark:text-gray-200">
                {typeof user?.address === 'object'
                  ? [user.address.street, user.address.city, user.address.country].filter(Boolean).join(', ') || 'Dhaka Central Hub'
                  : user?.address || 'Dhaka Central Hub'}
              </p>
            </div>
          </div>

          {/* Backend API verification badge */}
          {backendData && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-semibold">Backend Authorization Confirmed:</span>
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
              Catalog Specimens
            </span>
            <div className="text-2xl font-extrabold text-amber-700 dark:text-amber-400">
              {productCount}
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              Live in MongoDB
            </span>
          </Card>

          <Card className="p-4 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 space-y-1">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">
              Image Format
            </span>
            <div className="text-2xl font-extrabold text-forest dark:text-sage-300">
              100×100
            </div>
            <span className="text-[10px] text-charcoal-400">Max 100 KB (Sharp)</span>
          </Card>

          <Card className="p-4 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 space-y-1">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">
              Pending Appointments
            </span>
            <div className="text-2xl font-extrabold text-charcoal-700 dark:text-gray-300">
              0
            </div>
            <span className="text-[10px] text-charcoal-400">Milestone 3</span>
          </Card>

          <Card className="p-4 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 space-y-1">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">
              Service Tasks
            </span>
            <div className="text-2xl font-extrabold text-forest-900 dark:text-gray-100">
              0
            </div>
            <span className="text-[10px] text-charcoal-400">Milestone 3</span>
          </Card>
        </div>

        {/* ─── Active Section: Product Management CRUD or Overview ─── */}
        {activeTab === 'inventory' ? (
          <GardenerProductManagement onProductCountChange={handleProductCountChange} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-forest-900 dark:text-gray-100 font-bold">
                  <Package className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>Plant Catalog Inventory</span>
                </div>
                <Badge variant="success" size="sm">Milestone 2 Active</Badge>
              </div>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
                You have {productCount} plant specimens currently listed in your catalog. Click below to manage, add, or update plant inventory.
              </p>
              <Button
                variant="primary"
                size="sm"
                icon={Package}
                onClick={() => setActiveTab('inventory')}
              >
                Open Product Management
              </Button>
            </Card>

            <Card className="p-6 border-dashed border-2 border-charcoal-200 dark:border-night-700 bg-offwhite/50 dark:bg-night-900/50 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-forest-900 dark:text-gray-100 font-bold">
                  <Calendar className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>Service Appointments</span>
                </div>
                <Badge variant="default" size="sm">Coming in Milestone 3</Badge>
              </div>
              <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
                Review, accept, or decline customer gardening appointments, repotting requests, and balcony garden design bookings.
              </p>
              <div className="p-4 rounded-xl bg-white dark:bg-night-800 border border-charcoal-200/80 dark:border-night-700 text-center text-xs text-charcoal-400">
                📅 Service bookings scheduled for next milestone.
              </div>
            </Card>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
