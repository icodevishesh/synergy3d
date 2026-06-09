'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'bg-navy-card border border-white/10 text-white font-sans text-sm',
          duration: 3000,
        }}
      />
    </SessionProvider>
  );
}

export default AdminProviders;
