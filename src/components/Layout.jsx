import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
      <Toaster />
    </div>
  );
};