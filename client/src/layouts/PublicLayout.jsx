import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import DevInspectorBadge from '../dev/DevInspectorBadge';

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-offwhite text-charcoal">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main View Area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Bottom Footer */}
      <Footer />

      {/* In-Browser Development Route & Component Inspector Badge */}
      <DevInspectorBadge />
    </div>
  );
}
