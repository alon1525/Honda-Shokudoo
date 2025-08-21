import React from 'react';
import { Navigation } from './Navigation.jsx';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        {children}
      </main>
    </div>
  );
};
