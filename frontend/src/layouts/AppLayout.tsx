import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import AccessibilityToolbar from '../components/layout/AccessibilityToolbar';
import FooterStamp from '../components/layout/FooterStamp';

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <AccessibilityToolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden bg-neutral-50 relative">
          <Topbar />
          <main id="main-content" className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 outline-none">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
            <FooterStamp />
          </main>
        </div>
      </div>
    </div>
  );
}
