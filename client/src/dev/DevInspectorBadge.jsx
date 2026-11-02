import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Code2, ChevronDown, ChevronUp, Layers, EyeOff } from 'lucide-react';

/**
 * In-Browser Development Route & Component Inspector Badge
 * Strictly rendered in DEV mode only. Automatically tree-shaken in production.
 * Helps student, evaluators, and developers immediately identify source files.
 */
export default function DevInspectorBadge() {
  // Tree-shake safety: Never render in production builds
  if (!import.meta.env.DEV) {
    return null;
  }

  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Dynamic route-to-component mapping table
  // Each entry maps a URL path to the exact source files rendering that view
  const routeComponentMap = {
    '/': {
      page: 'HomePage.jsx',
      title: 'Home — Florva Botanical Living',
      layout: 'PublicLayout.jsx',
      subcomponents: ['Navbar.jsx', 'Footer.jsx', 'ProductCard.jsx', 'ServiceCard.jsx', 'TestimonialCard.jsx', 'Card.jsx', 'Button.jsx', 'Badge.jsx'],
      dataFiles: ['mockProducts.js', 'mockServices.js', 'mockTestimonials.js'],
    },
    '/about': {
      page: 'AboutPage.jsx',
      title: 'About — Florva Platform',
      layout: 'PublicLayout.jsx',
      subcomponents: ['Navbar.jsx', 'Footer.jsx', 'Card.jsx', 'Button.jsx', 'Badge.jsx'],
      dataFiles: [],
    },
    '/contact': {
      page: 'ContactPage.jsx',
      title: 'Contact — Get in Touch',
      layout: 'PublicLayout.jsx',
      subcomponents: ['Navbar.jsx', 'Footer.jsx', 'Card.jsx', 'Button.jsx', 'Badge.jsx', 'Input.jsx'],
      dataFiles: [],
    },
    '/shop': {
      page: 'ShopPage.jsx',
      title: 'Shop Plants — Botanical Collection',
      layout: 'PublicLayout.jsx',
      subcomponents: ['ProductCard.jsx', 'FilterSidebar.jsx', 'Navbar.jsx', 'Footer.jsx'],
      dataFiles: ['mockProducts.js'],
    },
    '/services': {
      page: 'ServicesPage.jsx',
      title: 'Gardening Services',
      layout: 'PublicLayout.jsx',
      subcomponents: ['ServiceCard.jsx', 'Navbar.jsx', 'Footer.jsx'],
      dataFiles: ['mockServices.js'],
    },
    '/my-plants': {
      page: 'MyPlantsPage.jsx',
      title: 'My Plants — Care Journal',
      layout: 'CustomerLayout.jsx',
      subcomponents: ['PlantCard.jsx', 'CareReminderList.jsx', 'AddPlantModal.jsx'],
      dataFiles: [],
    },
    '/gardener': {
      page: 'GardenerDashboardPage.jsx',
      title: 'Gardener Dashboard',
      layout: 'GardenerLayout.jsx',
      subcomponents: ['StatMetricCard.jsx', 'SalesTrendChart.jsx', 'RecentAppointments.jsx'],
      dataFiles: [],
    },
    '/admin': {
      page: 'AdminDashboardPage.jsx',
      title: 'Admin Dashboard',
      layout: 'AdminLayout.jsx',
      subcomponents: ['RevenueAreaChart.jsx', 'BookingDonutChart.jsx', 'UserTable.jsx'],
      dataFiles: [],
    },
  };

  const currentPath = location.pathname;
  const match = routeComponentMap[currentPath] || {
    page: currentPath.startsWith('/shop/')
      ? 'ProductDetailPage.jsx'
      : currentPath.startsWith('/services/')
      ? 'ServiceDetailPage.jsx'
      : currentPath.startsWith('/gardener')
      ? 'GardenerSubPage.jsx'
      : currentPath.startsWith('/admin')
      ? 'AdminSubPage.jsx'
      : 'NotFoundPage.jsx',
    title: 'Unknown Page',
    layout: currentPath.startsWith('/gardener')
      ? 'GardenerLayout.jsx'
      : currentPath.startsWith('/admin')
      ? 'AdminLayout.jsx'
      : 'PublicLayout.jsx',
    subcomponents: ['Navbar.jsx', 'Footer.jsx'],
    dataFiles: [],
  };

  if (isHidden) {
    return (
      <button
        onClick={() => setIsHidden(false)}
        title="Restore Dev Inspector Badge"
        className="fixed bottom-3 right-3 z-50 bg-forest text-sage-200 text-xs px-2.5 py-1 rounded-full shadow-botanical-lg border border-sage-300 opacity-70 hover:opacity-100 transition-opacity flex items-center gap-1 font-mono"
      >
        <Code2 className="w-3.5 h-3.5" />
        <span>DEV</span>
      </button>
    );
  }

  return (
    <aside
      aria-label="Development Inspector Badge"
      className="fixed bottom-4 left-4 z-50 font-mono text-xs max-w-sm"
    >
      <div className="bg-forest-900/95 backdrop-blur-md text-white rounded-xl border border-sage-400/40 shadow-botanical-lg overflow-hidden transition-all duration-200">
        {/* Header Bar */}
        <div className="px-3 py-2 bg-forest-800/80 flex items-center justify-between gap-3 border-b border-sage-400/20">
          <div className="flex items-center gap-1.5 text-sage-300 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>DEV INSPECTOR</span>
          </div>

          <div className="flex items-center gap-1 text-sage-300">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:text-white transition-colors"
              title={isExpanded ? 'Collapse Details' : 'Expand Details'}
            >
              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsHidden(true)}
              className="p-1 hover:text-white transition-colors"
              title="Minimize Badge"
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Primary Route & Component Pill */}
        <div className="px-3 py-2.5 space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sage-400">Route:</span>
            <span className="text-white font-medium bg-forest-800 px-1.5 py-0.5 rounded text-[11px]">
              {currentPath}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-sage-400">Title:</span>
            <span className="text-sage-100 text-[11px]">
              {match.title || 'Florva'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-sage-400">Page:</span>
            <span className="text-sage-100 font-semibold text-[11px]">
              {match.page}
            </span>
          </div>
        </div>

        {/* Expanded Subcomponents View */}
        {isExpanded && (
          <div className="px-3 pb-3 pt-1 border-t border-sage-400/20 bg-forest-950/40 text-[11px] space-y-2">
            <div>
              <div className="text-sage-400 flex items-center gap-1 mb-1">
                <Layers className="w-3 h-3" />
                <span>Layout Shell:</span>
              </div>
              <p className="text-sage-200 pl-4">{match.layout}</p>
            </div>

            <div>
              <div className="text-sage-400 flex items-center gap-1 mb-1">
                <Code2 className="w-3 h-3" />
                <span>Subcomponents:</span>
              </div>
              <div className="flex flex-wrap gap-1 pl-4">
                {match.subcomponents.map((comp) => (
                  <span
                    key={comp}
                    className="bg-forest-800 text-sage-200 px-1.5 py-0.5 rounded text-[10px] border border-sage-400/20"
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>

            {/* Data / Service Files — shown when route has associated mock data */}
            {match.dataFiles && match.dataFiles.length > 0 && (
              <div>
                <div className="text-sage-400 flex items-center gap-1 mb-1">
                  <Layers className="w-3 h-3" />
                  <span>Data / API Files:</span>
                </div>
                <div className="flex flex-wrap gap-1 pl-4">
                  {match.dataFiles.map((file) => (
                    <span
                      key={file}
                      className="bg-amber-900/40 text-amber-200 px-1.5 py-0.5 rounded text-[10px] border border-amber-400/20"
                    >
                      {file}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
