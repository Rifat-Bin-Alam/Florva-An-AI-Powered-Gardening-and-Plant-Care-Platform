import React, { useState } from 'react';
import {
  Shield, Users, DollarSign, Package, Calendar,
  CreditCard, CheckCircle2, AlertTriangle, Layers,
  ToggleLeft, ToggleRight, Search, FileText, Check
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { useApp } from '../../context/AppContext';

/**
 * AdminDashboardPage — System Administration, Governance & Financial Audit
 * Oversees user accounts, category taxonomies, financial payment logs,
 * and platform-wide order/service statistics.
 */
export default function AdminDashboardPage() {
  const { orders, bookings, products, services } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'users' | 'categories' | 'payments' | 'oversight'

  // Mock User Directory for Administrator Governance
  const [usersList, setUsersList] = useState([
    { id: 'usr_1', name: 'Rifat Bin Alam', email: 'customer@florva.com', role: 'customer', status: 'active', joined: '2026-09-10' },
    { id: 'usr_2', name: 'Md. Rafiqul Islam', email: 'gardener@florva.com', role: 'gardener', status: 'active', joined: '2026-08-15' },
    { id: 'usr_3', name: 'Tanvir Hossain', email: 'tanvir@example.com', role: 'customer', status: 'active', joined: '2026-10-01' },
    { id: 'usr_4', name: 'Nusrat Jahan', email: 'nusrat@example.com', role: 'customer', status: 'active', joined: '2026-10-18' },
    { id: 'usr_5', name: 'Ayesha Rahman', email: 'ayesha@example.com', role: 'customer', status: 'active', joined: '2026-11-02' },
  ]);

  // Categories list
  const [categoriesList, setCategoriesList] = useState([
    { id: 'cat_1', name: 'Indoor Plants', count: 6, desc: 'Air purifying and decorative indoor foliage' },
    { id: 'cat_2', name: 'Flowering Plants', count: 3, desc: 'Seasonal blooming specimens and perennials' },
    { id: 'cat_3', name: 'Succulents & Cacti', count: 3, desc: 'Drought-tolerant architectural specimens' },
    { id: 'cat_4', name: 'Soils & Organic Fertilizers', count: 4, desc: 'Premium potting mixes and organic compost' },
  ]);

  const toggleUserStatus = (userId) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId && u.role !== 'admin') {
        const newStatus = u.status === 'active' ? 'suspended' : 'active';
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  // Mock Payment Transaction Audit Logs (SSLCommerz Sandbox)
  const paymentLogs = [
    { txnId: 'FLV-TXN-202611-0089', customer: 'Rifat Bin Alam', gateway: 'SSLCommerz (bKash)', amount: 1950, status: 'VALIDATED / PAID', date: '2026-11-08 14:22' },
    { txnId: 'FLV-TXN-202611-0088', customer: 'Rifat Bin Alam', gateway: 'SSLCommerz (Card)', amount: 1750, status: 'VALIDATED / PAID', date: '2026-11-10 10:15' },
    { txnId: 'FLV-TXN-202611-0087', customer: 'Nusrat Jahan', gateway: 'SSLCommerz (Nagad)', amount: 2200, status: 'VALIDATED / PAID', date: '2026-11-11 16:40' },
    { txnId: 'FLV-TXN-202611-0086', customer: 'Tanvir Hossain', gateway: 'SSLCommerz (bKash)', amount: 1250, status: 'VALIDATED / PAID', date: '2026-11-11 18:05' },
  ];

  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0) + 135000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* ─── Admin Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-charcoal-200 pb-5">
        <div className="space-y-1">
          <Badge variant="danger" size="md" icon={Shield}>Administrator Governance View</Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900">
            System Administration & Audit
          </h1>
          <p className="text-xs text-charcoal-500">
            Platform-wide governance, user account management, and financial transaction supervision
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
          Superadmin Protected Mode
        </span>
      </div>

      {/* ─── Metric Cards Grid ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5 border-charcoal-200/80 space-y-2">
          <span className="text-xs text-charcoal-500 font-semibold uppercase tracking-wider block">Gross Merchandise Value</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-forest-900">
            ৳{totalGMV.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">All-time platform revenue</span>
        </Card>

        <Card className="p-5 border-charcoal-200/80 space-y-2">
          <span className="text-xs text-charcoal-500 font-semibold uppercase tracking-wider block">Total Customer Orders</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-forest-900">
            {orders.length + 80}
          </div>
          <span className="text-[11px] text-forest-700 font-medium">96% fulfillment rate</span>
        </Card>

        <Card className="p-5 border-charcoal-200/80 space-y-2">
          <span className="text-xs text-charcoal-500 font-semibold uppercase tracking-wider block">Service Appointments</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-forest-900">
            {bookings.length + 30}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">88% completed</span>
        </Card>

        <Card className="p-5 border-charcoal-200/80 space-y-2">
          <span className="text-xs text-charcoal-500 font-semibold uppercase tracking-wider block">Registered Accounts</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-forest-900">
            {usersList.length + 120}
          </div>
          <span className="text-[11px] text-charcoal-500 font-medium">1 Gardener • 1 Superadmin</span>
        </Card>
      </div>

      {/* ─── Navigation Tabs ─── */}
      <div className="flex items-center gap-2 border-b border-charcoal-200 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Platform Health & Trajectory' },
          { id: 'users', label: `User Accounts (${usersList.length})` },
          { id: 'payments', label: `Payment Audit Logs (${paymentLogs.length})` },
          { id: 'categories', label: `Categories (${categoriesList.length})` },
          { id: 'oversight', label: 'Catalog & Bookings Oversight' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-forest text-forest'
                : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════
          TAB 1: PLATFORM HEALTH & ANALYTICS
          ═══════════════════════════════════════════════ */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4 border-charcoal-200/80">
            <h3 className="text-base font-bold text-forest-900">Platform Revenue Trajectory (BDT)</h3>
            <p className="text-xs text-charcoal-500">Aggregate commerce and service booking income</p>
            <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-charcoal-200 px-2">
              {[
                { month: 'Jul', gmv: 45000, height: '40%' },
                { month: 'Aug', gmv: 68000, height: '55%' },
                { month: 'Sep', gmv: 92000, height: '70%' },
                { month: 'Oct', gmv: 118000, height: '85%' },
                { month: 'Nov', gmv: 142300, height: '100%' }
              ].map(m => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-bold text-forest-800">৳{(m.gmv / 1000).toFixed(0)}k</span>
                  <div style={{ height: m.height }} className="w-full max-w-[42px] bg-forest rounded-t-md shadow-sm" />
                  <span className="text-xs font-semibold text-charcoal-600">{m.month}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 space-y-4 border-charcoal-200/80">
            <h3 className="text-base font-bold text-forest-900">Service Appointments Outcome Distribution</h3>
            <p className="text-xs text-charcoal-500">Breakdown of total appointments scheduled</p>
            <div className="space-y-3 pt-3">
              {[
                { label: 'Completed Appointments', count: 26, percent: 81, color: 'bg-emerald-600' },
                { label: 'Accepted / Scheduled', count: 4, percent: 13, color: 'bg-forest-600' },
                { label: 'Pending Gardener Response', count: 2, percent: 6, color: 'bg-amber-500' }
              ].map(item => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-charcoal-700">{item.label}</span>
                    <strong className="text-forest-900">{item.count} ({item.percent}%)</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-offwhite border border-charcoal-100 overflow-hidden">
                    <div style={{ width: `${item.percent}%` }} className={`h-full ${item.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 2: USER GOVERNANCE
          ═══════════════════════════════════════════════ */}
      {activeTab === 'users' && (
        <Card className="p-6 space-y-4 border-charcoal-200/80 shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-forest-900">User Account Governance</h3>
              <p className="text-xs text-charcoal-500">Audit registered platform accounts, roles, and status controls</p>
            </div>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-charcoal-200 text-charcoal-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5">User Identity</th>
                <th className="py-2.5">System Role</th>
                <th className="py-2.5">Registration Date</th>
                <th className="py-2.5">Account Status</th>
                <th className="py-2.5 text-right">Administrative Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100">
              {usersList.map((user) => (
                <tr key={user.id} className="hover:bg-offwhite/80">
                  <td className="py-3">
                    <p className="font-bold text-forest-900">{user.name}</p>
                    <p className="text-[11px] text-charcoal-400 font-mono">{user.email}</p>
                  </td>
                  <td className="py-3">
                    <Badge
                      variant={user.role === 'admin' ? 'danger' : user.role === 'gardener' ? 'warning' : 'forest'}
                      size="sm"
                    >
                      {user.role.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 text-charcoal-600">{user.joined}</td>
                  <td className="py-3">
                    <Badge variant={user.status === 'active' ? 'success' : 'danger'} size="sm">
                      {user.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    {user.role !== 'admin' ? (
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border transition-colors ${
                          user.status === 'active'
                            ? 'text-rose-700 border-rose-200 hover:bg-rose-50'
                            : 'text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                        }`}
                      >
                        {user.status === 'active' ? 'Suspend Access' : 'Activate User'}
                      </button>
                    ) : (
                      <span className="text-[11px] text-charcoal-400 italic">Protected Root</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 3: PAYMENT AUDIT LOGS
          ═══════════════════════════════════════════════ */}
      {activeTab === 'payments' && (
        <Card className="p-6 space-y-4 border-charcoal-200/80 shadow-sm overflow-x-auto">
          <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-forest-900">Authoritative Payment Transaction Logs</h3>
              <p className="text-xs text-charcoal-500">Instant Payment Notification (IPN) verification records</p>
            </div>
            <Badge variant="forest" size="sm">SSLCommerz Sandbox Verified</Badge>
          </div>

          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-charcoal-200 text-charcoal-400 uppercase tracking-wider text-[10px] font-sans">
                <th className="py-2.5">Transaction ID</th>
                <th className="py-2.5">Customer Name</th>
                <th className="py-2.5">Gateway & Channel</th>
                <th className="py-2.5">Settlement (BDT)</th>
                <th className="py-2.5">Server Validation</th>
                <th className="py-2.5 text-right font-sans">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-100">
              {paymentLogs.map((log) => (
                <tr key={log.txnId} className="hover:bg-offwhite/80">
                  <td className="py-3 font-bold text-forest-900">{log.txnId}</td>
                  <td className="py-3 font-sans font-medium text-charcoal-800">{log.customer}</td>
                  <td className="py-3 font-sans text-charcoal-600">{log.gateway}</td>
                  <td className="py-3 font-sans font-bold text-forest-900">৳{log.amount.toLocaleString()}</td>
                  <td className="py-3 font-sans">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <Check className="w-3 h-3" /> {log.status}
                    </span>
                  </td>
                  <td className="py-3 text-right text-charcoal-400">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 4: PLANT CATEGORIES MANAGEMENT
          ═══════════════════════════════════════════════ */}
      {activeTab === 'categories' && (
        <Card className="p-6 space-y-4 border-charcoal-200/80 shadow-sm">
          <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-forest-900">Plant Categories & Taxonomy</h3>
              <p className="text-xs text-charcoal-500">Manage plant groupings for e-commerce filtering</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoriesList.map(cat => (
              <div key={cat.id} className="p-4 bg-offwhite rounded-xl border border-charcoal-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-forest-900 text-sm">{cat.name}</h4>
                  <Badge variant="forest" size="sm">{cat.count} Items</Badge>
                </div>
                <p className="text-xs text-charcoal-600">{cat.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ═══════════════════════════════════════════════
          TAB 5: PLATFORM OVERSIGHT
          ═══════════════════════════════════════════════ */}
      {activeTab === 'oversight' && (
        <div className="space-y-6">
          <Card className="p-6 space-y-3 border-charcoal-200/80">
            <h3 className="text-base font-bold text-forest-900">Platform Products Oversight ({products.length} Items)</h3>
            <p className="text-xs text-charcoal-500">Read-only platform oversight of all inventory items managed by the Gardener</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              {products.map(p => (
                <div key={p._id} className="p-2.5 rounded-xl bg-offwhite border border-charcoal-100 space-y-1">
                  <p className="font-bold text-forest-900 truncate">{p.name}</p>
                  <p className="text-[11px] text-charcoal-500">৳{p.price.toLocaleString()} • Stock: {p.stockCount}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 space-y-3 border-charcoal-200/80">
            <h3 className="text-base font-bold text-forest-900">Gardening Service Packages ({services.length} Packages)</h3>
            <p className="text-xs text-charcoal-500">Oversight of active horticulture packages</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              {services.map(s => (
                <div key={s._id} className="p-3 rounded-xl bg-offwhite border border-charcoal-100 space-y-1">
                  <p className="font-bold text-forest-900">{s.name}</p>
                  <p className="text-[11px] text-forest-700 font-semibold">৳{s.price.toLocaleString()} • {s.duration}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
