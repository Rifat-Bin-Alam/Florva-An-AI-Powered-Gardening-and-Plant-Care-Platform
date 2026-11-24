import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Toast() {
  const { toast, clearToast } = useAuth();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-forest dark:text-sage-400 shrink-0" />
  };

  const borderStyles = {
    success: 'border-emerald-200 dark:border-emerald-800 bg-white dark:bg-night-800',
    error: 'border-rose-200 dark:border-rose-800 bg-white dark:bg-night-800',
    info: 'border-forest-200 dark:border-forest-800 bg-white dark:bg-night-800'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-200">
      <div className={`p-4 rounded-xl border shadow-botanical-lg flex items-center justify-between gap-3 ${borderStyles[toast.type] || borderStyles.info}`}>
        <div className="flex items-center gap-3">
          {icons[toast.type] || icons.info}
          <p className="text-sm font-medium text-charcoal-800 dark:text-gray-100">{toast.message}</p>
        </div>
        <button
          onClick={clearToast}
          className="text-charcoal-400 hover:text-charcoal-600 dark:hover:text-gray-200 p-1 rounded-md"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
