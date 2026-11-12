import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Code2, ChevronDown, ChevronUp, Layers, EyeOff, Sprout } from 'lucide-react';

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
  const routeComponentMap = {
    '/': {
      page: 'HomePage.jsx',
      title: 'Home — Florva Botanical Living',
      subcomponents: ['Navbar.jsx', 'ProductCard.jsx', 'ServiceCard.jsx', 'TestimonialCard.jsx', 'Footer.jsx', 'PlantChatbot.jsx']
    },
    '/shop': {
      page: 'ShopPage.jsx',
      title: 'Shop Plants — Botanical Catalog',
      subcomponents: ['Navbar.jsx', 'ProductCard.jsx', 'Badge.jsx', 'Button.jsx', 'Footer.jsx']
    },
    '/services': {
      page: 'ServicesPage.jsx',
      title: 'Gardening Services Catalog',
      subcomponents: ['Navbar.jsx', 'ServiceCard.jsx', 'Badge.jsx', 'Footer.jsx']
    },
    '/cart': {
      page: 'CartPage.jsx',
      title: 'Shopping Cart',
      subcomponents: ['Navbar.jsx', 'Card.jsx', 'Button.jsx', 'Badge.jsx', 'Footer.jsx']
    },
    '/checkout': {
      page: 'CheckoutPage.jsx',
      title: 'Order Placement & Sandbox Payment',
      subcomponents: ['Navbar.jsx', 'Card.jsx', 'Input.jsx', 'Button.jsx', 'Footer.jsx']
    },
    '/my-plants': {
      page: 'MyPlantsPage.jsx',
      title: 'My Plants — Personal Care Journal',
      subcomponents: ['Navbar.jsx', 'Card.jsx', 'Badge.jsx', 'Button.jsx', 'Input.jsx', 'Footer.jsx']
    },
    '/gardener': {
      page: 'GardenerDashboardPage.jsx',
      title: 'Gardener Operational Dashboard',
      subcomponents: ['Navbar.jsx', 'Card.jsx', 'Badge.jsx', 'Button.jsx', 'Input.jsx', 'Footer.jsx']
    },
    '/admin': {
      page: 'AdminDashboardPage.jsx',
      title: 'Administrator Governance Dashboard',
      subcomponents: ['Navbar.jsx', 'Card.jsx', 'Badge.jsx', 'Button.jsx', 'Footer.jsx']
    },
    '/login': {
      page: 'LoginPage.jsx',
      title: 'Account Authentication & Demo Quick-Login',
      subcomponents: ['Navbar.jsx', 'Card.jsx', 'Input.jsx', 'Button.jsx', 'Footer.jsx']
    },
    '/register': {
      page: 'RegisterPage.jsx',
      title: 'Customer Account Registration',
      subcomponents: ['Navbar.jsx', 'Card.jsx', 'Input.jsx', 'Button.jsx', 'Footer.jsx']
    },
    '/about': {
      page: 'AboutPage.jsx',
      title: 'About Florva & Practicum Architecture',
      subcomponents: ['Navbar.jsx', 'Card.jsx', 'Badge.jsx', 'Button.jsx', 'Footer.jsx']
    },
    '/contact': {
      page: 'ContactPage.jsx',
      title: 'Contact & Support',
      subcomponents: ['Navbar.jsx', 'Card.jsx', 'Input.jsx', 'Button.jsx', 'Footer.jsx']
    }
  };

  const currentPath = location.pathname;
  const match = routeComponentMap[currentPath] || {
    page: currentPath.startsWith('/shop/')
      ? 'ProductDetailPage.jsx'
      : currentPath.startsWith('/services/')
      ? 'ServiceDetailPage.jsx'
      : 'NotFoundPage.jsx',
    title: currentPath.startsWith('/shop/')
      ? 'Product Details'
      : currentPath.startsWith('/services/')
      ? 'Service Booking Details'
      : 'Page Not Found',
    subcomponents: ['Navbar.jsx', 'Footer.jsx', 'Button.jsx', 'Card.jsx']
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
        <div className="px-3 py-2 space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sage-400">Route:</span>
            <span className="text-white font-medium bg-forest-800 px-1.5 py-0.5 rounded text-[11px] truncate max-w-[200px]">
              {currentPath}
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
                <span>Page Purpose:</span>
              </div>
              <p className="text-sage-200 pl-4">{match.title}</p>
            </div>

            <div>
              <div className="text-sage-400 flex items-center gap-1 mb-1">
                <Code2 className="w-3 h-3" />
                <span>Components:</span>
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
          </div>
        )}
      </div>
    </aside>
  );
}
