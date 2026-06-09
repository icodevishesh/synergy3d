'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import AdminProviders from '@/components/AdminProviders';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Talks', href: '/admin/talks' },
    { name: 'Education', href: '/admin/education' },
    { name: 'Webinars', href: '/admin/webinars' },
    { name: 'Customer Stories', href: '/admin/customers' },
  ];

  return (
    <AdminProviders>
      <div className="bg-navy min-h-screen pt-24 pb-16 text-white font-sans">
        <div className="max-w-[1140px] mx-auto px-6 md:px-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-glow">
                Control Panel
              </span>
              <h1 className="text-3xl font-serif font-extrabold text-white mt-1">
                Synergy3D <em className="italic text-blue-glow">Admin.</em>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="bg-transparent hover:bg-white/5 text-white border border-white/20 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
              >
                View Website
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Sub Navigation Bar */}
          <div className="flex gap-2 overflow-x-auto pb-4 border-b border-white/5 mb-8">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    active
                      ? 'bg-blue-default text-white'
                      : 'bg-white/5 border border-white/8 text-white/75 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Page Content */}
          <div className="bg-navy-card border border-white/8 rounded-2xl p-6 md:p-8 shadow-2xl relative">
            {children}
          </div>
        </div>
      </div>
    </AdminProviders>
  );
}
