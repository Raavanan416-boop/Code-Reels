import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import Toast from '../ui/Toast';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-surface-900 flex flex-col">
      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-8 max-w-4xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <BottomNav />
      <Toast />
    </div>
  );
}
