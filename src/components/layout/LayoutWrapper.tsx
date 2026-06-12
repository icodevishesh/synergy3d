'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { TopStrip } from './TopStrip';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <>
      <TopStrip />
      <Navbar />
      <main className="pt-[10px] min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}
