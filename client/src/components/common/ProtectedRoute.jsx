import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';
import Button from './Button';

/**
 * ProtectedRoute Component
 * Restricts route access to authenticated users with permitted roles.
 * Redirects unauthenticated users to /login.
 * Redirects or blocks unauthorized roles trying to access another dashboard.
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-forest dark:text-sage-400" />
        <p className="text-xs font-medium text-charcoal-500 dark:text-charcoal-400">
          Verifying security credentials...
        </p>
      </div>
    );
  }

  // Not logged in -> redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required, ensure user has permission
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    const roleRoutes = {
      customer: '/customer',
      gardener: '/gardener',
      admin: '/admin'
    };
    const targetRoute = roleRoutes[user.role] || '/';

    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white dark:bg-night-800 p-8 rounded-2xl border border-rose-200 dark:border-rose-900/60 shadow-botanical text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-charcoal-900 dark:text-gray-100">
            Access Restricted
          </h2>
          <p className="text-sm text-charcoal-600 dark:text-charcoal-300">
            Your account role is <span className="font-semibold uppercase text-forest dark:text-sage-300">[{user.role}]</span>. You do not have permission to access the requested portal.
          </p>
          <div className="pt-2">
            <Navigate to={targetRoute} replace />
            <Button
              variant="primary"
              size="md"
              onClick={() => window.location.href = targetRoute}
              className="w-full"
            >
              Go to Your Authorized Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
