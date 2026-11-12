import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import PlantChatbot from '../components/common/PlantChatbot';
import DevInspectorBadge from '../dev/DevInspectorBadge';

/**
 * PublicLayout — Primary layout shell for Florva.
 * Mounts sticky navigation, active view outlet, footer,
 * the floating Gemini botanical AI chatbot, and the dev inspector badge.
 */
export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-offwhite text-charcoal">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main Page View */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Bottom Footer */}
      <Footer />

      {/* Floating Sticky AI Botanical Assistant */}
      <PlantChatbot />

      {/* Development-Only Route & Component Inspector Badge */}
      <DevInspectorBadge />
    </div>
  );
}
