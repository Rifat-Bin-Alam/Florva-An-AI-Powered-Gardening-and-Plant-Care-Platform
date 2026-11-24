import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Shield, Wrench, LogOut, Home, Sprout,
  ArrowLeft, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function DashboardLayout({
  title,
  subtitle,
  role,
  sidebarLinks = [],
  activeTab = 'overview',
  onTabChange,
  children
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleConfigs = {
    customer: {
      label: 'Customer Portal',
      badgeVariant: 'forest',
      icon: User,
      color: 'text-forest dark:text-sage-300',
      bgColor: 'bg-forest-50 dark:bg-forest-950/60'
    },
    gardener: {
      label: 'Gardener Portal',
      badgeVariant: 'warning',
      icon: Wrench,
      color: 'text-amber-700 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-950/60'
    },
    admin: {
      label: 'Administrator Panel',
      badgeVariant: 'danger',
      icon: Shield,
      color: 'text-rose-700 dark:text-rose-400',
      bgColor: 'bg-rose-50 dark:bg-rose-950/60'
    }
  };

  const currentRole = roleConfigs[role] || roleConfigs.customer;
  const RoleIcon = currentRole.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* ─── Breadcrumb & Top Bar ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-200/80 dark:border-night-700 mb-8">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xs font-semibold text-charcoal-500 dark:text-charcoal-400 hover:text-forest dark:hover:text-sage-300 flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-charcoal-300 dark:text-night-600">/</span>
            <Badge variant={currentRole.badgeVariant} size="sm" icon={RoleIcon}>
              {currentRole.label}
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-forest-900 dark:text-gray-100 tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xs sm:text-sm text-charcoal-500 dark:text-charcoal-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* User profile capsule and logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-charcoal-200 dark:border-night-600 bg-white dark:bg-night-800 shadow-2xs">
            <div className={`w-8 h-8 rounded-lg ${currentRole.bgColor} flex items-center justify-center ${currentRole.color}`}>
              <RoleIcon className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <span className="font-bold text-charcoal-900 dark:text-gray-100 block leading-tight">
                {user?.name}
              </span>
              <span className="text-[10px] text-charcoal-500 dark:text-charcoal-400 capitalize">
                {user?.email}
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={LogOut}
            onClick={handleLogout}
            title="Log out of session"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* ─── Dashboard Body with Responsive Sidebar & Content ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-night-800 rounded-2xl border border-charcoal-200/80 dark:border-night-700 p-4 shadow-botanical space-y-4">
            <div className="px-3 py-2 border-b border-charcoal-100 dark:border-night-700">
              <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400 block">
                {currentRole.label} Navigation
              </span>
            </div>

            <nav className="space-y-1">
              <button
                type="button"
                onClick={() => onTabChange && onTabChange('overview')}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-forest-50 dark:bg-night-700 text-forest dark:text-sage-300'
                    : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-offwhite dark:hover:bg-night-700'
                }`}
              >
                <span>Dashboard Overview</span>
                {activeTab === 'overview' && (
                  <span className="w-2 h-2 rounded-full bg-forest dark:bg-sage-400" />
                )}
              </button>

              {sidebarLinks.map((link, idx) => {
                if (link.onClick) {
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={link.onClick}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                        link.active
                          ? 'bg-forest-50 dark:bg-night-700 text-forest dark:text-sage-300'
                          : 'text-charcoal-600 dark:text-charcoal-300 hover:bg-offwhite dark:hover:bg-night-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {link.icon && <link.icon className="w-3.5 h-3.5" />}
                        <span>{link.label}</span>
                      </span>
                      {link.badge ? (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-bold">
                          {link.badge}
                        </span>
                      ) : link.active && (
                        <span className="w-2 h-2 rounded-full bg-forest dark:bg-sage-400" />
                      )}
                    </button>
                  );
                }

                return (
                  <div
                    key={idx}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-charcoal-500 dark:text-charcoal-400 flex items-center justify-between opacity-75 hover:opacity-100 cursor-not-allowed"
                    title="Coming in Next Milestone"
                  >
                    <span className="flex items-center gap-2">
                      {link.icon && <link.icon className="w-3.5 h-3.5" />}
                      <span>{link.label}</span>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-charcoal-100 dark:bg-night-700 text-charcoal-600 dark:text-charcoal-400 font-semibold">
                      Soon
                    </span>
                  </div>
                );
              })}
            </nav>

            {/* Authenticated User Status Box */}
            <div className="p-3 rounded-xl bg-offwhite dark:bg-night-900 border border-charcoal-200/80 dark:border-night-700 text-xs space-y-2">
              <span className="text-[10px] font-bold text-charcoal-400 uppercase tracking-wider block">
                Account Security
              </span>
              <div className="space-y-1 text-charcoal-700 dark:text-charcoal-300">
                <p className="flex justify-between">
                  <span className="text-charcoal-500">Role:</span>
                  <span className="font-semibold uppercase">{user?.role}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-charcoal-500">Status:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-charcoal-500">Auth Token:</span>
                  <span className="text-forest dark:text-sage-400 font-mono text-[10px]">Verified JWT</span>
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Main Content Panel */}
        <main className="lg:col-span-9 space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
