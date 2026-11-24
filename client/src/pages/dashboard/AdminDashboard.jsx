import React, { useState, useEffect } from 'react';
import {
  Shield, Users, DollarSign, Package, Calendar,
  CreditCard, CheckCircle2, AlertTriangle, Layers,
  Phone, Mail, Database, ShieldCheck, RefreshCw
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [backendData, setBackendData] = useState(null);
  const [loadingBackend, setLoadingBackend] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Fetch backend protected admin endpoint
  const fetchAdminStats = async () => {
    setLoadingBackend(true);
    setApiError(null);
    try {
      const res = await fetch('/api/dashboard/admin', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch admin governance data');
      setBackendData(data);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoadingBackend(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminStats();
    }
  }, [token]);

  const sidebarLinks = [
    { label: 'User Directory & Roles', icon: Users },
    { label: 'Platform Inventory Oversight', icon: Package },
    { label: 'Financial & Audit Logs', icon: DollarSign },
  ];

  return (
    <DashboardLayout
      title={`Administrator Governance — ${user?.name || 'Administrator'}`}
      subtitle="Superadmin controls, platform security audits, and MongoDB user account governance."
      role="admin"
      sidebarLinks={sidebarLinks}
    >
      <div className="space-y-6">
        
        {/* ─── Profile & Security Status Card ─── */}
        <Card className="p-6 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-100 dark:border-night-700 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-400 flex items-center justify-center font-bold text-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-forest-900 dark:text-gray-100">
                  {user?.name}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant="danger" size="sm">
                    Superadministrator Mode
                  </Badge>
                  <span className="text-xs text-charcoal-500 dark:text-charcoal-400">
                    • Platform Governance & Operations
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={RefreshCw}
                onClick={fetchAdminStats}
                isLoading={loadingBackend}
              >
                Refresh Real MongoDB Stats
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-charcoal-400 font-semibold uppercase flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Admin Email
              </span>
              <p className="font-medium text-charcoal-800 dark:text-gray-200">{user?.email}</p>
            </div>

            <div className="space-y-1">
              <span className="text-charcoal-400 font-semibold uppercase flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Access Protocol
              </span>
              <p className="font-medium text-charcoal-800 dark:text-gray-200">
                JWT Bearer Token + Role Authorization
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-charcoal-400 font-semibold uppercase flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> Database Connection
              </span>
              <p className="font-medium text-emerald-600 dark:text-emerald-400 font-semibold">
                MongoDB Local (127.0.0.1:27017)
              </p>
            </div>
          </div>

          {/* Backend API live status response */}
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
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{apiError}</span>
            </div>
          )}
        </Card>

        {/* ─── Real MongoDB User Statistics Grid ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 space-y-1">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">
              Total MongoDB Users
            </span>
            <div className="text-2xl font-extrabold text-forest-900 dark:text-gray-100">
              {backendData?.overview?.stats?.totalUsers ?? '...'}
            </div>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              Live from MongoDB
            </span>
          </Card>

          <Card className="p-4 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 space-y-1">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">
              Registered Customers
            </span>
            <div className="text-2xl font-extrabold text-forest-700 dark:text-sage-300">
              {backendData?.overview?.stats?.customerCount ?? '...'}
            </div>
            <span className="text-[10px] text-charcoal-400 font-medium">Customer Role</span>
          </Card>

          <Card className="p-4 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 space-y-1">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">
              Horticulturists
            </span>
            <div className="text-2xl font-extrabold text-amber-700 dark:text-amber-400">
              {backendData?.overview?.stats?.gardenerCount ?? '...'}
            </div>
            <span className="text-[10px] text-charcoal-400 font-medium">Gardener Role</span>
          </Card>

          <Card className="p-4 border-charcoal-200/80 dark:border-night-700 bg-white dark:bg-night-800 space-y-1">
            <span className="text-[11px] font-bold text-charcoal-400 uppercase tracking-wider block">
              Administrators
            </span>
            <div className="text-2xl font-extrabold text-rose-700 dark:text-rose-400">
              {backendData?.overview?.stats?.adminCount ?? '...'}
            </div>
            <span className="text-[10px] text-charcoal-400 font-medium">Protected Admin Role</span>
          </Card>
        </div>

        {/* ─── Placeholder Feature Sections for Upcoming Milestones ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Section 1: User Account Directory Placeholder */}
          <Card className="p-6 border-dashed border-2 border-charcoal-200 dark:border-night-700 bg-offwhite/50 dark:bg-night-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-forest-900 dark:text-gray-100 font-bold">
                <Users className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <span>User Directory & Role Governance</span>
              </div>
              <Badge variant="default" size="sm">Coming in Milestone 2</Badge>
            </div>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
              Superadmin interface to manage user status (active / suspended), promote roles, inspect registration logs, and review platform engagement.
            </p>
            <div className="p-4 rounded-xl bg-white dark:bg-night-800 border border-charcoal-200/80 dark:border-night-700 text-center text-xs text-charcoal-400">
              👥 Comprehensive user directory table will be added in upcoming milestone.
            </div>
          </Card>

          {/* Section 2: Audit Logs & Platform Finances Placeholder */}
          <Card className="p-6 border-dashed border-2 border-charcoal-200 dark:border-night-700 bg-offwhite/50 dark:bg-night-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-forest-900 dark:text-gray-100 font-bold">
                <DollarSign className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <span>Payment & Security Audit Logs</span>
              </div>
              <Badge variant="default" size="sm">Coming in Milestone 2</Badge>
            </div>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400 leading-relaxed">
              Supervision of SSLCommerz sandbox transactions, order payment reconciliation, and administrative access logs.
            </p>
            <div className="p-4 rounded-xl bg-white dark:bg-night-800 border border-charcoal-200/80 dark:border-night-700 text-center text-xs text-charcoal-400">
              🔒 Audit logging interface scheduled for upcoming milestone.
            </div>
          </Card>

        </div>

      </div>
    </DashboardLayout>
  );
}
