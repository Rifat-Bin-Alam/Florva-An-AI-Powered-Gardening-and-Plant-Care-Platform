import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
import Footer from '../navigation/Footer';
import Toast from '../common/Toast';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-offwhite dark:bg-night-900 text-charcoal dark:text-gray-100 transition-colors">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toast />
    </div>
  );
}
